import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const data = [
  { id: '1', numSerie: 'A123', dateLivraison: '2024-07-25', nom: 'Matériel A', marque: 'Marque A', quantite: 10, beneficiary: 'User 1' },
  { id: '2', numSerie: 'B456', dateLivraison: '2024-07-26', nom: 'Matériel B', marque: 'Marque B', quantite: 15, beneficiary: 'User 2' },
  { id: '3', numSerie: 'C789', dateLivraison: '2024-07-27', nom: 'Matériel C', marque: 'Marque C', quantite: 5, beneficiary: 'User 3' },
  // Add more data here as needed
];

const StockMagasinier = () => {
  return (
    <div className="container mt-4">
      <div className="table-responsive" style={styles.tableWrapper}>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Id produit</th>
              <th>Num serie</th>
              <th>Date livraison</th>
              <th>Nom</th>
              <th>Marque</th>
              <th>Quantité</th>
              <th>Bénéficiaire</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.numSerie}</td>
                <td>{item.dateLivraison}</td>
                <td>{item.nom}</td>
                <td>{item.marque}</td>
                <td>{item.quantite}</td>
                <td>{item.beneficiary}</td>
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
    maxWidth: '800px',
    margin: '0 auto',
    height: '550px',
    overflowY: 'auto',
    scrollbarWidth: 'thin',
  },
};

// Inline styles for WebKit browsers (Chrome, Safari)
const customScrollbarStyles = `
  .table-responsive::-webkit-scrollbar {
    width: 8px;
  }
  .table-responsive::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  .table-responsive::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }
  .table-responsive::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

// Inject styles into document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = customScrollbarStyles;
document.head.appendChild(styleSheet);

export default StockMagasinier;
