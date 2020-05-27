import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AllActions from '../../../redux/actions/AllActions';
import Sidebar from '../../Sidebar/Sidebar';
import AdminMenu from './AdminMenu';
import AdminStaff from './AdminStaff';
import './Admin.css';

const items = [
    { name: 'menu', label: 'Menu', link: '/profile/admin/menu' },
    { name: 'staff', label: 'Staff', link: '/profile/admin/staff' },
    { name: 'reservation', label: 'Reservation', link: '/profile/admin/reservation' },
    { name: 'users', label: 'User', link: '/profile/admin/user' }
]

const Admin = (props) => {
    // Store states
    const dishes = useSelector(state => state.dishes);
    const staffs = useSelector(state => state.staffs);

    const dispatch = useDispatch();

    // Reducers
    const postFile = (file) => dispatch(AllActions.FileActions.postFile(file));

    const putDish = (dishId, udpatedInfo) => dispatch(AllActions.DishActions.putDish(dishId, udpatedInfo));
    const deleteDish = (dishId) => dispatch(AllActions.DishActions.deleteDish(dishId));

    const postDishes = (newDish) => dispatch(AllActions.DishActions.postDishes(newDish));
    const deleteDishes = () => dispatch(AllActions.DishActions.deleteDishes());

    const putStaff = (staffId, udpatedInfo) => dispatch(AllActions.StaffActions.putStaff(staffId, udpatedInfo));
    const deleteStaff = (staffId) => dispatch(AllActions.StaffActions.deleteStaff(staffId));

    const postStaffs = (newStaff) => dispatch(AllActions.StaffActions.postStaffs(newStaff));
    const deleteStaffs = () => dispatch(AllActions.StaffActions.deleteStaffs());

    return (
        <div className="container admin--container">
            <div className="row">
                <div className="col-3">
                    <Sidebar items={items} />
                </div>
                {props.type === 'admin-menu'
                    ?
                    <div className="col-9">
                        <AdminMenu dishes={dishes}
                            putDish={putDish} deleteDish={deleteDish} postFile={postFile}
                            postDishes={postDishes} deleteDishes={deleteDishes} />
                    </div>
                    :
                    null
                }
                {props.type === 'admin-staff'
                    ?
                    <div className="col-9">
                        <AdminStaff staffs={staffs}
                            putStaff={putStaff} deleteStaff={deleteStaff} postFile={postFile}
                            postStaffs={postStaffs} deleteStaffs={deleteStaffs} />
                    </div>
                    :
                    null
                }
            </div>
        </div>
    )
}

export default Admin;