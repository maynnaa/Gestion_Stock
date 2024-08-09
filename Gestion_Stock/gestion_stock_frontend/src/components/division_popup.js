import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function DivisionPopup({ showModal, handleCloseModal }) {
  return (
    <div>
      {/* Modal for displaying item details */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Détail de la demande de besoins</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Contenu du modal */}
          <p>Contenu du modal ici.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => {/* handle refuse action */}}>
            Refuser
          </Button>
          <Button variant="secondary" onClick={() => {/* handle modify action */}}>
            Modifier
          </Button>
          <Button variant="success" onClick={() => {/* handle approve action */}}>
            Approuver
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DivisionPopup;
