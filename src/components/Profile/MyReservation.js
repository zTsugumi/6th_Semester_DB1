import React from 'react';
import { Media, Button } from 'reactstrap';
import { Loading } from '../Loading/Loading';
import FadeIn from 'react-fade-in';

// Need to add edit and delete reservation
function RenderReservation({ reservation }) {
    return (
        <Media tag="li">
            <Media body>
                <Media heading>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(reservation.date)))}</Media>
                <div className="row">
                    <div className="col-3">
                        <h6>Contact Tel: </h6>
                    </div>
                    <div className="col-9">
                        <p>{reservation.telnum}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <h6>Email: </h6>
                    </div>
                    <div className="col-9">
                        <p>{reservation.email}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <h6>N. Guest: </h6>
                    </div>
                    <div className="col-9">
                        <p>{reservation.nGuest}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <h6>Message: </h6>
                    </div>
                    <div className="col-9">
                        <p>{reservation.message}</p>
                    </div>
                </div>
            </Media>
        </Media>
    );
}

const MyReservation = (props) => {
    if (props.reservations.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.reservations.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.reservations.errMess}</h4>
                </div>
            </div>
        )
    }
    else if (props.reservations.reservations) {
        const reservations = props.reservations.reservations.reservations.map((reservation) => {
            return (
                <div key={reservation._id} className="mt-3 mb-5">
                    <RenderReservation reservation={reservation} />
                </div>
            );
        });

        return (
            <FadeIn>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h3>My Reservation</h3>
                            <hr />
                        </div>
                        <Media list className="col-12">
                            {reservations}
                        </Media>
                        <div className="col-12">
                            <span className="fa fa-exclamation-circle"></span> Please contact us to change or cancel your reservation
                        </div>
                    </div>
                </div>
            </FadeIn>
        );
    }
    else {
        return (
            <FadeIn>
                <div className="container">
                    <div className="row">
                        <h4>You have no reservations</h4>
                    </div>
                </div>
            </FadeIn>
        )
    }
}

export default MyReservation;