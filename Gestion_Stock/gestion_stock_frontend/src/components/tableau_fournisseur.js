import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Search from './search'; // Assurez-vous que ce composant de recherche existe et est correctement implémenté
import { ToastContainer, toast } from 'react-toastify';  // Importation des composants de Toastify
import 'react-toastify/dist/ReactToastify.css'; // Importation des styles de Toastify
import ConfirmationModal from './confirmationModal';

const TableauFournisseur = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
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

  const handleDelete = (item) => {
    setItemToDelete(item);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      try {
        const response = await axios.delete(`http://localhost:9091/api/fournisseur/${itemToDelete.fournisseur_id}`);
        if (response.status === 204) {
          setData(data.filter(item => item.fournisseur_id !== itemToDelete.fournisseur_id));
          toast.success('Fournisseur supprimé avec succès.'); // Message de succès
        } else {
          toast.error('Erreur lors de la suppression du fournisseur'); // Message d'erreur
        }
      } catch (error) {
        console.error('Erreur lors de la suppression du fournisseur:', error);
        toast.error('Ce fournisseur est attribué a un produit !'); // Message d'erreur
      }
      setShowConfirmModal(false);
      setItemToDelete(null);
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
      nom: formData.get('nom'),
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
        setData(data.map(item =>
          item.fournisseur_id === selectedItem.fournisseur_id ? { ...item, ...updatedSupplier } : item
        ));
        toast.success('Fournisseur mis à jour avec succès !'); // Message de succès
      } else {
        toast.error('Erreur lors de la mise à jour du fournisseur.'); // Message d'erreur
      }

      handleModalClose();

    } catch (err) {
      console.error('Erreur lors de la mise à jour du fournisseur:', err);
      toast.error('Erreur lors de la mise à jour du fournisseur.'); // Message d'erreur
    }
  };

  const filteredData = data.filter((item) =>
    (item.nom || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
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
            <tr className='text-center'>
              <th>Nom du gérant</th>
              <th>CIN</th>
              <th>Num_IMM</th>
              <th>Num_RC</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {currentData.map((item) => (
              <tr key={item.fournisseur_id}>
                <td>{item.nom}</td>
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
                    onClick={() => handleDelete(item)}
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
                  name="nom"
                  defaultValue={selectedItem.nom}
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

      {/* Confirmation Modal for deletion */}
      <ConfirmationModal
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmDelete}
        message="Êtes-vous sûr de vouloir supprimer ce fournisseur ?"
      />

      {/* ToastContainer for notifications */}
      <ToastContainer />
    </div>
  );
};

const styles = {
  searchWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  tableWrapper: {
    marginTop: '20px',
  },
  paginationWrapper: {
    position: 'fixed',
    bottom: '2px',  
    left: '50%',
    right: '0',
    display: 'flex',
    zIndex: 1000,  
  },
  pagination: {
    cursor: 'pointer',
  },
};

export default TableauFournisseur;
