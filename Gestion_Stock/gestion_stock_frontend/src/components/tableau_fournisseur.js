import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Modal, Button, Form } from 'react-bootstrap';
import Search from './search';

const data = [
  { nomGerant: 'Gerant A', cin: 'CIN111111', numImm: 'IM001', numRc: 'RC001' },
  { nomGerant: 'Gerant B', cin: 'CIN654321', numImm: 'IM002', numRc: 'RC002' },
  { nomGerant: 'Gerant C', cin: 'CIN789012', numImm: 'IM003', numRc: 'RC003' },
  { nomGerant: 'Gerant D', cin: 'CIN345678', numImm: 'IM004', numRc: 'RC004' },
  { nomGerant: 'Gerant E', cin: 'CIN901234', numImm: 'IM005', numRc: 'RC005' },
  { nomGerant: 'Gerant F', cin: 'CIN345608', numImm: 'IM004', numRc: 'RC004' },
  { nomGerant: 'Gerant G', cin: 'CIN907234', numImm: 'IM005', numRc: 'RC005' },
  { nomGerant: 'Gerant A', cin: 'CIN123456', numImm: 'IM001', numRc: 'RC001' },
  { nomGerant: 'Gerant B', cin: 'CIN654321', numImm: 'IM002', numRc: 'RC002' },
  { nomGerant: 'Gerant C', cin: 'CIN789012', numImm: 'IM003', numRc: 'RC003' },
  { nomGerant: 'Gerant D', cin: 'CIN345678', numImm: 'IM004', numRc: 'RC004' },
  { nomGerant: 'Gerant E', cin: 'CIN901234', numImm: 'IM005', numRc: 'RC005' },
  { nomGerant: 'Gerant F', cin: 'CIN345608', numImm: 'IM004', numRc: 'RC004' },
  { nomGerant: 'Gerant G', cin: 'CIN907234', numImm: 'IM005', numRc: 'RC005' },
  { nomGerant: 'Gerant A', cin: 'CIN123456', numImm: 'IM001', numRc: 'RC001' },
  { nomGerant: 'Gerant B', cin: 'CIN654321', numImm: 'IM002', numRc: 'RC002' },
  { nomGerant: 'Gerant C', cin: 'CIN789012', numImm: 'IM003', numRc: 'RC003' },
  { nomGerant: 'Gerant D', cin: 'CIN345678', numImm: 'IM004', numRc: 'RC004' },
  { nomGerant: 'Gerant E', cin: 'CIN901234', numImm: 'IM005', numRc: 'RC005' },
  { nomGerant: 'Gerant F', cin: 'CIN345608', numImm: 'IM004', numRc: 'RC004' },
  { nomGerant: 'Gerant G', cin: 'CIN907234', numImm: 'IM005', numRc: 'RC005' },
  { nomGerant: 'Gerant A', cin: 'CIN123456', numImm: 'IM001', numRc: 'RC001' },
  { nomGerant: 'Gerant B', cin: 'CIN654321', numImm: 'IM002', numRc: 'RC002' },
  { nomGerant: 'Gerant C', cin: 'CIN789012', numImm: 'IM003', numRc: 'RC003' },
  { nomGerant: 'Gerant D', cin: 'CIN345678', numImm: 'IM004', numRc: 'RC004' },
  { nomGerant: 'Gerant E', cin: 'CIN901234', numImm: 'IM005', numRc: 'RC005' },
  { nomGerant: 'Gerant F', cin: 'CIN345608', numImm: 'IM004', numRc: 'RC004' },
  { nomGerant: 'Gerant G', cin: 'CIN907234', numImm: 'IM005', numRc: 'RC005' },
  { nomGerant: 'Gerant A', cin: 'CIN123456', numImm: 'IM001', numRc: 'RC001' },
  { nomGerant: 'Gerant B', cin: 'CIN654321', numImm: 'IM002', numRc: 'RC002' },
  { nomGerant: 'Gerant C', cin: 'CIN789012', numImm: 'IM003', numRc: 'RC003' },
  { nomGerant: 'Gerant D', cin: 'CIN345678', numImm: 'IM004', numRc: 'RC004' },
  { nomGerant: 'Gerant E', cin: 'CIN901234', numImm: 'IM005', numRc: 'RC005' },
  { nomGerant: 'Gerant F', cin: 'CIN345608', numImm: 'IM004', numRc: 'RC004' },
  { nomGerant: 'Gerant G', cin: 'CIN907234', numImm: 'IM005', numRc: 'RC005' },
  { nomGerant: 'Gerant A', cin: 'CIN123456', numImm: 'IM001', numRc: 'RC001' },
  { nomGerant: 'Gerant B', cin: 'CIN654321', numImm: 'IM002', numRc: 'RC002' },
  { nomGerant: 'Gerant C', cin: 'CIN789012', numImm: 'IM003', numRc: 'RC003' },
  { nomGerant: 'Gerant D', cin: 'CIN345678', numImm: 'IM004', numRc: 'RC004' },
  { nomGerant: 'Gerant E', cin: 'CIN901234', numImm: 'IM005', numRc: 'RC005' },
  { nomGerant: 'Gerant F', cin: 'CIN345608', numImm: 'IM004', numRc: 'RC004' },
  { nomGerant: 'Gerant G', cin: 'CIN907234', numImm: 'IM005', numRc: 'RC005' },
  { nomGerant: 'Gerant A', cin: 'CIN123456', numImm: 'IM001', numRc: 'RC001' },
  { nomGerant: 'Gerant B', cin: 'CIN654321', numImm: 'IM002', numRc: 'RC002' },
  { nomGerant: 'Gerant C', cin: 'CIN789012', numImm: 'IM003', numRc: 'RC003' },
  { nomGerant: 'Gerant D', cin: 'CIN345678', numImm: 'IM004', numRc: 'RC004' },
  { nomGerant: 'Gerant E', cin: 'CIN901234', numImm: 'IM005', numRc: 'RC005' },
  { nomGerant: 'Gerant F', cin: 'CIN345608', numImm: 'IM004', numRc: 'RC004' },
  { nomGerant: 'Gerant G', cin: 'CIN907234', numImm: 'IM005', numRc: 'RC005' },
  { nomGerant: 'Gerant A', cin: 'CIN123456', numImm: 'IM001', numRc: 'RC001' },
  { nomGerant: 'Gerant B', cin: 'CIN654321', numImm: 'IM002', numRc: 'RC002' },
  { nomGerant: 'Gerant C', cin: 'CIN789012', numImm: 'IM003', numRc: 'RC003' },
  { nomGerant: 'Gerant D', cin: 'CIN345678', numImm: 'IM004', numRc: 'RC004' },
  { nomGerant: 'Gerant E', cin: 'CIN901234', numImm: 'IM005', numRc: 'RC005' },
  { nomGerant: 'Gerant F', cin: 'CIN345608', numImm: 'IM004', numRc: 'RC004' },
  { nomGerant: 'Gerant G', cin: 'CIN907234', numImm: 'IM005', numRc: 'RC005' },
  { nomGerant: 'Gerant G', cin: 'CIN907234', numImm: 'IM005', numRc: 'RC005' },
  { nomGerant: 'Gerant A', cin: 'CIN123456', numImm: 'IM001', numRc: 'RC001' },
  { nomGerant: 'Gerant B', cin: 'CIN654321', numImm: 'IM002', numRc: 'RC002' },
  { nomGerant: 'Gerant C', cin: 'CIN789012', numImm: 'IM003', numRc: 'RC003' },
  { nomGerant: 'Gerant D', cin: 'CIN345678', numImm: 'IM004', numRc: 'RC004' },
  { nomGerant: 'Gerant E', cin: 'CIN901234', numImm: 'IM005', numRc: 'RC005' },
  { nomGerant: 'Gerant F', cin: 'CIN345608', numImm: 'IM004', numRc: 'RC004' },
  { nomGerant: 'Gerant G', cin: 'CIN907234', numImm: 'IM005', numRc: 'RC005' },
  { nomGerant: 'Gerant A', cin: 'CIN123456', numImm: 'IM001', numRc: 'RC001' },
  { nomGerant: 'Gerant B', cin: 'CIN654321', numImm: 'IM002', numRc: 'RC002' },
  { nomGerant: 'Gerant C', cin: 'CIN789012', numImm: 'IM003', numRc: 'RC003' },
  { nomGerant: 'Gerant D', cin: 'CIN345678', numImm: 'IM004', numRc: 'RC004' },
  { nomGerant: 'Gerant E', cin: 'CIN901234', numImm: 'IM005', numRc: 'RC005' },
  { nomGerant: 'Gerant F', cin: 'CIN345608', numImm: 'IM004', numRc: 'RC004' },
  { nomGerant: 'Gerant G', cin: 'CIN907234', numImm: 'IM005', numRc: 'RC005' },
  { nomGerant: 'Gerant A', cin: 'CIN123456', numImm: 'IM001', numRc: 'RC001' },
  { nomGerant: 'Gerant B', cin: 'CIN654321', numImm: 'IM002', numRc: 'RC002' },
  { nomGerant: 'Gerant C', cin: 'CIN789012', numImm: 'IM003', numRc: 'RC003' },
  { nomGerant: 'Gerant D', cin: 'CIN345678', numImm: 'IM004', numRc: 'RC004' },
  { nomGerant: 'Gerant E', cin: 'CIN901234', numImm: 'IM005', numRc: 'RC005' },
  { nomGerant: 'Gerant F', cin: 'CIN345608', numImm: 'IM004', numRc: 'RC004' },
  { nomGerant: 'Gerant G', cin: 'CIN907234', numImm: 'IM005', numRc: 'RC005' },
  { nomGerant: 'Gerant A', cin: 'CIN123456', numImm: 'IM001', numRc: 'RC001' },
  { nomGerant: 'Gerant B', cin: 'CIN654321', numImm: 'IM002', numRc: 'RC002' },
  { nomGerant: 'Gerant C', cin: 'CIN789012', numImm: 'IM003', numRc: 'RC003' },
  { nomGerant: 'Gerant D', cin: 'CIN345678', numImm: 'IM004', numRc: 'RC004' },
  { nomGerant: 'Gerant E', cin: 'CIN901234', numImm: 'IM005', numRc: 'RC005' },
  { nomGerant: 'Gerant F', cin: 'CIN345608', numImm: 'IM004', numRc: 'RC004' },
  { nomGerant: 'Gerant G', cin: 'CIN907234', numImm: 'IM005', numRc: 'RC005' },
  { nomGerant: 'Gerant A', cin: 'CIN123456', numImm: 'IM001', numRc: 'RC001' },
  { nomGerant: 'Gerant B', cin: 'CIN654321', numImm: 'IM002', numRc: 'RC002' },
  { nomGerant: 'Gerant C', cin: 'CIN789012', numImm: 'IM003', numRc: 'RC003' },
  { nomGerant: 'Gerant D', cin: 'CIN345678', numImm: 'IM004', numRc: 'RC004' },
  { nomGerant: 'Gerant E', cin: 'CIN901234', numImm: 'IM005', numRc: 'RC005' },
  { nomGerant: 'Gerant F', cin: 'CIN345608', numImm: 'IM004', numRc: 'RC004' },
  { nomGerant: 'Gerant G', cin: 'CIN907234', numImm: 'IM005', numRc: 'RC005' },
  { nomGerant: 'Gerant A', cin: 'CIN123456', numImm: 'IM001', numRc: 'RC001' },
  { nomGerant: 'Gerant B', cin: 'CIN654321', numImm: 'IM002', numRc: 'RC002' },
  { nomGerant: 'Gerant C', cin: 'CIN789012', numImm: 'IM003', numRc: 'RC003' },
  { nomGerant: 'Gerant D', cin: 'CIN345678', numImm: 'IM004', numRc: 'RC004' },
  { nomGerant: 'Gerant E', cin: 'CIN901234', numImm: 'IM005', numRc: 'RC005' },
  { nomGerant: 'Gerant F', cin: 'CIN345608', numImm: 'IM004', numRc: 'RC004' },
  { nomGerant: 'Gerant G', cin: 'CIN907234', numImm: 'IM005', numRc: 'RC005' },
  { nomGerant: 'Gerant A', cin: 'CIN123456', numImm: 'IM001', numRc: 'RC001' },
  { nomGerant: 'Gerant B', cin: 'CIN654321', numImm: 'IM002', numRc: 'RC002' },
  { nomGerant: 'Gerant C', cin: 'CIN789012', numImm: 'IM003', numRc: 'RC003' },
  { nomGerant: 'Gerant D', cin: 'CIN345678', numImm: 'IM004', numRc: 'RC004' },
  { nomGerant: 'Gerant E', cin: 'CIN901234', numImm: 'IM005', numRc: 'RC005' },
  { nomGerant: 'Gerant F', cin: 'CIN345608', numImm: 'IM004', numRc: 'RC004' },
  { nomGerant: 'Gerant G', cin: 'CIN907234', numImm: 'IM005', numRc: 'RC005' },
  { nomGerant: 'Gerant A', cin: 'CIN123456', numImm: 'IM001', numRc: 'RC001' },
  { nomGerant: 'Gerant B', cin: 'CIN654321', numImm: 'IM002', numRc: 'RC002' },
  { nomGerant: 'Gerant C', cin: 'CIN789012', numImm: 'IM003', numRc: 'RC003' },
  { nomGerant: 'Gerant D', cin: 'CIN345678', numImm: 'IM004', numRc: 'RC004' },
  { nomGerant: 'Gerant E', cin: 'CIN901234', numImm: 'IM005', numRc: 'RC005' },
  { nomGerant: 'Gerant F', cin: 'CIN345608', numImm: 'IM004', numRc: 'RC004' },
  { nomGerant: 'Gerant G', cin: 'CIN907234', numImm: 'IM005', numRc: 'RC005' },
  { nomGerant: 'Gerant A', cin: 'CIN123456', numImm: 'IM001', numRc: 'RC001' },
  { nomGerant: 'Gerant B', cin: 'CIN654321', numImm: 'IM002', numRc: 'RC002' },
  { nomGerant: 'Gerant C', cin: 'CIN789012', numImm: 'IM003', numRc: 'RC003' },
  { nomGerant: 'Gerant D', cin: 'CIN345678', numImm: 'IM004', numRc: 'RC004' },
  { nomGerant: 'Gerant E', cin: 'CIN901234', numImm: 'IM005', numRc: 'RC005' },
  { nomGerant: 'Gerant F', cin: 'CIN345608', numImm: 'IM004', numRc: 'RC004' },
  { nomGerant: 'Gerant G', cin: 'CIN907234', numImm: 'IM005', numRc: 'RC005' },
  { nomGerant: 'Gerant A', cin: 'CIN123456', numImm: 'IM001', numRc: 'RC001' },
  { nomGerant: 'Gerant B', cin: 'CIN654321', numImm: 'IM002', numRc: 'RC002' },
  { nomGerant: 'Gerant C', cin: 'CIN789012', numImm: 'IM003', numRc: 'RC003' },
  { nomGerant: 'Gerant D', cin: 'CIN345678', numImm: 'IM004', numRc: 'RC004' },
  { nomGerant: 'Gerant E', cin: 'CIN901234', numImm: 'IM005', numRc: 'RC005' },
  { nomGerant: 'Gerant F', cin: 'CIN345608', numImm: 'IM004', numRc: 'RC004' },
  { nomGerant: 'Gerant G', cin: 'CIN907234', numImm: 'IM005', numRc: 'RC005' },
  { nomGerant: 'Gerant G', cin: 'CIN907234', numImm: 'IM005', numRc: 'RC005' },
  { nomGerant: 'Gerant A', cin: 'CIN123456', numImm: 'IM001', numRc: 'RC001' },
  { nomGerant: 'Gerant B', cin: 'CIN654321', numImm: 'IM002', numRc: 'RC002' },
  { nomGerant: 'Gerant C', cin: 'CIN789012', numImm: 'IM003', numRc: 'RC003' },
  { nomGerant: 'Gerant D', cin: 'CIN345678', numImm: 'IM004', numRc: 'RC004' },
  { nomGerant: 'Gerant E', cin: 'CIN901234', numImm: 'IM005', numRc: 'RC005' },
  { nomGerant: 'Gerant F', cin: 'CIN345608', numImm: 'IM004', numRc: 'RC004' },
  { nomGerant: 'Gerant G', cin: 'CIN907234', numImm: 'IM005', numRc: 'RC005' },
  { nomGerant: 'Gerant A', cin: 'CIN123456', numImm: 'IM001', numRc: 'RC001' },
  { nomGerant: 'Gerant B', cin: 'CIN654321', numImm: 'IM002', numRc: 'RC002' },
  { nomGerant: 'Gerant C', cin: 'CIN789012', numImm: 'IM003', numRc: 'RC003' },
  { nomGerant: 'Gerant D', cin: 'CIN345678', numImm: 'IM004', numRc: 'RC004' },
  { nomGerant: 'Gerant E', cin: 'CIN901234', numImm: 'IM005', numRc: 'RC005' },
  { nomGerant: 'Gerant F', cin: 'CIN345608', numImm: 'IM004', numRc: 'RC004' },
  { nomGerant: 'Gerant G', cin: 'CIN907234', numImm: 'IM005', numRc: 'RC005' },

];

