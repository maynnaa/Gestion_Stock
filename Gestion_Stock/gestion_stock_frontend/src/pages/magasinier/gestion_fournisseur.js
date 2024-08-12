// GestionFournisseur.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Sidebar from '../../layout/sidebar'; 
import NavBar from '../../components/navbar';
import Button from '../../components/button';
import TableauFournisseur from '../../components/tableau_fournisseur'; 
import SupplierFormModal from '../../components/ajouter_fournisseur'; 
import { FaPlus } from 'react-icons/fa';
import { Nav } from 'react-bootstrap';

const GestionFournisseur = () => {
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

  const handleAddFournisseur = () => {
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false); 
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
      <NavBar id_personnel={parseInt(id_personnel, 10)} onAccueilClick={handleAccueilClick}>
          <Nav.Link
            href="#"
            onClick={() => navigate(`/accueilMagasinier/${id_personnel}`)}
            style={styles.accueilLink}
          >
            Accueil
          </Nav.Link>
        </NavBar>
        <div style={styles.controlsContainer}>
          <div style={styles.searchContainer}>
            {/* Ajoutez ici votre composant de barre de recherche */}
          </div>
          <button 
            className="btn btn-primary btn-sm" 
            onClick={handleAddFournisseur}
            style={styles.addButton}
          >
            <FaPlus style={styles.icon} /> Ajouter fournisseur
          </button>
        </div>
        <div style={styles.tableContainer}>
          <TableauFournisseur />
        </div>
        <SupplierFormModal isOpen={isModalOpen} onClose={closeModal} />
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
  controlsContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    paddingTop: '25px', 
  },
  searchContainer: {
    flex: 1,
  },
  addButton: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    marginLeft: '20px', 
  },
  icon: {
    marginRight: '5px',
  },
  tableContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  accueilLink: {
    fontWeight: 'bold',
    color: '#6c757d',
    fontSize: '18px',
    marginRight: '83%',
    textDecoration: 'none',
  },
};

export default GestionFournisseur;
