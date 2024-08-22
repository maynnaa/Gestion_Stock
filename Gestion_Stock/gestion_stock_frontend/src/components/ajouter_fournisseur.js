import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import toastify styles

Modal.setAppElement('#root');

const SupplierFormModal = ({ isOpen, onClose }) => {
  const [nomGerant, setNomGerant] = useState('');
  const [cin, setCin] = useState('');
  const [numIMM, setNumIMM] = useState('');
  const [numRC, setNumRC] = useState('');
  const [error, setError] = useState('');

  const validateInputs = () => {
    if (cin.length !== 8 || !/^[a-zA-Z]{2}\d{6}$/.test(cin)) {
      return 'Le CIN doit comporter 2 lettres suivies de 6 chiffres.';
    }
    if (numIMM.length !== 8 || !/^\d{8}$/.test(numIMM)) {
      return 'Le numéro d\'immatriculation doit comporter 8 chiffres.';
    }
    if (numRC.length < 5 || numRC.length > 7 || !/^\d{5,7}$/.test(numRC)) {
      return 'Le numéro de Registre de Commerce doit comporter entre 5 et 7 chiffres.';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      toast.error(validationError); // Show error toast
      return;
    }

    const newFournisseur = {
      nom: nomGerant,
      cin,
      num_imm: numIMM,
      num_rc: numRC,
    };

    try {
      const response = await axios.post('http://localhost:9091/api/fournisseur', newFournisseur, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      toast.success('Fournisseur ajouté avec succès !'); // Show success toast
      
      // Afficher le message de succès pendant 1 seconde avant de recharger
      setTimeout(() => {
        window.location.reload();
      }, 1000); // 1000 millisecondes = 1 seconde
    } catch (err) {
      if (err.response && err.response.status === 409) {
        const message = 'Le fournisseur existe déjà avec ce CIN, ce numéro de RC, ou ce numéro d\'immatriculation.';
        setError(message);
        toast.error(message); // Show error toast
      } else {
        const message = 'Erreur lors de l\'ajout du fournisseur.';
        setError(message);
        toast.error(message); // Show error toast
      }
      console.error(err);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      style={customStyles}
    >
      <div className="container">
        <h2 className="my-4">Ajouter un fournisseur</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nomGerant" className="form-label">Nom du gérant:</label>
            <input
              type="text"
              id="nomGerant"
              className="form-control"
              value={nomGerant}
              onChange={(e) => setNomGerant(e.target.value)}
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

const customStyles = {
  content: {
    top: '40%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '500px',
    height: '505px',
    padding: '20px',
    borderRadius: '8px',
  },
};

export default SupplierFormModal;
