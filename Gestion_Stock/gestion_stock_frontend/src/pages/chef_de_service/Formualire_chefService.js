import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../../layout/sidebar'; 
import Formulaire from '../../components/formulaire'; 
import NavBar from '../../components/navbar';
import Button from '../../components/button'; 

const PageWithSidebar = () => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    switch (path) {
      case '/':
        setActiveButton('home');
        break;
      case '/stock':
        setActiveButton('stock');
        break;
      case '/formulaire':
        setActiveButton('request');
        break;
      case '/historique':
        setActiveButton('history');
        break;
      default:
        setActiveButton(null);
    }
  }, [location.pathname]);

  const handleMouseEnter = (button) => {
    setHoveredButton(button);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  const handleNavigation = (path, button) => {
    setActiveButton(button);
    navigate(path);
  };

  return (
    <div style={styles.page}>
      <div style={styles.sidebarWrapper}>
        <Sidebar />
        <div style={styles.additionalButtons}>
          <Button
            size="medium"
            hovered={hoveredButton === 'home' || activeButton === 'home'}
            onMouseEnter={() => handleMouseEnter('home')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleNavigation('/', 'home')}
          >
            Accueil
          </Button>
          <Button
            size="medium"
            hovered={hoveredButton === 'stock' || activeButton === 'stock'}
            onMouseEnter={() => handleMouseEnter('stock')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleNavigation('/stock', 'stock')}
          >
            Stock
          </Button>
          <Button
            size="medium"
            hovered={hoveredButton === 'request' || activeButton === 'request'}
            onMouseEnter={() => handleMouseEnter('request')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleNavigation('/formulaire', 'request')}
          >
            Demande de besoins
          </Button>
          <Button
            size="medium"
            hovered={hoveredButton === 'history' || activeButton === 'history'}
            onMouseEnter={() => handleMouseEnter('history')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleNavigation('/historique', 'history')}
          >
            Historique des demandes
          </Button>
        </div>
      </div>
      <div style={styles.content}>
        <NavBar />
        <Formulaire />
      </div>
    </div>
  );
};

const styles = {
  page: {
    display: 'flex',
    height: '100vh',
  },
  sidebarWrapper: {
    position: 'relative',
    width: '250px',
  },
  additionalButtons: {
    position: 'absolute',
    top: '200px', 
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px',
  },
  content: {
    flex: 1,
    padding: '20px',
    backgroundColor: '#f8f9fa',
  },
};

export default PageWithSidebar;
