import React, { Component } from 'react';
import Logo from '../../assets/images/logo.png';
import {
    Navbar, NavbarBrand, Nav, NavItem, NavbarToggler, Collapse,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import LoginModal from './LoginModal';
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
            isDropdownOpen: false,
        };

        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
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
                                                    <NavLink to="/profile"><DropdownItem>Profile</DropdownItem></NavLink>
                                                    <DropdownItem divider />
                                                    <DropdownItem onClick={this.handleLogout}>
                                                        <span className="fa fa-sign-out fa-lg"></span>Logout
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </div>
                                    }
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                    <LoginModal isModalOpen={this.state.isModalOpen} toggleModal={this.toggleModal}
                        auth={this.props.auth} loginUser={this.props.loginUser} signupUser={this.props.signupUser} />
                    <div id="alertHolder"></div>
                </Navbar>
            </div >
        );
    }
}

export default Header;