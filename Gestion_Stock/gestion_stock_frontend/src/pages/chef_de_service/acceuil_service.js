import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/navbar';
import Sidebar from '../../layout/sidebar';
import Accueil from '../../components/accueil';
import Button from '../../components/button';
import { Nav } from 'react-bootstrap';

const AccueilService = () => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [activeButton, setActiveButton] = useState('accueil'); // Default to 'accueil'
  const navigate = useNavigate(); 

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
        <div style={styles.additionalButtons}>
         
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
        <Sidebar />
        </div>
      <div style={styles.content}>
        <NavBar>
          <Nav.Link
            href="#"
            onClick={() => navigate('/accueilService')}
            style={styles.accueilLink}
          >
            Accueil
          </Nav.Link>
        </NavBar>
        <div style={styles.contentContainer}>
          <Accueil /> 
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
    display: 'flex',           // Ajoute Flexbox pour centrer
    flexDirection: 'column',   // Colonne pour centrer verticalement
    justifyContent: 'center',  // Centre verticalement
    alignItems: 'center',      // Centre horizontalement
  },
  contentContainer: {
    marginTop: '20px',
    width: '100%',             // Assure que le container prend toute la largeur disponible
    display: 'flex',           // Utilise Flexbox dans le container
    justifyContent: 'center',  // Centre le contenu à l'intérieur
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    paddingBottom: '10px', // Ajuster l'espace sous le header si nécessaire
  },
  accueilLink: {
    fontWeight: 'bold',
    color: '#6c757d', // Couleur gris
    fontSize: '18px',
    marginRight: '83%', // Ajuster l'espacement si nécessaire
    textDecoration: 'none', // Retirer le soulignement par défaut des liens
  },
};

export default AccueilService;
