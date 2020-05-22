import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Loading } from '../Loading/Loading';
import { baseUrl } from '../../shared/baseUrl';
import { Link } from 'react-router-dom';
import FadeIn from 'react-fade-in';
import './Home.css';

function RenderCard({ item, isLoading, errMess }) {
    if (isLoading) {
        return (
            <Loading />
        );
    }
    else if (errMess) {
        return (
            <h4>{errMess}</h4>
        );
    }
    else
        return (
            <FadeIn>
                <Card>
                    <CardImg src={baseUrl + item.image} alt={item.name} />
                    <CardBody>
                        <CardTitle>{item.name}</CardTitle>
                        {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
                        <CardText>{item.description}</CardText>
                    </CardBody>
                </Card>
            </FadeIn>
        );
}

const Home = (props) => {
    return (
        <div className="container home--container">
            <div className="row align-items-start">
                <div className="col-12 col-md home--item">
                    <h2>HOURS & LOCATION</h2>
                    <p>
                        470 Pacific Avenue,<br />
                        San Francisco, CA 94133<br />
                        415.775.8500<br />
                    </p>
                    <p>
                        Tues - Thurs: 5:30 p.m. to 9:00 p.m.<br />
                        Fri - Sat: 5:00 p.m. to 9:30 p.m.<br />
                        Closed Sundays and Mondays<br />
                    </p>
                    <p>
                        Open for private dining everyday.<br />
                    </p>
                    <Link to="/reservation">
                        <Button outline color="primary">
                            <p>MAKE A RESERVATION</p>
                        </Button>
                    </Link>
                </div>

                <div className="col-12 col-md-6 home--item">
                    <h2>FEATURED DISH</h2>
                    <RenderCard item={props.dish}
                        isLoading={props.dishesLoading}
                        errMess={props.dishesErrMess}
                    />
                </div>
            </div>
        </div >
    );
}

export default Home;