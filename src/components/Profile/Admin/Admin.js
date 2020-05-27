import React from 'react';
import { useDispatch } from 'react-redux';
import AllActions from '../../../redux/actions/AllActions';
import Sidebar from '../../Sidebar/Sidebar';
import AdminMenu from './AdminMenu';
import './Admin.css';

const items = [
    { name: 'menu', label: 'Menu', link: '/profile/admin/menu' },
    { name: 'staff', label: 'Staff', link: '/profile/admin/staff' },
    { name: 'reservation', label: 'Reservation', link: '/profile/admin/reservation' },
    { name: 'users', label: 'User', link: '/profile/admin/user' }
]

const Admin = (props) => {
    // Reducers
    const dispatch = useDispatch();
    const putDish = (dishId, udpatedInfo) => dispatch(AllActions.DishActions.putDish(dishId, udpatedInfo));
    const postFile = (file) => dispatch(AllActions.FileActions.postFile(file));
    const deleteDish = (dishId) => dispatch(AllActions.DishActions.deleteDish(dishId));

    const postDishes = (newDish) => dispatch(AllActions.DishActions.postDishes(newDish));
    const deleteDishes = () => dispatch(AllActions.DishActions.deleteDishes());

    return (
        <div className="container admin--container">
            <div className="row">
                <div className="col-3">
                    <Sidebar items={items} />
                </div>
                {props.type === 'admin-menu'
                    ?
                    <div className="col-9">
                        <AdminMenu dishes={props.dishes}
                            putDish={putDish} deleteDish={deleteDish} postFile={postFile}
                            postDishes={postDishes} deleteDishes={deleteDishes} />
                    </div>
                    :
                    null
                }
            </div>
        </div>
    )
}

export default Admin;