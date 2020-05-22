import React, { useEffect } from 'react';
import useSticky from '../hooks/useSticky.js';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Welcome from './Welcome/Welcome';
import Home from './Home/Home';
import About from './About/About';
import Menu from './Menu/Menu';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AllActions from '../redux/actions/AllActions';

function Main() {
    const { isSticky, element } = useSticky();

    const auth = useSelector(state => state.auth);
    const dishes = useSelector(state => state.dishes);
    const staffs = useSelector(state => state.staffs);

    const dispatch = useDispatch();
    const loginUser = (creds) => dispatch(AllActions.AuthActions.loginUser(creds));
    const logoutUser = () => dispatch(AllActions.AuthActions.logoutUser());

    useEffect(() => {
        dispatch(AllActions.DishActions.fetchDishes());
        dispatch(AllActions.StaffActions.fetchStaffs());
    }, [])

    const HomePage = () => {
        const dishFeature = dishes.dishes.filter((dish) => dish.featured)[0];

        return (
            <>
                <Welcome element={element} />
                <Home dish={dishFeature}
                    dishesLoading={dishes.isLoading}
                    dishesErrMess={dishes.errMess} />
            </>
        )
    }

    const AboutPage = () => {
        return (
            <>
                <Welcome element={element} />
                <About staffs={staffs} />
            </>
        )
    }

    const MenuPage = () => {
        return (
            <>
                <Welcome element={element} />
                <Menu />
            </>
        )
    }

    // ?? Sticky animation is still a little bit buggy, Navbar need more modification ??
    // ?? Can add sticky to footer   
    // ?? Animation rerender problem
    // ?? Can change welcome image for different subpages
    // ?? Need to style subpages
    return (
        <div>
            <Header sticky={isSticky} auth={auth}
                loginUser={loginUser} logoutUser={logoutUser} />
            <Switch>
                <Route path="/welcome" component={HomePage} />
                <Route exact path="/about" component={AboutPage} />
                <Route exact path="/menu" component={MenuPage} />
                <Redirect to="/welcome" />
            </Switch>
            <Footer />
        </div>
    );
}

export default withRouter(Main);