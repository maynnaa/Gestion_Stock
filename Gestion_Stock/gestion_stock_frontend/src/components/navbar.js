import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { FaBell, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Assurez-vous que useNavigate est importé
import axios from 'axios';

const NavBar = ({ id_personnel, onAccueilClick }) => {
  const navigate = useNavigate(); // Définir navigate ici
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      console.log('Fetching notifications...');
      const response = await axios.get('http://localhost:9091/api/notification');
      console.log('Notifications fetched:', response.data);

      const allNotifications = response.data;
      console.log('User ID:', id_personnel);

      const userNotifications = allNotifications.filter(notification => {
        console.log('Comparing user ID:', id_personnel, 'with notification personnel ID:', notification.personnel.id_personnel);
        return notification.personnel.id_personnel === id_personnel;
      });

      console.log('Filtered notifications for user:', userNotifications);
      setNotifications(userNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    console.log('Component mounted, fetching notifications...');
    fetchNotifications();
  }, [id_personnel]);

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
            onClick={onAccueilClick} // Utiliser la fonction passée en prop
            style={styles.accueilLink}
          >
            Accueil
          </Nav.Link>

          <div className="nav-right">
            <Dropdown show={showNotifications} onToggle={(isOpen) => setShowNotifications(isOpen)}>
              <Dropdown.Toggle as="a" className="nav-link" id="notification-dropdown">
                <FaBell size={25} />
              </Dropdown.Toggle>

              <Dropdown.Menu align="end">
                {notifications.length === 0 ? (
                  <div className="no-notifications">Aucune nouvelle notification</div>
                ) : (
                  notifications.map(notification => (
                    <Dropdown.Item key={notification.id_notification}>
                      <div className="notification-title">
                        {notification.type === 'demande de besoin' ? 'Nouvelle demande de besoin' : 'Réponse'}
                      </div>
                      <div className="notification-text">
                        {notification.formulaireBesoins ? `Demande de besoin ID ${notification.formulaireBesoins.id_formulaire}` : 'Réponse'}
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
