import React from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';

const Demande = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="p-4 border rounded shadow-sm">
        <Row className="mb-3">
          <Col className="text-end">
            Rabat, le <span style={{ textDecoration: 'underline' }}>JJ/MM/AAAA</span>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <h1 className="text-center">Liste des besoins en matériel informatique</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              <strong>Nom et prénom du bénéficiaire:</strong> <span style={{ textDecoration: 'underline' }}>nom_prenom</span>
            </p>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Matériel Informatique</th>
                  <th>Quantité</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Demande;
