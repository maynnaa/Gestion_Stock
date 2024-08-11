import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FaArrowRight } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';

function Recues({ id }) { 
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios.get(`/api/notification`)
      .then(response => {
        console.log('All notifications received:', response.data); 

        // Filtrer les notifications pour ne garder que celles qui correspondent à l'id passé en paramètre
        const filteredNotifications = response.data.filter(notification => {
          console.log('Comparing:', notification.personnel.id_personnel, 'with', parseInt(id, 10));
          return notification.personnel.id_personnel === parseInt(id, 10);
        });

        console.log('Filtered notifications:', filteredNotifications);
        setNotifications(filteredNotifications);
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
      });
  }, [id]);

  const handleModalOpen = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR'); // Simple date format
  };

  return (
    <>
      <div className="scrollable-list">
        <ListGroup>
          {notifications.map(item => (
            <ListGroup.Item key={item.id_notification}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>Demande de besoin N°{item.formulaireBesoins.id_formulaire}</strong>
                </div>
                <div className="d-flex align-items-center">
                  <div>
                    <strong>Date de création:</strong> {formatDate(item.formulaireBesoins.date_creation)}
                  </div>
                  <button
                    onClick={() => handleModalOpen(item)}
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
          <Modal.Title>Détail de la demande de besoins</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem ? (
            <div>
              <p><strong>Demande de besoin N°:</strong> {selectedItem.formulaireBesoins.id_formulaire}</p>
              <p><strong>Date de création:</strong> {formatDate(selectedItem.formulaireBesoins.date_creation)}</p>
              <p><strong>Validation:</strong> {selectedItem.formulaireBesoins.validation}</p>

              <Table responsive="xl" className="text-center">
                <thead>
                  <tr>
                    <th>Matériel</th>
                    <th>Quantité</th>
                    <th>Bénéficiaire</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedItem.formulaireBesoins.formulaireMateriels && selectedItem.formulaireBesoins.formulaireMateriels.map(article => (
                    <tr key={article.id}>
                      <td>{article.materiel.libelle}</td>
                      <td>{article.quantite}</td>
                      <td>{article.personnel.nom_complet}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <p>Aucun détail disponible</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Recues;
