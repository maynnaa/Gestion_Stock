// sidebar.js
import React, { useState } from 'react';
import DynamicButton from '../components/button'; // Chemin mis à jour pour pointer vers components/button

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
        <DynamicButton
          size="medium"
          hovered={hoveredButton === 'home'}
          onMouseEnter={() => handleMouseEnter('home')}
          onMouseLeave={handleMouseLeave}
        >
          Accueil
        </DynamicButton>
        <DynamicButton
          size="medium"
          hovered={hoveredButton === 'stock'}
          onMouseEnter={() => handleMouseEnter('stock')}
          onMouseLeave={handleMouseLeave}
        >
          Stock
        </DynamicButton>
        <div style={styles.bottomSection}>
          <DynamicButton
            size="medium"
            hovered={hoveredButton === 'logout'}
            onMouseEnter={() => handleMouseEnter('logout')}
            onMouseLeave={handleMouseLeave}
          >
            Se déconnecter
          </DynamicButton>
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
