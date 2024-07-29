// File: ../../pages/gestion_stock.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../../layout/sidebar'; 
import NavBar from '../../components/navbar';
import Button from '../../components/button'; 
import StockMagasinier from '../../components/gestionStock';
import { FaPlus } from 'react-icons/fa';
import ProductFormModal from '../../components/ajouter_produit'; 

const GestionStockMagasinier = () => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const navigate = useNavigate(); 
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    switch (path) {
      case '/':
        setActiveButton('home');
        break;
      case '/stockMagasinier':
        setActiveButton('stock');
        break;
      case '/demandeAchat':
        setActiveButton('request');
        break;
      case '/historiqueDemandeAchat':
        setActiveButton('history');
        break;
      case '/historiqueBesoinsMagasinier':
        setActiveButton('historyBesoins');
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

  const handleAddProduct = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div style={styles.page}>
      <div style={styles.sidebarWrapper}>
        <Sidebar />
        <div style={styles.additionalButtons}>
          <Button
            size="medium"
            hovered={hoveredButton === 'home' || activeButton === 'home'}
            onMouseEnter={() => handleMouseEnter('home')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleNavigation('/', 'home')}
          >
            Accueil
          </Button>
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
        </div>
      </div>
      <div style={styles.content}>
        <NavBar />
        <div style={styles.tableContainer}>
          <div style={styles.controlsContainer}>
            <button 
              className="btn btn-primary btn-sm" 
              onClick={handleAddProduct}
              style={styles.addButton}
            >
              <FaPlus style={styles.icon} /> Ajouter un produit
            </button>
          </div>
          <StockMagasinier />
          {/* Display the modal if isModalOpen is true */}
          <ProductFormModal isOpen={isModalOpen} onClose={handleCloseModal} />
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
    marginTop: '20px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  controlsContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'relative', 
    marginBottom: '20px',
  },
  addButton: {
    position: 'absolute',
    marginRight: '30px',
    right: '0', 
    marginTop: '120px',
  },
  icon: {
    marginRight: '5px',
  },
};

export default GestionStockMagasinier;
