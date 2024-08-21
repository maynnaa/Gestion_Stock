import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FaArrowRight } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, FormControl } from 'react-bootstrap';

function Recues({ id }) { 
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [formulaireMaterielData, setFormulaireMaterielData] = useState([]);
  const [personnelData, setPersonnelData] = useState([]);
  const [materielData, setMaterielData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Nouveau state pour la recherche

  useEffect(() => {
    // Fetch the notifications
    axios.get(`/api/notification`)
      .then(response => {
        const filteredNotifications = response.data.filter(notification => 
          notification.personnel.id_personnel === parseInt(id, 10)
        );
        setNotifications(filteredNotifications);
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
      });

    // Fetch the formulaireMateriel data
    axios.get(`/api/formulaireMateriel`)
      .then(response => {
        setFormulaireMaterielData(response.data);
      })
      .catch(error => {
        console.error('Error fetching formulaireMateriel data:', error);
      });

    // Fetch the personnel data
    axios.get(`/api/personnel`)
      .then(response => {
        setPersonnelData(response.data);
      })
      .catch(error => {
        console.error('Error fetching personnel data:', error);
      });

    // Fetch the materiel data
    axios.get(`/api/materiel`)
      .then(response => {
        setMaterielData(response.data);
      })
      .catch(error => {
        console.error('Error fetching materiel data:', error);
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
    return date.toLocaleDateString('fr-FR');
  };

  const getMaterielLabel = (id_materiel) => {
    const materiel = materielData.find(m => m.id_materiel === id_materiel);
    return materiel ? materiel.libelle : '';
  };

  const getPersonnelName = (id_personnel) => {
    const personnel = personnelData.find(p => p.id_personnel === id_personnel);
    return personnel ? personnel.nom_complet : '';
  };

  // Filtrage par date
  const filteredNotifications = notifications.filter(item => {
    if (!searchTerm) return true;
    return item.formulaireBesoins.date_creation.includes(searchTerm); // Comparer avec la date de création
  });

  return (
    <>
      <div className="scrollable-list">
        <FormControl
          type="date"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Rechercher par date"
          className="mb-3"
          style={{ width: '40%', margin: '0 auto' }} 
          title="Rechercher par date" 
        />

        <ListGroup>
          {filteredNotifications.map(item => (
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
                  {formulaireMaterielData
                    .filter(fm => fm.formulaireBesoins.id_formulaire === selectedItem.formulaireBesoins.id_formulaire)
                    .map(article => (
                      <tr key={article.id}>
                        <td>{getMaterielLabel(article.materiel.id_materiel)}</td>
                        <td>{article.quantite}</td>
                        <td>{getPersonnelName(article.personnel.id_personnel)}</td>
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
