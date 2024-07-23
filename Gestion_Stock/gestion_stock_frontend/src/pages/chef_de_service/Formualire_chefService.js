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
      <Sidebar />
      <div style={styles.content}>
        <NavBar />
        <Formulaire />
        <div style={styles.buttonContainer}>
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
    </div>
  );
};

const styles = {
  page: {
    display: 'flex',
    height: '100vh', 
  },
  content: {
    flex: 1,
    padding: '20px',
    backgroundColor: '#f8f9fa',
    display: 'flex',
    flexDirection: 'column',
  },
  buttonContainer: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};

export default PageWithSidebar;
