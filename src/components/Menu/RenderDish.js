import React from 'react';
import { baseUrl } from '../../shared/baseUrl';
import {Card, CardImg, CardText, CardImgOverlay, CardBody, CardTitle, Button} from 'reactstrap';

// ?? Need to handle overflow of comments, create a box for comments
// ?? Bug that react reloading the site when adding comments
const RenderDish = ({ dish, favorite, postFavorite, deleteFavorite }) => {
    return (
        <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardImgOverlay>
                    <Button outline color="primary" onClick={() => favorite ? deleteFavorite(dish._id) : postFavorite(dish._id)}>
                        {favorite ?
                            <span className="fa fa-heart"></span>
                            :
                            <span className="fa fa-heart-o"></span>
                        }
                    </Button>
                </CardImgOverlay>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText className="text-justify">{dish.description}</CardText>
                    <CardText>Price: ${dish.price / 100}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

export default RenderDish;