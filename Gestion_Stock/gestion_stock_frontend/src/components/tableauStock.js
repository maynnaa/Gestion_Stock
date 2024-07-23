import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const data = [
  { nom: 'Matériel A', quantite: 10 },
  { nom: 'Matériel B', quantite: 15 },
  { nom: 'Matériel C', quantite: 5 },
  { nom: 'Matériel D', quantite: 8 },
  { nom: 'Matériel E', quantite: 12 },
  { nom: 'Matériel F', quantite: 7 },
  { nom: 'Matériel G', quantite: 20 },
  { nom: 'Matériel H', quantite: 3 },
  { nom: 'Matériel I', quantite: 9 },
  { nom: 'Matériel J', quantite: 6 },
  { nom: 'Matériel A', quantite: 10 },
  { nom: 'Matériel B', quantite: 15 },
  { nom: 'Matériel C', quantite: 5 },
  { nom: 'Matériel D', quantite: 8 },
  { nom: 'Matériel E', quantite: 12 },
  { nom: 'Matériel F', quantite: 7 },
  { nom: 'Matériel G', quantite: 20 },
  { nom: 'Matériel H', quantite: 3 },
  { nom: 'Matériel I', quantite: 9 },
  { nom: 'Matériel J', quantite: 6 },
  { nom: 'Matériel A', quantite: 10 },
  { nom: 'Matériel B', quantite: 15 },
  { nom: 'Matériel C', quantite: 5 },
  { nom: 'Matériel D', quantite: 8 },
  { nom: 'Matériel E', quantite: 12 },
  { nom: 'Matériel F', quantite: 7 },
  { nom: 'Matériel G', quantite: 20 },
  { nom: 'Matériel H', quantite: 3 },
  { nom: 'Matériel I', quantite: 9 },
  { nom: 'Matériel J', quantite: 6 },
];

const ScrollableTable = () => {
  return (
    <div className="container mt-4">
      <div className="table-responsive" style={styles.tableWrapper}>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Quantité</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.nom}</td>
                <td>{item.quantite}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  tableWrapper: {
    maxWidth: '800px', // Largeur maximale du tableau
    margin: '0 auto', // Centre le tableau horizontalement
    height: '550px', // Hauteur fixe pour le conteneur du tableau
    overflowY: 'auto', // Active le défilement vertical si nécessaire
    scrollbarWidth: 'thin', // Pour Firefox, rend la barre de défilement plus fine
  },
};

// Styles CSS personnalisés pour WebKit browsers (Chrome, Safari)
const customScrollbarStyles = `
  .table-responsive::-webkit-scrollbar {
    width: 8px; // Largeur de la barre de défilement
  }

  .table-responsive::-webkit-scrollbar-track {
    background: #f1f1f1; // Couleur de la piste de la barre de défilement
  }

  .table-responsive::-webkit-scrollbar-thumb {
    background: #888; // Couleur du curseur de la barre de défilement
    border-radius: 10px; // Arrondir les coins du curseur
  }

  .table-responsive::-webkit-scrollbar-thumb:hover {
    background: #555; // Couleur du curseur lors du survol
  }
`;

// Injecte les styles CSS personnalisés dans le document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = customScrollbarStyles;
document.head.appendChild(styleSheet);

export default ScrollableTable;
