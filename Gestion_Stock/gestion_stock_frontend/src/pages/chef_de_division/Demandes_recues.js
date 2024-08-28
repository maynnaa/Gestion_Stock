import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Recues from '../../components/recues'; // Correct import statement
import Sidebar from '../../layout/sidebar';
import NavBar from '../../components/navbar';
import Button from '../../components/button'; 

const DemandesRecues = () => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const navigate = useNavigate(); 
  const location = useLocation();
  const { id_personnel } = useParams();
  console.log("ID de l'utilisateur:", id_personnel);

  useEffect(() => {
    const path = location.pathname;
    switch (path) {
      case `/accueilDivision/${id_personnel}`:
        setActiveButton('accueil');
        break;
      case `/stockDivision/${id_personnel}`:
        setActiveButton('stock');
        break;
      case `/formulaireDivision/${id_personnel}`:
        setActiveButton('request');
        break;
      case `/historiqueDivision/${id_personnel}`:
        setActiveButton('history');
        break;
      case `/demandesRecues/${id_personnel}`:
        setActiveButton('received');
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

 

  const handleNavigation = (path, button) => {
    setActiveButton(button);
    navigate(`${path}/${id_personnel}`);
  };

  const handleAccueilClick = () => {
    navigate(`/accueilDivision/${id_personnel}`);
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
            onClick={() => handleNavigation('/stockDivision', 'stock')}
          >
            Stock
          </Button>
          <Button
            size="medium"
            hovered={hoveredButton === 'request' || activeButton === 'request'}
            onMouseEnter={() => handleMouseEnter('request')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleNavigation('/formulaireDivision', 'request')}
          >
            Demande de besoins
          </Button>
          <Button
            size="medium"
            hovered={hoveredButton === 'history' || activeButton === 'history'}
            onMouseEnter={() => handleMouseEnter('history')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleNavigation('/historiqueDivision', 'history')}
          >
            Historique des demandes
          </Button>
          <Button
            size="medium"
            hovered={hoveredButton === 'received' || activeButton === 'received'}
            onMouseEnter={() => handleMouseEnter('received')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleNavigation('/demandesRecues', 'received')}
          >
            Demandes reçues
          </Button>
        </div>
      </div>
      <div style={styles.content}>
        <NavBar id_personnel={parseInt(id_personnel, 10)} onAccueilClick={handleAccueilClick}/>
        <div style={styles.contentContainer}>
         
          <div style={styles.tableWrapper}>
            <Recues  id={id_personnel}/>
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
    width: '100%',
    maxWidth: '1000px',
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

export default DemandesRecues;
