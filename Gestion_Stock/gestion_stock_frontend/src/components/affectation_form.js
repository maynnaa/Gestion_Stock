import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

const AffectationForm = () => {
  const [nomMaterielOptions, setNomMaterielOptions] = useState([]);

  const handleTypeMaterielChange = (e) => {
    const selectedType = e.target.value;

    if (selectedType === 'Type1') {
      setNomMaterielOptions(['Materiel1', 'Materiel2']);
    } else if (selectedType === 'Type2') {
      setNomMaterielOptions(['Materiel3', 'Materiel4']);
    } else {
      setNomMaterielOptions([]);
    }
  };

  return (
    <div className="container mt-4 d-flex justify-content-center">
      <Card className="p-3" style={{ width: '500px', maxHeight: '650px' }}>
        <Card.Header className="text-center">
          <h2>Affectation du matériel</h2>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group controlId="typeMateriel">
              <Form.Label>Type du matériel</Form.Label>
              <Form.Control as="select" onChange={handleTypeMaterielChange} style={{ width: '100%' }}>
                <option value="">Choisissez un type</option>
                <option value="Type1">Type 1</option>
                <option value="Type2">Type 2</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="nomMateriel">
              <Form.Label>Nom du matériel</Form.Label>
              <Form.Control as="select" style={{ width: '100%' }}>
                <option value="">Choisissez un matériel</option>
                {nomMaterielOptions.map((materiel, index) => (
                  <option key={index} value={materiel}>{materiel}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="numSerie">
              <Form.Label>Numéro de série</Form.Label>
              <Form.Control type="text" style={{ width: '100%' }} />
            </Form.Group>

            <Form.Group controlId="quantite">
              <Form.Label>Quantité</Form.Label>
              <Form.Control type="number" style={{ width: '100%' }} />
            </Form.Group>

            <Form.Group controlId="nomBeneficiaire">
              <Form.Label>Nom du bénéficiaire</Form.Label>
              <Form.Control as="select" style={{ width: '100%' }}>
                <option value="">Choisissez un nom</option>
                <option value="Nom1">Nom1</option>
                <option value="Nom2">Nom2</option>
                <option value="Nom3">Nom3</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="prenom">
              <Form.Label>Prénom</Form.Label>
              <Form.Control as="select" style={{ width: '100%' }}>
                <option value="">Choisissez un prénom</option>
                <option value="Prenom1">Prenom1</option>
                <option value="Prenom2">Prenom2</option>
                <option value="Prenom3">Prenom3</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="ppr">
              <Form.Label>PPR</Form.Label>
              <Form.Control type="text" style={{ width: '100%' }} />
            </Form.Group>

            <div className="d-flex justify-content-end mt-3">
              <Button variant="danger" className="me-2">Annuler</Button>
              <Button variant="success" type="submit">Affecter</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AffectationForm;
