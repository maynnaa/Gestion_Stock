import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate pour la navigation
import Sidebar from '../../layout/sidebar'; 
import NavBar from '../../components/navbar';
import ScrollableTable from '../../components/tableauStock'; 
import Button from '../../components/button'; // Assurez-vous que le chemin est correct

const StockChefService = () => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const navigate = useNavigate(); // Initialiser navigate

  const handleMouseEnter = (button) => {
    setHoveredButton(button);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  // Fonction pour gérer la navigation
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div style={styles.page}>
      <div style={styles.sidebarWrapper}>
        <Sidebar />
        <div style={styles.additionalButtons}>
          <Button
            size="medium"
            hovered={hoveredButton === 'request'}
            onMouseEnter={() => handleMouseEnter('request')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleNavigation('/formulaire')} // Redirection vers /formulaire
          >
            Demande de besoins
          </Button>
          <Button
            size="medium"
            hovered={hoveredButton === 'history'}
            onMouseEnter={() => handleMouseEnter('history')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleNavigation('/historique')} // Redirection vers /historique
          >
            Historique des demandes
          </Button>
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
    top: '300px', // Ajuster cette valeur selon tes besoins
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
