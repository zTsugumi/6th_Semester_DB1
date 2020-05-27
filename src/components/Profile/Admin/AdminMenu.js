import React, { useState } from 'react';
import { Media, Button } from 'reactstrap';
import { Loading } from '../../Loading/Loading';
import { baseUrl } from '../../../shared/baseUrl';
import FadeIn from 'react-fade-in';
import { PostEditModal, DeleteModal } from './AdminMenuModal';

function RenderMenuItem({ dish, putDish, postFile, deleteDish }) {
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const toggleEditModal = () => setEditModalOpen(!isEditModalOpen);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const toggleDeleteModal = () => setDeleteModalOpen(!isDeleteModalOpen);

    return (
        <>
            <Media>
                <Media left middle>
                    <Media object src={baseUrl + dish.image} width="50" alt={dish.name} />
                </Media>
                <Media body className="d-none d-sm-block ml-3">
                    <Media heading>
                        {dish.name}
                    </Media>
                    <p><strong>Description:</strong> {dish.description}</p>
                    <p><strong>Category:</strong> {dish.category}</p>
                    <p><strong>Price:</strong> {dish.price / 100}</p>
                    <p><strong>Featured:</strong> {dish.featured ? "true" : "false"}</p>
                    <Button onClick={toggleEditModal}>Edit</Button>
                    <Button onClick={toggleDeleteModal}>Remove</Button>
                </Media>
            </Media>
            <PostEditModal isModalOpen={isEditModalOpen} toggleModal={toggleEditModal}
                dishId={dish._id} putDish={putDish} postFile={postFile} type="edit" />
            <DeleteModal isModalOpen={isDeleteModalOpen} toggleModal={toggleDeleteModal}
                dishId={dish._id} deleteDish={deleteDish} type="one" />
        </>
    );
}

const AdminMenu = (props) => {
    const [isPostModalOpen, setPostModalOpen] = useState(false);
    const togglePostModal = () => setPostModalOpen(!isPostModalOpen);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const toggleDeleteModal = () => setDeleteModalOpen(!isDeleteModalOpen);

    if (props.dishes.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.dishes.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.dishes.errMess}</h4>
                </div>
            </div>
        );
    }
    else {
        return (
            <>
                <FadeIn>
                    <div className="container" >
                        <div className="row mb-5">
                            <Button className="col-3" onClick={togglePostModal}>Add Dish</Button>
                            <Button className="ml-1 col-3" onClick={toggleDeleteModal}>Delete Dishes</Button>
                        </div>
                        <div className="row">
                            {props.dishes.dishes.map((dish) => {
                                return (
                                    <div key={dish._id} className="col-12">
                                        <RenderMenuItem dish={dish} putDish={props.putDish}
                                            postFile={props.postFile} deleteDish={props.deleteDish} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </FadeIn>
                <PostEditModal isModalOpen={isPostModalOpen} toggleModal={togglePostModal}
                    postDishes={props.postDishes} postFile={props.postFile} type="post" />
                <DeleteModal isModalOpen={isDeleteModalOpen} toggleModal={toggleDeleteModal}
                    deleteDishes={props.deleteDishes} type="all" />
            </>
        );
    }
}

export default AdminMenu;