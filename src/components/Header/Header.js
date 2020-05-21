import React, { Component } from 'react';
import Logo from '../../assets/images/logo.png';
import {
    Navbar, NavbarBrand, Nav, NavItem, NavbarToggler, Collapse,
    Button, Modal, ModalHeader, ModalBody, Label, Form, FormGroup, Input
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Util from '../Alert/Util';
import './Header.css';

// ?? Need to handle remember in Login
class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };

        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    };

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        })
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleLogin(event) {
        this.toggleModal();
        this.props.loginUser({ username: this.username.value, password: this.password.value })
            .then(
                () => {
                    if (this.props.auth.isAuthenticated)
                        Util.alert(true, "Login Successful");
                    else
                        Util.alert(false, "Login Failed");
                }
            )
        event.preventDefault();
    }

    handleLogout() {
        this.props.logoutUser();
    }

    render() {
        return (
            <>
                <Navbar className={this.props.sticky ? "navbar-sticky" : ""} expand="md">
                    <NavbarBrand className="navbar--logo-holder">
                        {this.props.sticky ? <img src={Logo} alt="logo" className="navbar--logo" /> : null}
                        <h2> Quinx</h2>
                    </NavbarBrand>
                    <NavbarToggler className="navbar-dark" onClick={this.toggleNav} />
                    <Collapse navbar isOpen={this.state.isNavOpen} >
                        <Nav navbar className="navbar--link-list ml-auto">
                            <NavItem className="mx-auto">
                                <NavLink className="navbar--link-item" to="/home"> Home </NavLink>
                            </NavItem>
                            <NavItem className="mx-auto">
                                <NavLink className="navbar--link-item" to="/about"> About </NavLink>
                            </NavItem>
                            <NavItem className="mx-auto">
                                <NavLink className="navbar--link-item" to="/menu"> Menu </NavLink>
                            </NavItem>
                            <NavItem className="mx-auto">
                                <NavLink className="navbar--link-item" to="/contact"> Contact </NavLink>
                            </NavItem>
                        </Nav>
                        <Nav navbar>
                            <NavItem>
                                {!this.props.auth.isAuthenticated ?
                                    <Button outline onClick={this.toggleModal}>
                                        <span className="fa fa-sign-in fa-lg"></span> Login
                                        {this.props.auth.isLoading
                                            ? <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                            : null}
                                    </Button>
                                    :
                                    <div>
                                        <div className="navbar-text mr-3">{this.props.auth.user.username}</div>
                                        <Button outline onClick={this.handleLogout}>
                                            <span className="fa fa-sign-out fa-lg"></span> Logout
                                            {this.props.auth.isLoading
                                                ? <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null}
                                        </Button>
                                    </div>
                                }
                            </NavItem>
                        </Nav>
                    </Collapse>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.handleLogin}>
                                <FormGroup>
                                    <Label htmlFor="username">Username</Label>
                                    <Input type="text" id="username" name="username"
                                        innerRef={(input) => this.username = input} />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="password">Password</Label>
                                    <Input type="password" id="password" name="password"
                                        innerRef={(input) => this.password = input} />
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox" name="remember"
                                            innerRef={(input) => this.remember = input} />
                                    Remember me
                                </Label>
                                </FormGroup>
                                <Button type="submit" value="submit" color="primary">Login</Button>
                            </Form>
                        </ModalBody>
                    </Modal>
                    <div id="alertHolder"></div>
                </Navbar>
            </>
        );
    }
}

export default Header;

