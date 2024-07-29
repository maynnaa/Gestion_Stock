import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FaBell, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div>
      <style type="text/css">
        {`
          .navbar-custom {
            background-color: #ABEDDD;
            padding: 0;
            position: fixed;
            top: 0;
            width: calc(100% - 250px); 
            left: 250px; 
            z-index: 1000; 
          }

          .navbar-custom .navbar-nav {
            flex: 1;
            display: flex;
            justify-content: space-between;
          }

          .navbar-custom .nav-link {
            margin-left: 45px;
            display: flex;
            align-items: center;
          }

          .navbar-custom .nav-right {
            margin-left: 1100px;
            display: flex;
            align-items: center;
            margin-right:30px;
          }
        `}
      </style>
      <Navbar className="navbar-custom" expand="lg">
        <Nav className="navbar-nav">
          <Nav.Link
            href="#"
            onClick={() => handleNavigation('/')}
            style={{ fontWeight: 'bold' }}
          >
            Accueil
          </Nav.Link>
          <Nav className="nav-right">
            <Nav.Link href="#notifications">
              <FaBell size={25} />
            </Nav.Link>
            <Nav.Link href="#" onClick={() => handleNavigation('/login')}>
              <FaSignOutAlt size={25} />
            </Nav.Link>
          </Nav>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavBar;
