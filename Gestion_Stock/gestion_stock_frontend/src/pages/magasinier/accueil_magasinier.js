import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/navbar';
import Sidebar from '../../layout/sidebar';
import Accueil from '../../components/accueil';
import Button from '../../components/button';
import { Nav } from 'react-bootstrap';

const AccueilMagasinier = () => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [activeButton, setActiveButton] = useState('accueil'); // Par défaut 'accueil'
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
        <Sidebar />
        <div style={styles.additionalButtons}>
          <Button
            size="medium"
            hovered={hoveredButton === 'stock' || activeButton === 'stock'}
            onMouseEnter={() => handleMouseEnter('stock')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleNavigation('/stockMagasinier', 'stock')}
          >
            Gestion de Stock
          </Button>
          <Button
            size="medium"
            hovered={hoveredButton === 'request' || activeButton === 'request'}
            onMouseEnter={() => handleMouseEnter('request')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleNavigation('/demandeAchat', 'request')}
          >
            Demande d'achat
          </Button>
          <Button
            size="medium"
            hovered={hoveredButton === 'history' || activeButton === 'history'}
            onMouseEnter={() => handleMouseEnter('history')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleNavigation('/historiqueDemandeAchat', 'history')}
          >
            Historique des demandes d'achat
          </Button>
          <Button
            size="medium"
            hovered={hoveredButton === 'historyBesoins' || activeButton === 'historyBesoins'}
            onMouseEnter={() => handleMouseEnter('historyBesoins')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleNavigation('/historiqueBesoinsMagasinier', 'historyBesoins')}
          >
            Historique des demandes de besoins
          </Button>
          <Button
            size="medium"
            hovered={hoveredButton === 'gestionFournisseur' || activeButton === 'gestionFournisseur'}
            onMouseEnter={() => handleMouseEnter('gestionFournisseur')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleNavigation('/gestionFournisseur', 'gestionFournisseur')}
          >
            Gestion des Fournisseurs
          </Button>
          <Button
            size="medium"
            hovered={hoveredButton === 'affectationMateriel' || activeButton === 'affectationMateriel'}
            onMouseEnter={() => handleMouseEnter('affectationMateriel')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleNavigation('/affectationMateriel', 'affectationMateriel')}
          >
            Affectation du Matériel
          </Button>
        </div>
      </div>
      <div style={styles.content}>
        <NavBar>
          <Nav.Link
            href="#"
            onClick={() => navigate('/accueilMagasinier')}
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
    top: '180px', // Aligner le positionnement avec FormDemandeAchat
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
  accueilLink: {
    fontWeight: 'bold',
    color: '#6c757d',
    fontSize: '18px',
    marginRight: '83%',
    textDecoration: 'none',
  },
  contentContainer: {
    marginTop: '20px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
};

export default AccueilMagasinier;
