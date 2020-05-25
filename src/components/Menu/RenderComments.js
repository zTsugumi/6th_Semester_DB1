import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, Label, Form, FormGroup, Input, Button } from 'reactstrap';
import Util from '../Alert/Util';

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmit(event) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, this.rating.value, this.comment.value)
            .then(
                (response) => {
                    if (response.type === 'POST_COMMENT_FAILED')
                        Util.alert(false, "Post comment is not available. Please check if you logged in and try again.", false);
                }
            );
        event.preventDefault();
    }

    render() {
        return (
            <>
                <Button outline onClick={this.toggleModal} >
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label htmlFor="rating">Rating</Label>
                                <Input type="select" id="rating" name="rating"
                                    innerRef={(input) => this.rating = input} >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="comment">Comment</Label>
                                <Input type="textarea" rows="6" id="comment" name="comment"
                                    innerRef={(input) => this.comment = input} />
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">
                                Submit
                            </Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </>
        )
    };
}

const RenderComments = ({ comments, postComment, dishId }) => {
    if (comments != null)
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="row list-unstyled">
                    {comments.map((comment) => {
                        return (
                            <div className="col-12 mt-2">
                                <li>{comment.comment}</li>
                                <li>Rating: {comment.rating}</li>
                                <li>-- {comment.author.firstname} {comment.author.lastname} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.updatedAt)))}</li>
                            </div>
                        );
                    })}
                </ul>
                <CommentForm dishId={dishId} postComment={postComment} />
            </div>
        )
    else
        return (
            <div></div>
        );
}

export default RenderComments;