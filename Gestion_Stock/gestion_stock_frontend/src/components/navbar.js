import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FaBell } from 'react-icons/fa';

const NavBar = () => {
  return (
    <div>
      <style type="text/css">
        {`
          .navbar-custom {
            background-color: #ABEDDD;
            padding: 0;
            position: fixed;
            top: 0;
            width: calc(100% - 200px); 
            left: 200px; 
            z-index: 1000; 
          }

          .navbar-custom .ml-auto {
            margin-left: 95%;
          }
        `}
      </style>
      <Navbar className="navbar-custom" expand="lg">
        <Nav className="ml-auto">
          <Nav.Link href="#notifications">
            <FaBell size={25} />
          </Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavBar;
