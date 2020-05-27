import React from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import Favorite from './Favorite';
import MyReservation from './MyReservation';
import './NormalUser.css';

const items = [
    { name: 'favorite', label: 'Favorite', link: '/profile/favorite' },
    { name: 'reservation', label: 'Reservation', link: '/profile/reservation' }
]

const NormalUser = (props) => {
    return (
        <div className="container normalUser--container">
            <div className="row">
                <div className="col-3">
                    <Sidebar items={items} />
                </div>
                {props.type === 'favorite'
                    ?
                    <div className="col-9">
                        <Favorite favorites={props.favorites} deleteFavorite={props.deleteFavorite} />
                    </div>
                    :
                    null
                }
                {props.type === 'reservation'
                    ?
                    <div className="col-9">
                        <MyReservation reservations={props.reservations} />
                    </div>
                    :
                    null
                }
            </div>
        </div>
    )
}

export default NormalUser;