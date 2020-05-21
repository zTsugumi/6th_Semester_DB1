import React, { useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import './Alert.css';

const Alert = (props) => {
    const [isModalOpen, setModal] = useState(props.open ? props.open : true);

    const toggleModal = () => {
        setModal(!isModalOpen);
        if (props.callback) {
            props.callback();
        }
        if (props.reloadPage) {
            window.location.reload();
        }
    };

    return (
        <div>
            <Modal isOpen={isModalOpen} toggle={toggleModal}>
                <ModalBody className='text-center alert-body'>
                    {props.status ? <i className="fa fa-check"></i>
                        : <i className="fa fa-exclamation-circle"></i>}<br />
                    {props.message}
                </ModalBody>
            </Modal>
        </div>
    );
};

export default Alert;