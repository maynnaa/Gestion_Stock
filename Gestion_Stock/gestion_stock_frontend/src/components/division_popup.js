import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function DivisionPopup({ showModal, handleCloseModal, notification }) {
  const [selectedArticles, setSelectedArticles] = useState([]);

  useEffect(() => {
    if (notification && notification.formulaireBesoins) {
      const fetchSelectedArticles = async () => {
        try {
          const response = await axios.get(`/api/formulaireMateriel/formulaire/${notification.formulaireBesoins.id_formulaire}`);
          console.log('Articles sélectionnés:', response.data);
          setSelectedArticles(response.data);
        } catch (error) {
          console.error('Erreur lors de la récupération des articles:', error);
          setSelectedArticles([]);
        }
      };

      fetchSelectedArticles();
    }
  }, [notification]);

  if (!notification || !notification.formulaireBesoins) {
    return null;
  }

  const handleReject = () => {
    // Logique pour rejeter la demande
    console.log('Demande rejetée');
    handleCloseModal(); // Fermer le modal après l'action
  };

  const handleApprove = () => {
    // Logique pour approuver la demande
    console.log('Demande approuvée');
    handleCloseModal(); // Fermer le modal après l'action
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Détail de la demande de besoins</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Demande de besoin N°:</strong> {notification.formulaireBesoins.id_formulaire}</p>
        <p><strong>Date de création:</strong> {new Date(notification.formulaireBesoins.date_creation).toLocaleDateString()}</p>
        <p><strong>Validation:</strong> {notification.formulaireBesoins.validation}</p>

        <Table responsive="xl" className="text-center">
          <thead>
            <tr>
              <th>Matériel</th>
              <th>Quantité</th>
              <th>Bénéficiaire</th>
            </tr>
          </thead>
          <tbody>
            {selectedArticles.map(article => (
              <tr key={article.id}>
                <td>{article.materiel.libelle}</td>
                <td>{article.quantite}</td>
                <td>{article.personnel.nom_complet}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleReject}>
          Rejeter
        </Button>
        <Button variant="success" onClick={handleApprove}>
          Approuver
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DivisionPopup;
