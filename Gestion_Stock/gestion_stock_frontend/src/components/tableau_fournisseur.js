import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importation des icônes
import Search from './search';

const data = [
  { nomGerant: 'Gerant A', cin: 'CIN123456', numImm: 'IM001', numRc: 'RC001' },
  { nomGerant: 'Gerant B', cin: 'CIN654321', numImm: 'IM002', numRc: 'RC002' },
  { nomGerant: 'Gerant C', cin: 'CIN789012', numImm: 'IM003', numRc: 'RC003' },
  { nomGerant: 'Gerant D', cin: 'CIN345678', numImm: 'IM004', numRc: 'RC004' },
  { nomGerant: 'Gerant E', cin: 'CIN901234', numImm: 'IM005', numRc: 'RC005' },
  // Ajoutez d'autres lignes de données ici si nécessaire
];

const handleEdit = (id) => {
  alert(`Modifier l'entrée avec ID: ${id}`);
};

const handleDelete = (id) => {
  if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'entrée avec ID: ${id}?`)) {
    alert(`Supprimer l'entrée avec ID: ${id}`);
  }
};

const TableauFournisseur = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredData = data.filter((item) =>
    item.nomGerant.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.cin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.numImm.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.numRc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-2">
      <div style={styles.searchWrapper}>
        <Search onSearch={handleSearch} />
      </div>
      <div className="table-responsive" style={styles.tableWrapper}>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Nom du gérant</th>
              <th>CIN</th>
              <th>Num_IMM</th>
              <th>Num_RC</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.nomGerant}</td>
                <td>{item.cin}</td>
                <td>{item.numImm}</td>
                <td>{item.numRc}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => handleEdit(index)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(index)}
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
  searchWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '30px', // Decrease this value to move the search bar up
  },
  tableWrapper: {
    maxWidth: '800px',
    margin: '0 auto',
    height: '550px',
    overflowY: 'auto',
    scrollbarWidth: 'thin',
    marginBottom: '50px' // Adjust this as needed
  },
};

// Styles CSS personnalisés pour WebKit browsers (Chrome, Safari)
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

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = customScrollbarStyles;
document.head.appendChild(styleSheet);

export default TableauFournisseur;
