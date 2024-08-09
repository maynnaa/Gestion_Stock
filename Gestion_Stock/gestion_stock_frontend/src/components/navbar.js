import React, { useState } from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { FaBell, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const NavBar = ({ children }) => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

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
            align-items: center;
            justify-content: space-between;
          }

          .navbar-custom .nav-link {
            display: flex;
            align-items: center;
          }

          .navbar-custom .nav-right {
            display: flex;
            align-items: center;
            margin-right: 30px;
          }

          .dropdown-menu {
            width: 300px;
          }

          .dropdown-item {
            display: flex;
            align-items: center;
            white-space: normal;
            padding: 10px;
          }

          .dropdown-item:hover {
            background-color: #f0f0f0;
          }

          .notification-title {
            font-weight: bold;
            margin-bottom: 5px;
          }

          .notification-text {
            color: #555;
          }
        `}
      </style>
      <Navbar className="navbar-custom" expand="lg">
        <Nav className="navbar-nav">
          {children}
          <Nav className="nav-right">
            <Dropdown show={showNotifications} onToggle={(isOpen) => setShowNotifications(isOpen)}>
              <Dropdown.Toggle as="a" className="nav-link" id="notification-dropdown">
                <FaBell size={25} />
              </Dropdown.Toggle>

              <Dropdown.Menu align="end">
                <Dropdown.Item>
                  <div className="notification-title">New Comment</div>
                  <div className="notification-text">Someone commented on your post.</div>
                </Dropdown.Item>
                <Dropdown.Item>
                  <div className="notification-title">New Like</div>
                  <div className="notification-text">Someone liked your post.</div>
                </Dropdown.Item>
                <Dropdown.Item>
                  <div className="notification-title">New Message</div>
                  <div className="notification-text">You have received a new message.</div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

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
