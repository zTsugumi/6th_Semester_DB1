import React from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import './Admin.css';

const Admin = (props) => {
    const items = [
        {
            name: 'menu',
            label: 'Menu',
            link: '/profile/admin/menu',
            items: [
                {
                    name: 'menu',
                    label: 'Menu',
                    link: '/profile/admin/menu'
                }
            ]
        },
        { name: 'reservation', label: 'Reservation', link: '/profile/admin/menu' }
    ]
    return (
        <div className="container admin--container">
            <div className="row">
                <div className="col-3">
                    <Sidebar items={items} />
                </div>
                {props.type === 'admin-menu'
                    ?
                    null
                    :
                    null
                }
            </div>
        </div>
    )
}

export default Admin;