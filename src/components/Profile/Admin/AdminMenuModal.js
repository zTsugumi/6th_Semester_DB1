import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Label, Form, FormGroup, Input } from 'reactstrap';
import Util from '../../Alert/Util';

// ?? Need to do validation for post 
class PostEditModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checkboxChecked: false,
            file: null
        }

        this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this)
        this.handleEditSubmit = this.handleEditSubmit.bind(this);
        this.handlePostSubmit = this.handlePostSubmit.bind(this);
    }

    onChangeCheckbox() {
        this.setState({
            checkboxChecked: !this.state.checkboxChecked
        });
    }

    onChangeFile(e) {
        this.setState({
            file: e.target.files[0]
        });
    }

    handleEditSubmit(event) {
        this.props.toggleModal();

        var updateInfo = {}
        if (this.name.value) updateInfo.name = this.name.value;
        if (this.category.value) updateInfo.category = this.category.value;
        if (this.price.value) updateInfo.price = this.price.value;
        if (this.description.value) updateInfo.description = this.description.value;
        if (this.state.file) updateInfo.image = 'images/' + this.state.file.name;
        updateInfo.featured = this.state.checkboxChecked ? true : false;

        this.props.putDish(this.props.dishId, updateInfo)
            .then(
                (response) => {
                    if (response.type === 'PUT_DISH_FAILED')
                        Util.alert(false, 'PUT Failed');
                    else {
                        if (this.state.file)
                            this.props.postFile(this.state.file)
                                .then(
                                    (response) => {
                                        if (response.type === 'POST_FILE_FAILED')
                                            Util.alert(false, 'POST Image Failed');
                                        else
                                            Util.alert(true, 'PUT Successful');
                                    }
                                )
                        else Util.alert(true, 'PUT Successful');
                    }

                }
            )
        event.preventDefault();
    }

    handlePostSubmit(event) {
        this.props.toggleModal();

        var newDish = {
            name: this.name.value,
            category: this.category.value,
            price: this.price.value,
            description: this.description.value,
            image: 'images/' + this.state.file.name,
            featured: this.state.checkboxChecked ? true : false
        }

        this.props.postDishes(newDish)
            .then(
                (response) => {
                    if (response.type === 'POST_DISHES_FAILED')
                        Util.alert(false, 'ADD Failed');
                    else Util.alert(true, 'ADD Successful');
                }
            )
        event.preventDefault();
    }

    render() {
        return (
            <Modal isOpen={this.props.isModalOpen} toggle={this.props.toggleModal}>
                <ModalHeader toggle={this.props.toggleModal}>
                    {this.props.type === "edit" ? <h5>Edit</h5> : <h5>Add</h5>}
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.props.type === "edit" ? this.handleEditSubmit : this.handlePostSubmit}>
                        <FormGroup className="row">
                            <Label className="col-3 align-self-center" style={{ marginBottom: 0 }} htmlFor="name">Name</Label>
                            <div className="col-9">
                                <Input type="text" id="name" name="name"
                                    innerRef={(input) => this.name = input} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-3 align-self-center" style={{ marginBottom: 0 }} htmlFor="category">Category</Label>
                            <div className="col-9">
                                <Input type="text" id="category" name="category"
                                    innerRef={(input) => this.category = input} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-3 align-self-center" style={{ marginBottom: 0 }} htmlFor="price">Price</Label>
                            <div className="col-9">
                                <Input type="text" id="price" name="price"
                                    innerRef={(input) => this.price = input} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-3 align-self-center" style={{ marginBottom: 0 }} htmlFor="description">Description</Label>
                            <div className="col-9">
                                <Input type="textarea" id="description" name="description" rows="5"
                                    innerRef={(input) => this.description = input} />
                            </div>
                        </FormGroup>
                        <FormGroup check className="row">
                            <Label check className="col-9 align-self-center">
                                <Input type="checkbox" name="featured" value="true"
                                    onClick={this.onChangeCheckbox} />
                                        Featured
                            </Label>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-3 align-self-center" style={{ marginBottom: 0 }} htmlFor="dishImage">Image</Label>
                            <div className="col-9">
                                <Input type="file" name="dishImage" id="dishImage"
                                    onChange={this.onChangeFile} />
                            </div>
                        </FormGroup>
                        <Button type="submit" value="submit">Submit</Button>
                    </Form>
                </ModalBody>
            </Modal >
        )
    }
}

const DeleteModal = (props) => {
    const handleSubmit = () => {
        props.toggleModal();
        if (props.type === 'one')
            props.deleteDish(props.dishId)
                .then(
                    response => {
                        if (response.type === 'REMOVE_DISH_SUCCESS')
                            Util.alert(true, "REMOVE Successful");
                        else
                            Util.alert(false, "REMOVE Failed");
                    }
                );
        else
            props.deleteDishes()
                .then(
                    response => {
                        if (response.type === 'REMOVE_DISHES_SUCCESS')
                            Util.alert(true, "REMOVE Successful");
                        else
                            Util.alert(false, "REMOVE Failed");
                    }
                );
    }

    return (
        <Modal className="container" isOpen={props.isModalOpen} toggle={props.toggleModal}>
            <ModalHeader toggle={props.toggleModal}>
                {props.type === 'one' ? <h5>Remove Dish</h5> : <h5>Remove All Dishes</h5>}
            </ModalHeader>
            <ModalBody className="row">
                {props.type === 'one'
                    ? <p className="col-12">Are you sure you want to delete this item?</p>
                    : <p className="col-12">Are you sure you want to delete all items?</p>
                }
                <Button className="col-3 ml-auto" onClick={handleSubmit}>OK</Button>
                <Button className="col-3 ml-2 mr-auto" onClick={props.toggleModal}>Cancel</Button>
            </ModalBody>
        </Modal >
    )
}

export {
    PostEditModal,
    DeleteModal
}