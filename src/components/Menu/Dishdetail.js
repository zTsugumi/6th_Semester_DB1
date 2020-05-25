import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from '../Loading/Loading';
import RenderDish from './RenderDish';
import RenderComments from './RenderComments';
import FadeIn from 'react-fade-in';
import './Dishdetail.css';

const DishDetail = (props) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) {
        return (
            <FadeIn>
                <div className="container dishdetail--container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                        <RenderDish dish={props.dish} favorite={props.favorite}
                            postFavorite={props.postFavorite} deleteFavorite={props.deleteFavorite} />
                        <RenderComments comments={props.comments} postComment={props.postComment} dishId={props.dish._id} />
                    </div>
                </div>
            </FadeIn>
        );
    }
    else
        return (<div></div>);
}

export default DishDetail;