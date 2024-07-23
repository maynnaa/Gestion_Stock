import React, { useState } from 'react';
import Sidebar from '../../layout/sidebar'; 
import Formulaire from '../../components/formulaire'; 
import NavBar from '../../components/navbar';
import DynamicButton from '../../components/button'; // Assurez-vous que le chemin est correct

const PageWithSidebar = () => {
  const [hoveredButton, setHoveredButton] = useState(null);

  const handleMouseEnter = (button) => {
    setHoveredButton(button);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  return (
    <div style={styles.page}>
      <div style={styles.sidebarWrapper}>
        <Sidebar />
        <div style={styles.additionalButtons}>
          <DynamicButton
            size="medium"
            hovered={hoveredButton === 'request'}
            onMouseEnter={() => handleMouseEnter('request')}
            onMouseLeave={handleMouseLeave}
          >
            Demande de besoins
          </DynamicButton>
          <DynamicButton
            size="medium"
            hovered={hoveredButton === 'history'}
            onMouseEnter={() => handleMouseEnter('history')}
            onMouseLeave={handleMouseLeave}
          >
            Historique des demandes
          </DynamicButton>
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
    top: '300px', // Adjust this value to ensure the buttons are visible and not overlapping other elements
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
