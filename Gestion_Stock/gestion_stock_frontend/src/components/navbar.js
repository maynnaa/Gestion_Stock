import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { FaBell, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DivisionPopup from './division_popup'; 

const NavBar = ({ id_personnel, onAccueilClick }) => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [iconColor, setIconColor] = useState('#000');
  const [showPopup, setShowPopup] = useState(false); // État pour afficher le popup
  const [selectedNotification, setSelectedNotification] = useState(null); // Notification sélectionnée

  const fetchNotifications = async () => {
    if (!id_personnel) {
      console.warn('id_personnel is null or undefined');
      return;
    }
    try {
      const response = await axios.get('http://localhost:9091/api/notification');
      const allNotifications = response.data;

      const userNotifications = allNotifications.filter(notification => 
        notification.personnel && notification.personnel.id_personnel === id_personnel
      );

      setNotifications(userNotifications);
      setIconColor(userNotifications.length > 0 ? 'red' : '#000');
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [id_personnel]);

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setShowPopup(true); // Afficher le popup
    setShowNotifications(false); // Fermer le menu déroulant
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
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
          }

          .navbar-custom .nav-link {
            display: flex;
            align-items: center;
          }

          .navbar-custom .nav-right {
            display: flex;
            align-items: center;
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

          .no-notifications {
            padding: 10px;
            text-align: center;
            color: #888;
          }
        `}
      </style>
      <Navbar className="navbar-custom" expand="lg">
        <Nav className="navbar-nav">
          <Nav.Link
            href="#"
            onClick={onAccueilClick}
            style={styles.accueilLink}
          >
            Accueil
          </Nav.Link>

          <div className="nav-right">
            <Dropdown show={showNotifications} onToggle={(isOpen) => setShowNotifications(isOpen)}>
              <Dropdown.Toggle as="a" className="nav-link" id="notification-dropdown">
                <FaBell size={25} color={iconColor} />
              </Dropdown.Toggle>

              <Dropdown.Menu align="end">
                {notifications.length === 0 ? (
                  <div className="no-notifications">Aucune nouvelle notification</div>
                ) : (
                  notifications.map(notification => (
                    <Dropdown.Item 
                      key={notification.id_notification}
                      onClick={() => handleNotificationClick(notification)} 
                    >
                      <div className="notification-title">
                        {notification.type === 'Demande de besoins' 
                          ? 'Vous avez une nouvelle demande de besoin à consulter ' 
                          : 'Vous avez une réponse'}
                      </div>
                  
                    </Dropdown.Item>
                  ))
                )}
              </Dropdown.Menu>
            </Dropdown>

            <Nav.Link href="#" onClick={() => navigate('/login')}>
              <FaSignOutAlt size={25} />
            </Nav.Link>
          </div>
        </Nav>
      </Navbar>

      {/* Afficher le popup si showPopup est true */}
      {showPopup && (
        <DivisionPopup 
          showModal={showPopup} 
          handleCloseModal={() => setShowPopup(false)} 
          notification={selectedNotification} 
          id={id_personnel}
        />
      )}
    </div>
  );
};

const styles = {
  accueilLink: {
    fontWeight: 'bold',
    color: '#6c757d',
    fontSize: '18px',
    marginRight: '83%',
    textDecoration: 'none',
  },
};

export default NavBar;
