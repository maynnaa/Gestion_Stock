import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../../layout/sidebar'; 
import NavBar from '../../components/navbar';
import Button from '../../components/button';
import AffectationForm from '../../components/affectation_form'; 


const AffectationMateriel = () => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    switch (path) {
      case '/':
        setActiveButton('home');
        break;
      case '/gestionStock':
        setActiveButton('stock');
        break;
      case '/demandeAchat':
        setActiveButton('request');
        break;
      case '/historiqueDemandeAchat':
        setActiveButton('history');
        break;
      case '/historiqueBesoins':
        setActiveButton('historyBesoins');
        break;
      case '/gestionFournisseur':
        setActiveButton('gestionFournisseur');
        break;
      case '/affectationMateriel':
        setActiveButton('affectationMateriel');
        break;
      default:
        setActiveButton(null);
    }
  }, [location.pathname]);

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
        <NavBar />
        <AffectationForm />
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
    top: '180px', 
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
    justifyContent: 'center', // Centers the content vertically
  },
};


export default AffectationMateriel;

