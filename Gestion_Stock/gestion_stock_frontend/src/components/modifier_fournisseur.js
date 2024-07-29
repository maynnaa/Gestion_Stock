import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

// Définition des styles en ligne pour le bouton
const styles = {
  saveButton: {
    marginLeft: 'auto', // Aligne le bouton à droite
    marginTop: '10px', // Espace au-dessus du bouton
  },
};

const EditSupplierModal = ({ show, onHide, supplier }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Modifier Fournisseur</Modal.Title> {/* Titre mis à jour */}
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formSupplierName">
            <Form.Label>Nom</Form.Label>
            <Form.Control type="text" defaultValue={supplier.nom} />
          </Form.Group>
          <Form.Group controlId="formSupplierCIN">
            <Form.Label>CIN</Form.Label>
            <Form.Control type="text" defaultValue={supplier.cin} />
          </Form.Group>
          <Form.Group controlId="formSupplierNumIMM">
            <Form.Label>Num_IMM</Form.Label>
            <Form.Control type="text" defaultValue={supplier.numImm} />
          </Form.Group>
          <Form.Group controlId="formSupplierNumRC">
            <Form.Label>Num_RC</Form.Label>
            <Form.Control type="text" defaultValue={supplier.numRc} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Annuler
        </Button>
        <Button 
          variant="primary" 
          onClick={() => console.log('Save changes')}
          style={styles.saveButton} // Appliquer le style en ligne
        >
          Modifier
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditSupplierModal;
