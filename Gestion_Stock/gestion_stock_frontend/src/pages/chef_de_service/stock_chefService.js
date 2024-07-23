import React, { useState } from 'react';
import Sidebar from '../../layout/sidebar'; 
import NavBar from '../../components/navbar';
import ScrollableTable from '../../components/tableauStock'; 
import DynamicButton from '../../components/button'; // Assure-toi que le chemin est correct

const StockChefService = () => {
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
        <div style={styles.tableContainer}>
          <ScrollableTable />
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
  sidebarWrapper: {
    position: 'relative',
    width: '250px',
  },
  additionalButtons: {
    position: 'absolute',
    top: '300px', // Ajuste cette valeur selon tes besoins
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  tableContainer: {
    marginTop: '60px', // Ajoute un espacement supérieur pour déplacer le tableau plus bas
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
};

export default StockChefService;