const TableauFournisseur = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const itemsPerPage = 9;

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'entrée avec ID: ${index}?`)) {
      alert(`Supprimer l'entrée avec ID: ${index}`);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    alert(`Form submitted for item: ${selectedItem.nomGerant}`);
    handleModalClose();
  };

  // Filtrage des données par nomGerant, CIN, numImm, ou numRc
  const filteredData = data.filter((item) =>
    item.nomGerant.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.cin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.numImm.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.numRc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getPageNumbers = () => {
    const range = 7;
    const start = Math.floor((currentPage - 1) / range) * range + 1;
    const end = Math.min(start + range - 1, totalPages);

    let pageNumbers = [];
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

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
            {currentData.map((item, index) => (
              <tr key={index}>
                <td>{item.nomGerant}</td>
                <td>{item.cin}</td>
                <td>{item.numImm}</td>
                <td>{item.numRc}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => handleEdit(item)}
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
      <div style={styles.paginationWrapper}>
        <nav>
          <ul className="pagination justify-content-center" style={styles.pagination}>
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Précédent
              </button>
            </li>
            {getPageNumbers().map(pageNumber => (
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
                Suivant
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Modal for editing */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier les informations</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <Form onSubmit={handleFormSubmit}>
              <Form.Group controlId="formNomGerant">
                <Form.Label>Nom du gérant</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedItem.nomGerant}
                />
              </Form.Group>
              <Form.Group controlId="formCin">
                <Form.Label>CIN</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedItem.cin}
                />
              </Form.Group>
              <Form.Group controlId="formNumImm">
                <Form.Label>Num_IMM</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedItem.numImm}
                />
              </Form.Group>
              <Form.Group controlId="formNumRc">
                <Form.Label>Num_RC</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedItem.numRc}
                />
              </Form.Group>
              <div className="d-flex justify-content-end mt-3">
                <Button variant="secondary" onClick={handleModalClose} className="me-2">
                  Annuler
                </Button>
                <Button type="submit" variant="primary">
                  Enregistrer
                </Button>
              </div>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

const styles = {
  searchWrapper: {
    marginBottom: '1rem',
    display: 'flex',
    justifyContent: 'center',
    padding: '0 1rem',
  },
  tableWrapper: {
    marginTop: '1rem',
  },
  paginationWrapper: {
    marginTop: '1rem',
  },
  pagination: {
    marginBottom: '0',
  },
};

export default TableauFournisseur;
