import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit, FaTag } from 'react-icons/fa';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Search from './search';

const StockMagasinier = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [materielList, setMaterielList] = useState([]);
  const [fournisseurList, setFournisseurList] = useState([]);
  const itemsPerPage = 9;

  useEffect(() => {
    axios.get('http://localhost:9091/api/produit')
      .then(response => {
        setData(response.data);
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
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour des données:', error);
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
    <div className="container mt-2">
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
          <tbody>
            {currentData.map((item) => (
              <tr key={item.id_produit} className="text-center">
                <td>{item.num_serie}</td>
                <td>{item.date_livraison}</td>
                <td>{item.marque}</td>
                <td>{item.materiel ? item.materiel.libelle : ''}</td>
                <td>{item.fournisseur ? item.fournisseur.nom : ''}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => handleEdit(item)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-sm btn-warning"
                  >
                    <FaTag />
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

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier les informations du produit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <Form onSubmit={handleSave}>
              <Form.Group controlId="formNumSerie">
                <Form.Label>Numéro de série</Form.Label>
                <Form.Control
                  type="text"
                  name="num_serie"
                  defaultValue={selectedItem.num_serie}
                />
              </Form.Group>
              <Form.Group controlId="formDateLivraison">
                <Form.Label>Date de livraison</Form.Label>
                <Form.Control
                  type="date"
                  name="date_livraison"
                  defaultValue={selectedItem.date_livraison}
                />
              </Form.Group>
              <Form.Group controlId="formMarque">
                <Form.Label>Marque</Form.Label>
                <Form.Control
                  type="text"
                  name="marque"
                  defaultValue={selectedItem.marque}
                />
              </Form.Group>
              <Form.Group controlId="formMateriel">
                <Form.Label>Matériel</Form.Label>
                <Form.Control
                  as="select"
                  name="materiel"
                  defaultValue={selectedItem.materiel ? selectedItem.materiel.libelle : ''}
                >
                  <option value="">Sélectionner un matériel</option>
                  {materielList.map(materiel => (
                    <option key={materiel.id_materiel} value={materiel.libelle}>
                      {materiel.libelle}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formFournisseur">
                <Form.Label>Fournisseur</Form.Label>
                <Form.Control
                  as="select"
                  name="fournisseur"
                  defaultValue={selectedItem.fournisseur ? selectedItem.fournisseur.nom : ''}
                >
                  <option value="">Sélectionner un fournisseur</option>
                  {fournisseurList.map(fournisseur => (
                    <option key={fournisseur.fournisseur_id} value={fournisseur.nom}>
                      {fournisseur.nom}
                    </option>
                  ))}
                </Form.Control>
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

export default StockMagasinier;
