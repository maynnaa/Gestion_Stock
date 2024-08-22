import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit, FaTag } from 'react-icons/fa';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Search from './search';

const StockMagasinier = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [materielList, setMaterielList] = useState([]);
  const [fournisseurList, setFournisseurList] = useState([]);
  const [showPPRModal, setShowPPRModal] = useState(false);
  const itemsPerPage = 9;

  useEffect(() => {
    axios.get('http://localhost:9091/api/produit')
      .then(response => {
        const produitsDisponibles = response.data.filter(produit => produit.disponibilite === 'disponible');
        setData(produitsDisponibles);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
      });

    axios.get('http://localhost:9091/api/materiel')
      .then(response => {
        setMaterielList(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des matériaux:', error);
      });

    axios.get('http://localhost:9091/api/fournisseur')
      .then(response => {
        setFournisseurList(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des fournisseurs:', error);
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

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleSave = async (event) => {
    event.preventDefault();

    const updatedItem = {
      ...selectedItem,
      num_serie: event.target.formNumSerie.value,
      date_livraison: event.target.formDateLivraison.value,
      marque: event.target.formMarque.value,
      materiel: materielList.find(m => m.libelle === event.target.formMateriel.value),
      fournisseur: fournisseurList.find(f => f.nom === event.target.formFournisseur.value),
    };

    try {
      const response = await axios.put(`http://localhost:9091/api/produit/${updatedItem.id_produit}`, updatedItem);
      if (response.status === 200) {
        setData((prevData) =>
          prevData.map((item) =>
            item.id_produit === updatedItem.id_produit ? updatedItem : item
          )
        );
        handleModalClose();

        toast.success('L\'article a été modifié avec succès.');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour des données:', error);
      toast.error('Erreur lors de la mise à jour des données.');
    }
  };

  const handlePPR = (item) => {
    setSelectedItem(item);
    setShowPPRModal(true);
  };

  const handlePPRModalClose = () => {
    setShowPPRModal(false);
    setSelectedItem(null);
  };

  const handleSavePPR = async (event) => {
    event.preventDefault();

    const ppr = event.target.formPPR.value;

    try {
      const response = await axios.post('http://localhost:9091/api/articleAffecte/assign', {
        ppr: ppr,
        produitId: selectedItem.id_produit
      });

      if (response.status === 200) {
        console.log('Article affecté avec succès:', response.data);

        handlePPRModalClose();
        window.location.reload();

        toast.success('Article affecté avec succès.');
      }
    } catch (error) {
      handlePPRModalClose();

      console.error('Erreur lors de l\'affectation de l\'article:', error.response?.data || error.message);
      toast.error('PPR introuvable.');
    }
  };

  const filteredData = data.filter((item) =>
    (item.num_serie || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.date_livraison || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.marque || '').toLowerCase().includes(searchTerm.toLowerCase())
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
    const start = Math.max(1, Math.floor((currentPage - 1) / range) * range + 1);
    const end = Math.min(start + range - 1, totalPages);

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className="container mt-2" style={styles.container}>
      <ToastContainer />

      <div style={styles.searchWrapper}>
        <Search onSearch={handleSearch} />
      </div>

      <div className="table-responsive" style={styles.tableWrapper}>
        <table className="table table-bordered">
          <thead>
            <tr className="text-center">
              <th>Numéro de série</th>
              <th>Date de livraison</th>
              <th>Marque</th>
              <th>Matériel</th>
              <th>Fournisseur</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {currentData.map((item) => (
              <tr key={item.id_produit}>
                <td>{item.num_serie}</td>
                <td>{item.date_livraison}</td>
                <td>{item.marque}</td>
                <td>{item.materiel?.libelle || ''}</td>
                <td>{item.fournisseur?.nom || ''}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleEdit(item)}
                    style={{ marginRight: '10px' }}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handlePPR(item)}
                  >
                    <FaTag />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav style={styles.paginationWrapper}>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
              Précédent
            </button>
          </li>
          {getPageNumbers().map((pageNumber) => (
            <li
              key={pageNumber}
              className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}
            >
              <button className="page-link" onClick={() => handlePageChange(pageNumber)}>
                {pageNumber}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
              Suivant
            </button>
          </li>
        </ul>
      </nav>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier l'article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <Form onSubmit={handleSave}>
              <Form.Group controlId="formNumSerie">
                <Form.Label>Numéro de série</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedItem.num_serie}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formDateLivraison">
                <Form.Label>Date de livraison</Form.Label>
                <Form.Control
                  type="date"
                  defaultValue={selectedItem.date_livraison}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formMarque">
                <Form.Label>Marque</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedItem.marque}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formMateriel">
                <Form.Label>Matériel</Form.Label>
                <Form.Control as="select" defaultValue={selectedItem.materiel?.libelle || ''}>
                  {materielList.map((m) => (
                    <option key={m.id_materiel}>{m.libelle}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formFournisseur">
                <Form.Label>Fournisseur</Form.Label>
                <Form.Control as="select" defaultValue={selectedItem.fournisseur?.nom || ''}>
                  {fournisseurList.map((f) => (
                    <option key={f.id_fournisseur}>{f.nom}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit"  style={{ marginTop: '20px' }}>
                Sauvegarder
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>

      <Modal show={showPPRModal} onHide={handlePPRModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Affecter l'article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSavePPR}>
            <Form.Group controlId="formPPR">
              <Form.Label>PPR</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez le PPR"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit"  style={{ marginTop: '20px' }}>
              Sauvegarder
            </Button>
          </Form>
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
    marginBottom: '80px', 
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
    marginBottom: '0',
    maxHeight: '400px',
    overflowY: 'auto',
  },
  alert: {
    fontSize: '13px', 
    marginBottom: '10px',
    maxWidth: '350px', 
    margin: '0 auto', 
  },
};

export default StockMagasinier;
