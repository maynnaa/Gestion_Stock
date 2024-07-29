// File: ../../components/ajouter_fournisseur.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';

// Set the root element for accessibility
Modal.setAppElement('#root');

const SupplierFormModal = ({ isOpen, onClose }) => {
  const [nom, setNom] = useState('');
  const [cin, setCin] = useState('');
  const [numIMM, setNumIMM] = useState('');
  const [numRC, setNumRC] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form data here
    console.log({
      nom,
      cin,
      numIMM,
      numRC
    });
    onClose(); // Close the modal after submission
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      style={customStyles} // Apply custom styles here
    >
      <div className="container">
        <h2 className="my-4">Ajouter un fournisseur</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nom" className="form-label">Nom:</label>
            <input
              type="text"
              id="nom"
              className="form-control"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cin" className="form-label">CIN:</label>
            <input
              type="text"
              id="cin"
              className="form-control"
              value={cin}
              onChange={(e) => setCin(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="numIMM" className="form-label">Numéro d'immatriculation:</label>
            <input
              type="text"
              id="numIMM"
              className="form-control"
              value={numIMM}
              onChange={(e) => setNumIMM(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="numRC" className="form-label">Numéro de registre de commerce:</label>
            <input
              type="text"
              id="numRC"
              className="form-control"
              value={numRC}
              onChange={(e) => setNumRC(e.target.value)}
              required
            />
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">Enregistrer</button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Annuler</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

// Custom styles for the modal
const customStyles = {
  content: {
    top: '40%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '500px', 
    height: '490px', 
    padding: '20px',
    borderRadius: '8px',
  },
};

export default SupplierFormModal;
