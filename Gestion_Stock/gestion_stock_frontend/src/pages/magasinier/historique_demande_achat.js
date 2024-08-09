import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Sidebar from '../../layout/sidebar';
import NavBar from '../../components/navbar';
import Search from '../../components/search'; 
import Button from '../../components/button'; 
import DemandeAchat from '../../components/historiqueAchat';
import { Nav } from 'react-bootstrap';

const HistoriqueDemandeAchat = () => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); 
  const location = useLocation();
  const { id_personnel } = useParams();
  
  console.log("ID de l'utilisateur:", id_personnel);

  useEffect(() => {
    const path = location.pathname;
    switch (path) {
      case `/accueilMagasinier/${id_personnel}`:
        setActiveButton('home');
        break;
      case `/stockMagasinier/${id_personnel}`:
        setActiveButton('stock');
        break;
      case `/demandeAchat/${id_personnel}`:
        setActiveButton('request');
        break;
      case `/historiqueDemandeAchat/${id_personnel}`:
        setActiveButton('history');
        break;
      case `/historiqueBesoinsMagasinier/${id_personnel}`:
        setActiveButton('historyBesoins');
        break;
      default:
        setActiveButton(null);
    }
  }, [location.pathname, id_personnel]);

  const handleMouseEnter = (button) => {
    setHoveredButton(button);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleNavigation = (path, button) => {
    setActiveButton(button);
    navigate(path);
  };
  const handleAccueilClick = () => {
    navigate(`/accueilMagasinier/${id_personnel}`);
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
            onClick={() => handleNavigation(`/stockMagasinier/${id_personnel}`, 'stock')}
          >
            Gestion de Stock
          </Button>
          <Button
            size="medium"
            hovered={hoveredButton === 'request' || activeButton === 'request'}
            onMouseEnter={() => handleMouseEnter('request')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleNavigation(`/demandeAchat/${id_personnel}`, 'request')}
          >
            Demande d'achat
          </Button>
          <Button
            size="medium"
            hovered={hoveredButton === 'history' || activeButton === 'history'}
            onMouseEnter={() => handleMouseEnter('history')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleNavigation(`/historiqueDemandeAchat/${id_personnel}`, 'history')}
          >
            Historique des demandes d'achat
          </Button>
          <Button
            size="medium"
            hovered={hoveredButton === 'historyBesoins' || activeButton === 'historyBesoins'}
            onMouseEnter={() => handleMouseEnter('historyBesoins')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleNavigation(`/historiqueBesoinsMagasinier/${id_personnel}`, 'historyBesoins')}
          >
            Historique des demandes de besoins
          </Button>
          <Button
            size="medium"
            hovered={hoveredButton === 'gestionFournisseur' || activeButton === 'gestionFournisseur'}
            onMouseEnter={() => handleMouseEnter('gestionFournisseur')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleNavigation(`/gestionFournisseur/${id_personnel}`, 'gestionFournisseur')}
          >
            Gestion des Fournisseurs
          </Button>
        </div>
      </div>
      <div style={styles.content}>
        <NavBar id_personnel={id_personnel}onAccueilClick={handleAccueilClick}>
          <Nav.Link
            href="#"
            onClick={() => navigate(`/accueilMagasinier/${id_personnel}`)}
            style={styles.accueilLink}
          >
            Accueil
          </Nav.Link>
        </NavBar>
        <div style={styles.contentContainer} >
          <Search onSearch={handleSearch} /> 
          <div style={styles.tableWrapper}>
            <DemandeAchat searchTerm={searchTerm} /> 
          </div>
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
  },
  contentContainer: {
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '55px',
  },
  tableWrapper: {
    width: '80%',
    maxWidth: '800px',
    margin: '20px auto',
  },
  accueilLink: {
    fontWeight: 'bold',
    color: '#6c757d',
    fontSize: '18px',
    marginRight: '83%', 
    textDecoration: 'none',
  },
};

export default HistoriqueDemandeAchat;
