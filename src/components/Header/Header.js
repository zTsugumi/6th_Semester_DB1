import React from "react";
import Logo from "../../assets/images/logo.png";
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import "./Header.css";

const Header = ({ sticky }) => {
    return (
        <>
            <Navbar className={sticky ? "navbar navbar-sticky" : "navbar"}>
                <NavbarBrand className="navbar--logo-holder">
                    {sticky ? <img src={Logo} alt="logo" className="navbar--logo" /> : null}
                    <h1> Quinx</h1>
                </NavbarBrand>

                <Nav className="navbar--link-list">
                    <NavItem>
                        <NavLink className="navbar--link-item" to="/home"> Home </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="navbar--link-item" to="/about"> About </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="navbar--link-item" to="/menu"> Menu </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="navbar--link-item" to="/contact"> Contact </NavLink>
                    </NavItem>
                </Nav>                
            </Navbar>
        </>
    );
}

export default Header;

