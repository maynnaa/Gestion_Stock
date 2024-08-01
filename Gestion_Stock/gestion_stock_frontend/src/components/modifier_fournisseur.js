import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditSupplierModal = ({ show, onHide, supplier, onSave }) => {
  // Si supplier est null, nous n'affichons pas le modal
  if (!supplier) {
    return null;
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Modifier Fournisseur</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSave}>
          <Form.Group controlId="formSupplierName">
            <Form.Label>Nom du gérant</Form.Label>
            <Form.Control
              type="text"
              name="nom_gerant"
              defaultValue={supplier.nom_gerant || ''}
              required
            />
          </Form.Group>
          <Form.Group controlId="formSupplierCIN">
            <Form.Label>CIN</Form.Label>
            <Form.Control
              type="text"
              name="cin"
              defaultValue={supplier.cin || ''}
              required
            />
          </Form.Group>
          <Form.Group controlId="formSupplierNumIMM">
            <Form.Label>Num_IMM</Form.Label>
            <Form.Control
              type="text"
              name="num_imm"
              defaultValue={supplier.num_imm || ''}
              required
            />
          </Form.Group>
          <Form.Group controlId="formSupplierNumRC">
            <Form.Label>Num_RC</Form.Label>
            <Form.Control
              type="text"
              name="num_rc"
              defaultValue={supplier.num_rc || ''}
              required
            />
          </Form.Group>
          <div className="d-flex justify-content-end mt-3">
            <Button variant="secondary" onClick={onHide} className="me-2">
              Annuler
            </Button>
            <Button type="submit" variant="primary">
              Modifier
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditSupplierModal;
