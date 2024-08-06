import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Sidebar from '../../layout/sidebar'; 
import NavBar from '../../components/navbar';
import Button from '../../components/button'; 
import StockMagasinier from '../../components/gestionStock';
import { FaPlus } from 'react-icons/fa';
import ProductFormModal from '../../components/ajouter_produit'; 
import { Nav } from 'react-bootstrap'; 

const GestionStockMagasinier = () => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
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
      case `/gestionFournisseur/${id_personnel}`:
        setActiveButton('gestionFournisseur');
        break;
      case `/affectationMateriel/${id_personnel}`:
        setActiveButton('affectationMateriel');
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
          <Button
            size="medium"
            hovered={hoveredButton === 'affectationMateriel' || activeButton === 'affectationMateriel'}
            onMouseEnter={() => handleMouseEnter('affectationMateriel')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleNavigation(`/affectationMateriel/${id_personnel}`, 'affectationMateriel')}
          >
            Affectation du Matériel
          </Button>
        </div>
      </div>
      <div style={styles.content}>
        <NavBar>
          <Nav.Link
            href="#"
            onClick={() => navigate(`/accueilMagasinier/${id_personnel}`)}
            style={styles.accueilLink}
          >
            Accueil
          </Nav.Link>
        </NavBar>
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
  accueilLink: {
    fontWeight: 'bold',
    color: '#6c757d',
    fontSize: '18px',
    marginRight: '83%', 
    textDecoration: 'none',
  },
};

export default GestionStockMagasinier;
