import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../../components/navbar';
import Sidebar from '../../layout/sidebar';
import Accueil from '../../components/accueil';
import Button from '../../components/button';


const AccueilService = () => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [activeButton, setActiveButton] = useState('accueil'); // Par défaut 'accueil'
  const navigate = useNavigate(); 
  const { id_personnel } = useParams();
  console.log("ID de l'utilisateur:", id_personnel);

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

  return (
    <div style={styles.page}>
      <div style={styles.sidebarWrapper}>
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
        <Sidebar />
      </div>
      <div style={styles.content}>
        <NavBar id_personnel={parseInt(id_personnel, 10)} />
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
    flexDirection: 'column',   // Colonne pour centrer verticalement
    justifyContent: 'center',  // Centre verticalement
    alignItems: 'center',      // Centre horizontalement
  },
  contentContainer: {
    marginTop: '20px',
    width: '100%',             // Assure que le container prend toute la largeur disponible
    display: 'flex',           // Utilise Flexbox dans le container
    justifyContent: 'center',  // Centre le contenu à l'intérieur
  },
  accueilLink: {
    fontWeight: 'bold',
    color: '#6c757d', // Couleur gris
    fontSize: '18px',
    marginRight: '83%', // Ajuster l'espacement si nécessaire
    textDecoration: 'none', // Retirer le soulignement par défaut des liens
  },
};

export default AccueilService;
