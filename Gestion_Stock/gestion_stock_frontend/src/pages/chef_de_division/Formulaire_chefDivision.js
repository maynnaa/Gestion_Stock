import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../layout/sidebar';
import Formulaire from '../../components/formulaire';
import NavBar from '../../components/navbar';
import Button from '../../components/button'; // Ensure the path is correct

const FormulaireDivision = () => {
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

  return (
    <div style={styles.page}>
      <Sidebar>
        <div style={styles.buttonsContainer}>
          <Button
            size="medium"
            hovered={hoveredButton === 'accueil'}
            onMouseEnter={() => handleMouseEnter('accueil')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleNavigation('/')}
          >
            Accueil
          </Button>
          <Button
            size="medium"
            hovered={hoveredButton === 'stock'}
            onMouseEnter={() => handleMouseEnter('stock')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleNavigation('/stockDivision')}
          >
            Stock
          </Button>
          <Button
            size="medium"
            hovered={hoveredButton === 'request'}
            onMouseEnter={() => handleMouseEnter('request')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleNavigation('/formulaireDivision')}
          >
            Demande de besoins
          </Button>
          <Button
            size="medium"
            hovered={hoveredButton === 'history'}
            onMouseEnter={() => handleMouseEnter('history')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleNavigation('/historiqueDivision')}
          >
            Historique des demandes
          </Button>
          <Button
            size="medium"
            hovered={hoveredButton === 'received'}
            onMouseEnter={() => handleMouseEnter('received')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleNavigation('/demandesRecues')}
          >
            Demandes reçues
          </Button>
        </div>
      </Sidebar>
      <div style={styles.mainContent}>
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
  mainContent: {
    flex: 1,
    padding: '20px',
    backgroundColor: '#f8f9fa',
    display: 'flex',
    flexDirection: 'column',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
};

export default FormulaireDivision;
