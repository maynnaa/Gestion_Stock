import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Sidebar from '../../layout/sidebar'; 
import NavBar from '../../components/navbar';
import ScrollableTable from '../../components/tableauStock'; 
import Button from '../../components/button';
import { Nav } from 'react-bootstrap'; 

const StockDirecteur = () => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const navigate = useNavigate(); 
  const location = useLocation();
  const { id_personnel } = useParams();
  
  console.log("ID de l'utilisateur:", id_personnel);

  useEffect(() => {
    const path = location.pathname;
    switch (path) {
      case '/':
        setActiveButton('accueil');
        break;
      case `/stockDirecteur/${id_personnel}`:
        setActiveButton('stock');
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
            onClick={() => handleNavigation(`/stockDirecteur/${id_personnel}`, 'stock')}
          >
            Stock
          </Button>
          <Button
            size="medium"
            hovered={hoveredButton === 'received' || activeButton === 'received'}
            onMouseEnter={() => handleMouseEnter('received')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleNavigation(`/demandesRecuesDirecteur/${id_personnel}`, 'received')}
          >
            Demandes reçues
          </Button>
        </div>
      </div>
      <div style={styles.content}>
        <NavBar>
          <Nav.Link
            href="#"
            onClick={() => navigate(`/accueilDirecteur/${id_personnel}`)}
            style={styles.accueilLink}
          >
            Accueil
          </Nav.Link>
        </NavBar>
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
  tableContainer: {
    marginTop: '60px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  accueilLink: {
    fontWeight: 'bold',
    color: '#6c757d',
    fontSize: '18px',
    marginRight: '83%', 
    textDecoration: 'none',
  },
};

export default StockDirecteur;
