import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Label, Form, FormGroup, Input } from 'reactstrap';
import Util from '../../Alert/Util';

// ?? Need to do validation for post 
class PostEditModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            file: null
        }

        this.onChangeFile = this.onChangeFile.bind(this)
        this.handleEditSubmit = this.handleEditSubmit.bind(this);
        this.handlePostSubmit = this.handlePostSubmit.bind(this);
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
        if (this.designation.value) updateInfo.designation = this.designation.value;
        if (this.abbr.value) updateInfo.abbr = this.abbr.value;
        if (this.description.value) updateInfo.description = this.description.value;
        if (this.state.file) updateInfo.image = 'images/' + this.state.file.name;

        if (this.state.file)
            this.props.postFile(this.state.file)
                .then(
                    (response) => {
                        if (response.type === 'POST_FILE_FAILED')
                            Util.alert(false, 'POST Image Failed');
                    }
                )
        this.props.putStaff(this.props.staffId, updateInfo)
            .then(
                (response) => {
                    if (response.type === 'PUT_STAFF_FAILED')
                        Util.alert(false, 'PUT Failed');
                    else Util.alert(true, 'PUT Successful');
                }
            )

        event.preventDefault();
    }

    handlePostSubmit(event) {
        this.props.toggleModal();

        var newStaff = {
            name: this.name.value,
            designation: this.designation.value,
            abbr: this.abbr.value,
            description: this.description.value,
            image: 'images/' + this.state.file.name,
        }

        this.props.postFile(this.state.file)
            .then(
                (response) => {
                    if (response.type === 'POST_FILE_FAILED')
                        Util.alert(false, 'POST Image Failed');
                }
            )
        this.props.postStaffs(newStaff)
            .then(
                (response) => {
                    if (response.type === 'POST_STAFFS_FAILED')
                        Util.alert(false, 'POST Failed');
                    else Util.alert(true, 'POST Successful');
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
                            <Label className="col-3 align-self-center" style={{ marginBottom: 0 }} htmlFor="designation">Designation</Label>
                            <div className="col-9">
                                <Input type="text" id="designation" name="designation"
                                    innerRef={(input) => this.designation = input} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-3 align-self-center" style={{ marginBottom: 0 }} htmlFor="abbr">Abbr</Label>
                            <div className="col-9">
                                <Input type="text" id="abbr" name="abbr"
                                    innerRef={(input) => this.abbr = input} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-3 align-self-center" style={{ marginBottom: 0 }} htmlFor="description">Description</Label>
                            <div className="col-9">
                                <Input type="textarea" id="description" name="description" rows="5"
                                    innerRef={(input) => this.description = input} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-3 align-self-center" style={{ marginBottom: 0 }} htmlFor="staffImage">Image</Label>
                            <div className="col-9">
                                <Input type="file" name="staffImage" id="staffImage"
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
            props.deleteStaff(props.staffId)
                .then(
                    response => {
                        if (response.type === 'REMOVE_STAFF_SUCCESS')
                            Util.alert(true, "REMOVE Successful");
                        else
                            Util.alert(false, "REMOVE Failed");
                    }
                );
        else
            props.deleteStaffs()
                .then(
                    response => {
                        if (response.type === 'REMOVE_STAFFS_SUCCESS')
                            Util.alert(true, "REMOVE Successful");
                        else
                            Util.alert(false, "REMOVE Failed");
                    }
                );
    }

    return (
        <Modal className="container" isOpen={props.isModalOpen} toggle={props.toggleModal}>
            <ModalHeader toggle={props.toggleModal}>
                {props.type === 'one' ? <h5>Remove Staff</h5> : <h5>Remove All Staffs</h5>}
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