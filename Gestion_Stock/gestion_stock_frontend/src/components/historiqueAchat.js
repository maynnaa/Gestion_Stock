import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { FaArrowRight } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import { format } from 'date-fns';

function DemandeAchat({ searchTerm }) {
  const [demandes, setDemandes] = useState([]);
  const [articles, setArticles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:9091/api/demandeAchat')
      .then((response) => {
        console.log('Demandes achats:', response.data);
        setDemandes(response.data);
      })
      .catch((error) => console.error('Error fetching demande:', error));
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:9091/api/article')
      .then((response) => {
        console.log('Articles:', response.data);
        setArticles(response.data);
      })
      .catch((error) => console.error('Error fetching articles:', error));
  }, []);

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedItemId(null);
  };

  const handleModalOpen = (id) => {
    setShowModal(true);
    setSelectedItemId(id);
  };

  const filteredItems = demandes.filter((item) =>
    item.date_demande.includes(searchTerm)
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy HH:mm');
  };

  const selectedArticles = articles.filter(
    (article) => article.demandeAchat && article.demandeAchat.id_demande === selectedItemId
  );

  const fournisseurName = selectedArticles.length > 0 ? selectedArticles[0].fournisseur.nom : '';

  return (
    <>
      <div className="scrollable-list">
        <ListGroup>
          {filteredItems.map((item) => (
            <ListGroup.Item key={item.id_demande}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>Demande d'achat N°{item.id_demande}</strong>
                </div>
                <div className="d-flex align-items-center">
                  <div>
                    <strong>Date de création:</strong> {formatDate(item.date_demande)}
                  </div>
                  <button
                    onClick={() => handleModalOpen(item.id_demande)}
                    className="btn btn-link ml-3"
                  >
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Détail de la Demande d'achat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItemId !== null ? (
            <div>
              <p>Demande d'achat ID: {selectedItemId}</p>
              <p>Fournisseur: {fournisseurName}</p>
              <Table responsive="xl">
                <thead>
                  <tr>
                    <th>Matériel</th>
                    <th>Quantité</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedArticles.map((article) => (
                    <tr key={article.id_artice_demande}>
                      <td>{article.materiel.libelle}</td>
                      <td>{article.quantite}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <p>Aucune demande sélectionnée</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleModalClose} className="btn btn-secondary">
            Fermer
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DemandeAchat;
