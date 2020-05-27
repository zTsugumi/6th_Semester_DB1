import React from 'react';

import Admin from './Admin/Admin';
import NormalUser from './NormalUser/NormalUser';

const Profile = (props) => {
    return (
        <>
            {props.auth.isAdmin
                ?
                <Admin type={props.type}
                    dishes={props.dishes} />
                :
                <NormalUser type={props.type} favorites={props.favorites} deleteFavorite={props.deleteFavorite}
                    reservations={props.reservations} />
            }
        </>
    );
}

export default Profile;