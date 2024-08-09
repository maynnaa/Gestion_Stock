import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import DefaultExample from '../../components/historique';
import Sidebar from '../../layout/sidebar';
import NavBar from '../../components/navbar';
import Search from '../../components/search'; 
import Button from '../../components/button'; 
import { Nav } from 'react-bootstrap'; // Importer Nav pour le bouton 'Accueil'

const HistoriquePage = () => {
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
      case `/accueilService/${id_personnel}`:
        setActiveButton('home');
        break;
      case `/stock/${id_personnel}`:
        setActiveButton('stock');
        break;
      case `/formulaire/${id_personnel}`:
        setActiveButton('request');
        break;
      case `/historique/${id_personnel}`:
        setActiveButton('history');
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
    navigate(`${path}/${id_personnel}`);
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
      </div>
      <div style={styles.content}>
        <NavBar id_personnel={parseInt(id_personnel, 10)} />
        <div style={styles.contentContainer}>
          <Search onSearch={handleSearch} /> 
          <div style={styles.tableWrapper}>
            <DefaultExample searchTerm={searchTerm} /> 
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

export default HistoriquePage;
