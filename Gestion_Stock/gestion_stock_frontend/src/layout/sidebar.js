import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Sidebar = () => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const navigate = useNavigate();

  const handleMouseEnter = (button) => {
    setHoveredButton(button);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const buttonStyles = (button) => ({
    width: button === 'large' ? '100%' : button === 'small' ? '50%' : '75%', 
    padding: '10px',
    margin: '10px 0',
    borderRadius: '20px', 
    fontSize: '18px',
    border: '1px solid transparent',
    transition: 'box-shadow 0.3s',
    cursor: 'pointer',
    boxShadow: hoveredButton === button ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
    borderColor: hoveredButton === button ? '#ccc' : 'transparent',
  });

  return (
    <div style={styles.sidebar}>
      <div style={styles.logo}>
        <img src="/MAPDEF_logo.png" alt='logo' style={styles.logoImage} />
      </div>
      <ul style={styles.sidebarMenu}>
        <Button
          variant="outline-secondary"
          style={buttonStyles('home')}
          onMouseEnter={() => handleMouseEnter('home')}
          onMouseLeave={handleMouseLeave}
         
        >
          Accueil
        </Button>
        <Button
          variant="outline-secondary"
          style={buttonStyles('stock')}
          onMouseEnter={() => handleMouseEnter('stock')}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleNavigation('/stock')}
        >
          Stock
        </Button>
        <div style={styles.bottomSection}>
          <Button
            variant="outline-secondary"
            style={buttonStyles('logout')}
            onMouseEnter={() => handleMouseEnter('logout')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleNavigation('/login')}
          >
            Se déconnecter
          </Button>
        </div>
      </ul>
    </div>
  );
};

const styles = {
  sidebar: {
    height: '100vh',
    width: '250px',
    backgroundColor: '#ABEDDD',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px',
    boxSizing: 'border-box',
  },
  logo: {
    marginBottom: '20px',
    fontSize: '50px',
    fontWeight: 'bold',
  },
  logoImage: {
    width: '200px',
    height: 'auto',
  },
  sidebarMenu: {
    listStyleType: 'none',
    padding: '0',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  bottomSection: {
    marginTop: 'auto',
    width: '90%',
    display: 'flex',
    justifyContent: 'center',
  },
};

export default Sidebar;
