import React, { Component } from 'react';
import Logo from '../../assets/images/logo.png';
import {
    Navbar, NavbarBrand, Nav, NavItem, NavbarToggler, Collapse,
    Button, Modal, ModalHeader, ModalBody, Label, Form, FormGroup, Input,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Util from '../Alert/Util';
import './Header.css';

// ?? Need to handle remember in Login
// ?? Need to style login modal
// ?? Need to fix dropdown style on mobile screen
class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false,
            isModalOpen: false,
            isDropdownOpen: false
        };

        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
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

    toggleDropdown() {
        this.setState({
            isDropdownOpen: !this.state.isDropdownOpen
        });
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
            <div>
                <Navbar className={this.props.sticky ? "navbar-sticky" : ""} expand="lg">
                    <div className="container">
                        <NavbarToggler className="navbar-dark" onClick={this.toggleNav} />
                        <NavbarBrand className="navbar--logo-holder" href="/">
                            <img src={Logo} alt="logo" className="navbar--logo" />
                            <h2 className="navbar--brand-name">Quinx</h2>
                        </NavbarBrand>
                        <Collapse navbar isOpen={this.state.isNavOpen} >
                            <Nav navbar className="navbar--link-list ml-auto">
                                <NavItem>
                                    <NavLink className="navbar--link-item" to="/welcome"> Welcome </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="navbar--link-item" to="/about"> About </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="navbar--link-item" to="/menu"> Menu </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="navbar--link-item" to="/reservation"> Reservation </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="navbar--link-item" to="/register"> Register </NavLink>
                                </NavItem>
                                <NavItem>
                                    {!this.props.auth.isAuthenticated
                                        ?
                                        <div onClick={this.toggleModal}>
                                            <span className="navbar--link-item fa fa-sign-in fa-lg"></span> Login
                                            {this.props.auth.isLoading
                                                ? <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null}
                                        </div>
                                        :
                                        <div>
                                            <Dropdown isOpen={this.state.isDropdownOpen} toggle={this.toggleDropdown}>
                                                <DropdownToggle caret>
                                                    {this.props.auth.user.username}
                                                </DropdownToggle>
                                                <DropdownMenu right>
                                                    <DropdownItem><NavLink to="/profile">Profile</NavLink></DropdownItem>
                                                    <DropdownItem divider />
                                                    <DropdownItem onClick={this.handleLogout}>
                                                        <span className="fa fa-sign-out fa-lg"></span>Logout
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                            {/* <div className="navbar--link-item navbar-text mr-3">{this.props.auth.user.username}</div> */}
                                        </div>
                                    }
                                </NavItem>
                                {/* <NavItem className="navbar--logout">
                                    {this.props.auth.isAuthenticated
                                        ?
                                        <div onClick={this.handleLogout}>
                                            <span className="navbar--link-item fa fa-sign-out fa-lg"></span> Logout
                                            {this.props.auth.isLoading
                                                ? <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null}
                                        </div>
                                        : null
                                    }
                                </NavItem> */}
                            </Nav>
                        </Collapse>
                    </div>
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
            </div >
        );
    }
}

export default Header;

