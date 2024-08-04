import React, { useState, useEffect} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { FaArrowRight } from 'react-icons/fa'; // Importation de l'icône pour la redirection
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'; // Importation pour la redirection
import Modal from 'react-bootstrap/Modal'; // Importation pour le composant Modal
import { Table } from 'react-bootstrap';
import axios from 'axios';
import { format } from 'date-fns';


function DemandeAchat({ searchTerm }) {

const [demandes, setDemandes] = useState([])

  useEffect(() => {

    axios.get('http://localhost:9091/api/demandeAchat')
      .then(response => {
        console.log('Demandes achats:', response.data);
        setDemandes(response.data);
      })
      .catch(error => console.error('Error fetching material types:', error));
  }, []);
   const items = demandes

  const [showModal, setShowModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null); 

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedItemId(null);
  }

  const handleModalOpen = (id) => {
    setShowModal(true);
    setSelectedItemId(id); 
  }

 

  const navigate = useNavigate(); // Hook pour la redirection

  const filteredItems = items.filter(item => 
    item.date_demande.includes(searchTerm)
  );

  const handleRedirect = (id) => {
    // Redirection vers la page de la demande spécifique
    navigate(`/demande`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return format(date, 'dd/MM/yyyy HH:mm')
  }
  return (
    <>
      <div className="scrollable-list">
        <ListGroup>
          {filteredItems.map(item => (
            <ListGroup.Item key={item.id_demande}>
              <div className="d-flex justify-content-between align-items-center">
                <div><strong>Demande d'achat N°{item.id_demande}</strong></div>
                <div className="d-flex align-items-center">
                  <div><strong>Date de création:</strong> {formatDate(item.date_demande)}</div>
                  <button onClick={() => handleModalOpen(item.id_demande)} className="btn btn-link ml-3">
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
              <p>Fournisseur: {selectedItemId}</p>
              
      <Table responsive="xl">
        <thead>
          <tr>
            <th>Matériel</th>
            <th>Quantité</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Pici</td>
            <td>5</td>
            
          </tr>
          <tr>
            <td>2</td>
            <td>Table cell</td>
            
          </tr>
          <tr>
            <td>3</td>
            <td>Table cell</td>
            
          </tr>
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
