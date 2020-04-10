import React, {Component} from 'react';
import './Layout.scss'
import {Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";

class Layout extends Component {
    render() {
        return (
            <div className="Layout">
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="#home">Data exam</Navbar.Brand>
                    <Nav className="mr-auto">
                        <NavLink to="/" exact className="nav-link">Home</NavLink>
                        <NavLink to="/add" exact className="nav-link">Add Card</NavLink>
                        <NavLink to="/info" exact className="nav-link">Information</NavLink>
                    </Nav>
                </Navbar>
                {this.props.children}
            </div>
        );
    }
}

export default Layout;