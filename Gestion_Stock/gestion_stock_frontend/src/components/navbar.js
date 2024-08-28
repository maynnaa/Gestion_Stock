import React, { useState, useEffect, useCallback } from 'react';
import { Navbar, Nav, Dropdown, Badge } from 'react-bootstrap';
import { FaBell, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DivisionPopup from './division_popup'; 

const NavBar = ({ id_personnel, onAccueilClick }) => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [fonction, setFonction] = useState(null);
  const [loading, setLoading] = useState(true); 

  const fetchNotifications = useCallback(async () => {
    if (!id_personnel) {
      console.warn('id_personnel est null ou undefined');
      return;
    }
    try {
      const response = await axios.get('http://localhost:9091/api/notification');
      const allNotifications = response.data;

      const userNotifications = allNotifications.filter(notification => 
        notification.personnel && notification.personnel.id_personnel === id_personnel && notification.is_seen === "false"
      );

      setNotifications(userNotifications);
    } catch (error) {
      console.error('Erreur lors de la récupération des notifications :', error);
    }
  }, [id_personnel]);

  useEffect(() => {
    const fetchFonction = async () => {
      try {
        const response = await axios.get(`/api/personnel/${id_personnel}/fonctionn`);
        setFonction(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération de la Fonction:', error);
      } finally {
        setLoading(false); 
      }
    };

    if (id_personnel) {
      fetchFonction();
    }
  }, [id_personnel]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications, refresh]);

  const handleNotificationClick = async (notification) => {
    setSelectedNotification(notification);
    setShowPopup(true);
    setShowNotifications(false);

    if (notification.type === 'reponse' || notification.personnel.fonction.id_fonction === 4) {
      try {
        await axios.put(`http://localhost:9091/api/notification/${notification.id_notification}`, {
          ...notification,
          is_seen: "true",
        });
        setNotifications(notifications.map(notif =>
          notif.id_notification === notification.id_notification
            ? { ...notif, is_seen: "true" }
            : notif
        ));
      } catch (error) {
        console.error('Erreur lors de la mise à jour de la notification :', error);
      }
    }
  };

  const handleCloseModal = () => {
    setShowPopup(false);
    setRefresh(prev => !prev); 
  };

  const handleActionClick = async (action) => {
    try {
      await axios.put(`http://localhost:9091/api/notification/${selectedNotification.id_notification}`, {
        ...selectedNotification,
        status: action,
      });
      setRefresh(prev => !prev);
      setShowPopup(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la notification :', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('id_personnel');
    navigate('/login', { replace: true });
  };

  const unreadCount = notifications.length;

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
          <Nav className="navbar-nav">
  <span style={styles.fonctionLink}>
    Vous êtes : <strong>{fonction && fonction.libelle}</strong>
  </span>
</Nav>


         
          <div className="nav-right">
            <Dropdown show={showNotifications} onToggle={(isOpen) => setShowNotifications(isOpen)}>
              <Dropdown.Toggle as="a" className="nav-link" id="notification-dropdown">
                <FaBell size={25} />
                {unreadCount > 0 && (
                  <Badge bg="danger" pill style={{ position: 'absolute', top: 5, right: 0 }}>
                    {unreadCount}
                  </Badge>
                )}
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
                          ? 'Vous avez une nouvelle demande de besoin à consulter' 
                          : 'Vous avez une réponse'}
                      </div>
                    </Dropdown.Item>
                  ))
                )}
              </Dropdown.Menu>
            </Dropdown>

            <Nav.Link href="#" onClick={handleLogout}>
              <FaSignOutAlt size={25} />
            </Nav.Link>
          </div>
        </Nav>
      </Navbar>

      {showPopup && (
        <DivisionPopup 
          showModal={showPopup} 
          handleCloseModal={handleCloseModal} 
          notification={selectedNotification} 
          id={id_personnel}
          onApprove={() => handleActionClick('approve')} 
          onReject={() => handleActionClick('reject')} 
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
    textDecoration: 'none',
  },
  fonctionLink: {
    flexGrow: 1, 
    whiteSpace: 'nowrap',
    marginLeft: '84%', 
    marginRight: '5px', 
  },
};

export default NavBar;
