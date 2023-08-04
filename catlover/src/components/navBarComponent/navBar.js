import React from 'react';
import Nav from 'react-bootstrap/Nav';

const Navbar = () => {
    return (
            <Nav>
                <Nav.Item>
                    <Nav.Link href="/home">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/favorite">Favorite</Nav.Link>
                </Nav.Item>
            </Nav>
    );
};

export default Navbar;
