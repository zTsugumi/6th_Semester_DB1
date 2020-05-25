import React from 'react';
import { Media, Button } from 'reactstrap';
import { baseUrl } from '../../../shared/baseUrl';
import { Loading } from '../../Loading/Loading';
import FadeIn from 'react-fade-in';
import './Favorite.css';

function RenderMenuItem({ dish, deleteFavorite }) {
    return (
        <Media tag="li">
            <Media left middle>
                <Media object src={baseUrl + dish.image} alt={dish.name} />
            </Media>
            <Media body className="ml-5">
                <Media heading>{dish.name}</Media>
                <p>{dish.description}</p>
                <Button outline color="danger" onClick={() => deleteFavorite(dish._id)}>
                    <span className="fa fa-times"></span>
                </Button>
            </Media>
        </Media>
    );
}

const Favorites = (props) => {
    if (props.favorites.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.favorites.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.favorites.errMess}</h4>
                </div>
            </div>
        )
    }
    else if (props.favorites.favorites) {
        const favorites = props.favorites.favorites.dishes.map((dish) => {
            return (
                <div key={dish._id} className="col-12 mt-5">
                    <RenderMenuItem dish={dish} deleteFavorite={props.deleteFavorite} />
                </div>
            );
        });

        return (
            <FadeIn>
                <div className="container favorite--container">
                    <div className="row">
                        <div className="col-12">
                            <h3>My Favorites</h3>
                            <hr />
                        </div>
                        <Media list>
                            {favorites}
                        </Media>
                    </div>
                </div>
            </FadeIn>
        );
    }
    else {
        return (
            <FadeIn>
                <div className="container">
                    <div className="row">
                        <h4>You have no favorites</h4>
                    </div>
                </div>
            </FadeIn>
        )
    }
}

export default Favorites;