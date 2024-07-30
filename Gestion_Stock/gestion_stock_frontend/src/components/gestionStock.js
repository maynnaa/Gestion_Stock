import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Search from './search';
import EditModal from './modifier_produit'; // Import the EditModal component

const initialData = [
 
  { id: '2', numSerie: 'B456', dateLivraison: '2024-07-26', nom: 'Matériel B', marque: 'Marque B', quantite: 15, beneficiary: 'User 2' },
  { id: '1', numSerie: 'A123', dateLivraison: '2024-07-25', nom: 'Matériel A', marque: 'Marque A', quantite: 10, beneficiary: 'User 1' },
  { id: '2', numSerie: 'B456', dateLivraison: '2024-07-26', nom: 'Matériel B', marque: 'Marque B', quantite: 15, beneficiary: 'User 2' },
  { id: '1', numSerie: 'A123', dateLivraison: '2024-07-25', nom: 'Matériel A', marque: 'Marque A', quantite: 10, beneficiary: 'User 1' },
  { id: '2', numSerie: 'B456', dateLivraison: '2024-07-26', nom: 'Matériel B', marque: 'Marque B', quantite: 15, beneficiary: 'User 2' },
  { id: '1', numSerie: 'A123', dateLivraison: '2024-07-25', nom: 'Matériel A', marque: 'Marque A', quantite: 10, beneficiary: 'User 1' },
  { id: '2', numSerie: 'B456', dateLivraison: '2024-07-26', nom: 'Matériel B', marque: 'Marque B', quantite: 15, beneficiary: 'User 2' },
  { id: '1', numSerie: 'A123', dateLivraison: '2024-07-25', nom: 'Matériel A', marque: 'Marque A', quantite: 10, beneficiary: 'User 1' },
  { id: '2', numSerie: 'B456', dateLivraison: '2024-07-26', nom: 'Matériel B', marque: 'Marque B', quantite: 15, beneficiary: 'User 2' },
];

const ITEMS_PER_PAGE = 9;
const PAGE_RANGE = 7;

const StockMagasinier = () => {
  const [data, setData] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);

  // State for modal
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const handleEdit = (item) => {
    setCurrentItem(item);
    setShowModal(true);
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
    setCurrentPage(1); // Reset to first page on search
  };

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const currentData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Calculate the start and end page numbers
  const startPage = Math.floor((currentPage - 1) / PAGE_RANGE) * PAGE_RANGE + 1;
  const endPage = Math.min(startPage + PAGE_RANGE - 1, totalPages);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-center mb-3">
        <Search onSearch={handleSearch} />
      </div>
      <div className="table-responsive" style={{ ...styles.tableWrapper, marginTop: '35px' }}>
        <table className="table table-bordered">
          <thead className="text-center">
            <tr>
              <th >Id produit</th>
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
            {currentData.map((item) => (
              <tr key={item.id}>
                <td className="text-center">{item.id}</td>
                <td className="text-center">{item.numSerie}</td>
                <td className="text-center">{item.dateLivraison}</td>
                <td className="text-center">{item.nom}</td>
                <td className="text-center">{item.marque}</td>
                <td className="text-center">{item.quantite}</td>
                <td className="text-center">{item.beneficiary}</td>
                <td className="text-center">
                  <button 
                    className="btn btn-primary btn-sm me-2" 
                    onClick={() => handleEdit(item)}
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
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button 
              className="page-link" 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(pageNumber => (
            <li 
              key={pageNumber} 
              className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}
            >
              <button 
                className="page-link" 
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button 
              className="page-link" 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
      {/* EditModal component */}
      {currentItem && (
        <EditModal
          show={showModal}
          onHide={() => setShowModal(false)}
          item={currentItem}
        />
      )}
    </div>
  );
};

const styles = {
  tableWrapper: {
    maxWidth: '1300px',
    margin: '0 auto',
    height: '550px',
    overflowY: 'auto',
    scrollbarWidth: 'thin',
  },
};

// Inject custom scrollbar styles into document
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
