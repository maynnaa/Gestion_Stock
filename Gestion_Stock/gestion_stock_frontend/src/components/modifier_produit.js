import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';



const EditModal = ({ show, onHide, item }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Modifier produit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formProductName">
            <Form.Label>Nom du produit</Form.Label>
            <Form.Control type="text" defaultValue={item.nom} />
          </Form.Group>
          <Form.Group controlId="formProductBrand">
            <Form.Label>Marque</Form.Label>
            <Form.Control type="text" defaultValue={item.marque} />
          </Form.Group>
          <Form.Group controlId="formProductQuantity">
            <Form.Label>Quantité</Form.Label>
            <Form.Control type="number" defaultValue={item.quantite} />
          </Form.Group>
          <Form.Group controlId="formProductDate">
            <Form.Label>Date de livraison</Form.Label>
            <Form.Control type="date" defaultValue={item.dateLivraison} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Annuler
        </Button>
        <Button variant="primary" onClick={() => console.log('Save changes')}>
          Modifier
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
