import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Search from './search';

const TableauFournisseur = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const itemsPerPage = 9;

  useEffect(() => {
    axios.get('http://localhost:9091/api/fournisseur')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
      });
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ce fournisseur?`)) {
      try {
        const response = await axios.delete(`http://localhost:9091/api/fournisseur/${id}`);
        if (response.status === 204) {
          // Mise à jour des données locales en supprimant l'élément avec l'ID donné
          setData(data.filter(item => item.fournisseur_id !== id));
          alert('Fournisseur supprimé avec succès.');
        } else {
          alert('Erreur lors de la suppression du fournisseur.');
        }
      } catch (error) {
        console.error('Erreur lors de la suppression du fournisseur:', error);
        alert('Erreur lors de la suppression du fournisseur.');
      }
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleSave = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const updatedSupplier = {
        nom_gerant: formData.get('nom_gerant'),
        cin: formData.get('cin'),
        num_imm: formData.get('num_imm'),
        num_rc: formData.get('num_rc'),
    };

    try {
        const response = await axios.put(
            `http://localhost:9091/api/fournisseur/${selectedItem.fournisseur_id}`,
            updatedSupplier,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.status === 200) {
            // Mettre à jour les données locales
            setData(data.map(item =>
                item.fournisseur_id === selectedItem.fournisseur_id ? { ...item, ...updatedSupplier } : item
            ));
            alert('Fournisseur mis à jour avec succès !');
        } else {
            alert('Erreur lors de la mise à jour du fournisseur.');
        }

        handleModalClose();
    } catch (err) {
        console.error('Erreur lors de la mise à jour du fournisseur:', err);
        alert('Erreur lors de la mise à jour du fournisseur.');
    }
  };

  const filteredData = data.filter((item) =>
    (item.nom_gerant || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.cin || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.num_imm || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.num_rc || '').toLowerCase().includes(searchTerm.toLowerCase())
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
            {currentData.map((item) => (
              <tr key={item.fournisseur_id}>
                <td>{item.nom_gerant}</td>
                <td>{item.cin}</td>
                <td>{item.num_imm}</td>
                <td>{item.num_rc}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => handleEdit(item)} 
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(item.fournisseur_id)}
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
            <Form onSubmit={handleSave}>
              <Form.Group controlId="formNomGerant">
                <Form.Label>Nom du gérant</Form.Label>
                <Form.Control
                  type="text"
                  name="nom_gerant"
                  defaultValue={selectedItem.nom_gerant}
                />
              </Form.Group>
              <Form.Group controlId="formCin">
                <Form.Label>CIN</Form.Label>
                <Form.Control
                  type="text"
                  name="cin"
                  defaultValue={selectedItem.cin}
                />
              </Form.Group>
              <Form.Group controlId="formNumImm">
                <Form.Label>Num_IMM</Form.Label>
                <Form.Control
                  type="text"
                  name="num_imm"
                  defaultValue={selectedItem.num_imm}
                />
              </Form.Group>
              <Form.Group controlId="formNumRc">
                <Form.Label>Num_RC</Form.Label>
                <Form.Control
                  type="text"
                  name="num_rc"
                  defaultValue={selectedItem.num_rc}
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
