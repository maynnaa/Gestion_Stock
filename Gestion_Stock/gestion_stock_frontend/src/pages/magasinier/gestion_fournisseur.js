import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../../layout/sidebar'; 
import NavBar from '../../components/navbar';
import Button from '../../components/button';
import TableauFournisseur from '../../components/tableau_fournisseur'; 
import SupplierFormModal from '../../components/ajouter_fournisseur'; // Importation du composant SupplierFormModal
import { FaPlus } from 'react-icons/fa'; // Importation de l'icône plus

const GestionFournisseur = () => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour contrôler la visibilité du modal
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

  const handleAddFournisseur = () => {
    setIsModalOpen(true); // Ouvrir le modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Fermer le modal
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
        <SupplierFormModal isOpen={isModalOpen} onClose={closeModal} /> {/* Ajout du modal */}
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
    position: 'relative',
  },
  searchContainer: {
    flex: 1,

    justifyContent: 'flex-end',
    marginBottom: '10px', // Reduce bottom margin
    marginTop: '20px', // Reduce top margin to lift the button

    justifyContent: 'flex-end',
    marginBottom: '10px',
    marginTop: '10px', // Adjusted marginTop

  },
  addButton: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',

    position: 'absolute',
    right: 0,
    marginTop: '100px', // Ajustez cette valeur pour déplacer le bouton verticalement

    marginTop: '100px', 

    display: 'flex',
    alignItems: 'center',

  },
  icon: {
    marginRight: '5px',
  },
  tableContainer: {
    width: '100%',
    display: 'flex',

    flexDirection: 'column',
    alignItems: 'center',

    justifyContent: 'center',
    marginTop: '5px', 
    
    justifyContent: 'center',

  },
};

export default GestionFournisseur;
