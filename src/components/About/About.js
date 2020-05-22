import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from '../Loading/Loading';
import { baseUrl } from '../../shared/baseUrl';
import FadeIn from 'react-fade-in';
import './About.css';

function RenderStaff(props) {
    return (
        <Media tag="li">
            <Media left middle>
                <Media object src={baseUrl + props.staff.image} alt={props.staff.name} />
            </Media>
            <Media body className="ml-5">
                <h4>{props.staff.name}</h4>
                <p>{props.staff.designation}</p>
                <p className="d-none d-sm-block">{props.staff.description}</p>
            </Media>
        </Media>
    );
}

function About(props) {
    const staffs = props.staffs.staffs.map((staff) => {
        return (
            <FadeIn>
                <div key={staff.id} className="col-12 mt-4">
                    <RenderStaff staff={staff} />
                </div>
            </FadeIn>
        );
    });

    if (props.staffs.isLoading) {
        return (
            <div className="container about--container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.staffs.errMess) {
        return (
            <div className="container about--container">
                <div className="row">
                    <h4>{props.staffs.errMess}</h4>
                </div>
            </div>
        );
    }
    else
        return (
            <div className="container about--container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/welcome">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>About</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>About Us</h3>
                        <hr />
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12 col-md-6">
                        <h2>Our History</h2>
                        <p>Started in 2020, Quinx quickly established itself as a culinary icon par excellence in Moscow.
                        With its unique brand of world fusion cuisine that can be found nowhere else,
                        it enjoys patronage from the A-list clientele in Hong Kong.
                        Featuring four of the best three-star Michelin chefs in the world,
                            you never know what will arrive on your plate the next time you visit us.</p>
                        <p>The restaurant traces its humble beginnings to <em>The Frying Pan</em>,
                        a successful chain started by our CEO, Mr. Something, that featured for the first time
                        the world's best cuisines in a pan.</p>
                    </div>
                    <div className="col-12 col-md-6">
                        <Card>
                            <CardHeader className="bg-primary text-white">Facts At a Glance</CardHeader>
                            <CardBody>
                                <dl className="row p-1">
                                    <dt className="col-6">Started</dt>
                                    <dd className="col-6">23 March. 2020</dd>
                                    <dt className="col-6">Major Stake Holder</dt>
                                    <dd className="col-6">MC Fine Foods Inc.</dd>
                                    <dt className="col-6">Last Year's Turnover</dt>
                                    <dd className="col-6">$1,250,375</dd>
                                    <dt className="col-6">Employees</dt>
                                    <dd className="col-6">40</dd>
                                </dl>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-12">
                        <Card>
                            <CardBody className="bg-faded">
                                <blockquote className="blockquote">
                                    <p className="mb-0">You better cut the pizza in four pieces because
                                    I'm not hungry enough to eat six.</p>
                                    <footer className="blockquote-footer">Yogi Berra,
                                    <cite title="Source Title">The Wit and Wisdom of Yogi Berra,
                                    P. Pepe, Diversion Books, 2014</cite>
                                    </footer>
                                </blockquote>
                            </CardBody>
                        </Card>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h2>Our team</h2>
                        <hr />
                    </div>
                    <div className="col-12">
                        <Media list>
                            {staffs}
                        </Media>
                    </div>
                </div>
            </div>
        );
}

export default About;    