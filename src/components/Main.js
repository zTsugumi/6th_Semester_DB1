import React, { useEffect, useState } from 'react';
import useSticky from '../hooks/useSticky.js';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Welcome from './Welcome/Welcome';
import Menu from './Menu/Menu';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AllActions from '../redux/actions/AllActions';

function Main(props) {
    const { isSticky, element } = useSticky();

    const auth = useSelector(state => state.auth);
    const dishes = useSelector(state => state.dishes);

    const dispatch = useDispatch();
    const loginUser = (creds) => dispatch(AllActions.AuthActions.loginUser(creds));
    const logoutUser = () => dispatch(AllActions.AuthActions.logoutUser());

    useEffect(() => {
        dispatch(AllActions.DishActions.fetchDishes());
    }, [])

    const WelcomePage = () => {
        const dishFeature = dishes.dishes.filter((dish) => dish.featured)[0];

        return (
            <Welcome element={element}
                dishFeature={dishFeature}
                dishesLoading={dishes.isLoading}
                dishesErrMess={dishes.errMess} />
        )
    }

    const MenuPage = () => {
        return (
            <Menu />
        )
    }

    // ?? Sticky animation is still a little bit buggy, Navbar need more modification ??
    // ?? Can add sticky to footer   
    // ?? Animation rerender problem
    return (
        <div>
            <Header sticky={isSticky} auth={auth}
                loginUser={loginUser} logoutUser={logoutUser} />
            <Switch>
                <Route path="/welcome" component={WelcomePage} />
                <Route exact path="/menu" component={MenuPage} />
                <Redirect to="/welcome" />
            </Switch>
            <Footer />
        </div>
    );
}

export default withRouter(Main);