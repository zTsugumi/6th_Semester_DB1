import React, { useState } from 'react';
import { Media, Button } from 'reactstrap';
import { Loading } from '../../Loading/Loading';
import { baseUrl } from '../../../shared/baseUrl';
import FadeIn from 'react-fade-in';
import { PostEditModal, DeleteModal } from './AdminStaffModal';

function RenderStaff({ staff, putStaff, postFile, deleteStaff }) {
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const toggleEditModal = () => setEditModalOpen(!isEditModalOpen);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const toggleDeleteModal = () => setDeleteModalOpen(!isDeleteModalOpen);

    return (
        <>
            <Media>
                <Media left middle>
                    <Media object src={baseUrl + staff.image} width="50" alt={staff.name} />
                </Media>
                <Media body className="d-none d-sm-block ml-3">
                    <Media heading>
                        {staff.name}
                    </Media>
                    <p><strong>Description:</strong> {staff.description}</p>
                    <p><strong>Designation:</strong> {staff.designation}</p>
                    <p><strong>Abbr:</strong> {staff.abbr}</p>
                    <Button onClick={toggleEditModal}>Edit</Button>
                    <Button onClick={toggleDeleteModal}>Remove</Button>
                </Media>
            </Media>
            <PostEditModal isModalOpen={isEditModalOpen} toggleModal={toggleEditModal}
                staffId={staff._id} putStaff={putStaff} postFile={postFile} type="edit" />
            <DeleteModal isModalOpen={isDeleteModalOpen} toggleModal={toggleDeleteModal}
                staffId={staff._id} deleteStaff={deleteStaff} type="one" />
        </>
    );
}

const AdminStaff = (props) => {
    const [isPostModalOpen, setPostModalOpen] = useState(false);
    const togglePostModal = () => setPostModalOpen(!isPostModalOpen);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const toggleDeleteModal = () => setDeleteModalOpen(!isDeleteModalOpen);

    if (props.staffs.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.staffs.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.staffs.errMess}</h4>
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
                            <Button className="col-3" onClick={togglePostModal}>Add Staff</Button>
                            <Button className="ml-1 col-3" onClick={toggleDeleteModal}>Delete Staffs</Button>
                        </div>
                        <div className="row">
                            {props.staffs.staffs.map((staff) => {
                                return (
                                    <div key={staff._id} className="col-12">
                                        <RenderStaff staff={staff} putStaff={props.putStaff}
                                            postFile={props.postFile} deleteStaff={props.deleteStaff} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </FadeIn>
                <PostEditModal isModalOpen={isPostModalOpen} toggleModal={togglePostModal}
                    postStaffs={props.postStaffs} postFile={props.postFile} type="post" />
                <DeleteModal isModalOpen={isDeleteModalOpen} toggleModal={toggleDeleteModal}
                    deleteStaffs={props.deleteStaffs} type="all" />
            </>
        );
    }
}

export default AdminStaff;