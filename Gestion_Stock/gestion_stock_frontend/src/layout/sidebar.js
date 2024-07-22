import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

const Sidebar = () => {
  const [hoveredButton, setHoveredButton] = useState(null);

  const handleMouseEnter = (button) => {
    setHoveredButton(button);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  return (
    <div style={styles.sidebar}>
      <div style={styles.logo}>
        <img src="/MAPDEF_logo.png" alt='logo' style={styles.logoImage} />
      </div>
      <ul style={styles.sidebarMenu}>
        <Button
          variant="outline-secondary"
          style={hoveredButton === 'home' ? styles.sidebarButtonHover : styles.sidebarButton}
          onMouseEnter={() => handleMouseEnter('home')}
          onMouseLeave={handleMouseLeave}
        >
          Acceuil
        </Button>
        <Button
          variant="outline-secondary"
          style={hoveredButton === 'stock' ? styles.sidebarButtonHover : styles.sidebarButton}
          onMouseEnter={() => handleMouseEnter('stock')}
          onMouseLeave={handleMouseLeave}
        >
          Stock
        </Button>
        <div style={styles.bottomSection}>
          <Button
            variant="outline-secondary"
            style={hoveredButton === 'logout' ? styles.sidebarButtonHover : styles.sidebarButton}
            onMouseEnter={() => handleMouseEnter('logout')}
            onMouseLeave={handleMouseLeave}
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
    backgroundColor: '#ABEDDD', // Couleur de fond du sidebar
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
  sidebarButton: {
    width: '90%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '20px', 
    fontSize: '18px',
    border: '1px solid transparent', // Bordure transparente pour le bouton par défaut
    transition: 'box-shadow 0.3s',
    cursor: 'pointer', // Changer le curseur en pointeur
  },
  sidebarButtonHover: {
    width: '90%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '20px', 
    fontSize: '18px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Effet d'ombre au survol
    border: '1px solid #ccc', // Bordure visible au survol
    cursor: 'pointer',
  },
  bottomSection: {
    marginTop: 'auto',
    width: '90%',
    display: 'flex',
    justifyContent: 'center',
  },
};

export default Sidebar;
