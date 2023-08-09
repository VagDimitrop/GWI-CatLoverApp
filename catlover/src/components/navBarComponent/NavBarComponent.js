import React from 'react';
import Nav from 'react-bootstrap/Nav';

const NavBarComponent = () => {
    // This component is used as our Navigation Bar.
    // Below we have defined three Navigation Links
    return (
            <Nav>
                <Nav.Item>
                    <Nav.Link className="navbar-link" href="/home">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className="navbar-link" href="/favorites">Favorite</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className="navbar-link" href="/breeds">Breeds</Nav.Link>
                </Nav.Item>
            </Nav>
    );
};

export default NavBarComponent;
