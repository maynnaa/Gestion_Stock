import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Search from './search';
const initialData = [
  { id: '1', numSerie: 'A123', dateLivraison: '2024-07-25', nom: 'Matériel A', marque: 'Marque A', quantite: 10, beneficiary: 'User 1' },
  { id: '2', numSerie: 'B456', dateLivraison: '2024-07-26', nom: 'Matériel B', marque: 'Marque B', quantite: 15, beneficiary: 'User 2' },
  { id: '3', numSerie: 'C789', dateLivraison: '2024-07-27', nom: 'Matériel C', marque: 'Marque C', quantite: 5, beneficiary: 'User 3' },
  // More data entries
];

const StockMagasinier = () => {
  const [data, setData] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData);

  const handleEdit = (id) => {
    console.log('Edit item with id:', id);
  };

  const handleDelete = (id) => {
    const newData = data.filter(item => item.id !== id);
    setData(newData);
    setFilteredData(newData);
  };

  const handleSearch = (searchTerm) => {
    const newFilteredData = data.filter(item =>
      item.numSerie.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(newFilteredData);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <Search onSearch={handleSearch} />
      </div>
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.numSerie}</td>
                <td>{item.dateLivraison}</td>
                <td>{item.nom}</td>
                <td>{item.marque}</td>
                <td>{item.quantite}</td>
                <td>{item.beneficiary}</td>
                <td>
                  <button 
                    className="btn btn-primary btn-sm me-2" 
                    onClick={() => handleEdit(item.id)}
                  >
                    <FaEdit />
                  </button>
                  <button 
                    className="btn btn-danger btn-sm" 
                    onClick={() => handleDelete(item.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
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
