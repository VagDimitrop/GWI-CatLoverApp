import React from 'react';
import Nav from 'react-bootstrap/Nav';

const NavBarComponent = () => {
    return (
            <Nav>
                <Nav.Item>
                    <Nav.Link className="navbar-link" href="/home">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className="navbar-link" href="/favorite">Favorite</Nav.Link>
                </Nav.Item>
            </Nav>
    );
};

export default NavBarComponent;
