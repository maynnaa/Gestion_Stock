import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

// Set the root element for accessibility
Modal.setAppElement('#root');

const ProductFormModal = ({ isOpen, onClose }) => {
  const [productName, setProductName] = useState('');
  const [brand, setBrand] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [perishable, setPerishable] = useState(false);
  const [stockable, setStockable] = useState(false);
  const [types, setTypes] = useState([]);
  const [materiels, setMateriels] = useState([]);
  const [selectedMateriel, setSelectedMateriel] = useState('');

  useEffect(() => {
    if (isOpen) {
      // Fetch types
      axios.get('/api/type-materiel')
        .then(response => setTypes(response.data))
        .catch(error => console.error('Error fetching types:', error));

      // Fetch materiels
      axios.get('/api/materiel') // Ensure you have the correct endpoint
        .then(response => setMateriels(response.data))
        .catch(error => console.error('Error fetching materiels:', error));
    }
  }, [isOpen]);

  const handleCheckboxChange = (setter, otherSetter) => (e) => {
    setter(e.target.checked);
    if (e.target.checked) {
      otherSetter(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      num_serie: serialNumber,
      stockable,
      perissable: perishable,
      date_livraison: deliveryDate,
      marque: brand,
      type: { id: selectedType }, // Assuming you need to send type ID
      materiel: { id_materiel: selectedMateriel } // Use selected materiel ID
    };

    try {
      const response = await axios.post('/api/produit', productData);
      console.log('Product added successfully:', response.data);
      onClose();
    } catch (error) {
      console.error('There was an error adding the product!', error);
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
        <h2 className="my-4">Ajouter un produit</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="type" className="form-label">Type:</label>
            <select
              id="type"
              className="form-select"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              required
            >
              <option value="">Sélectionner un type</option>
              {types.map(type => (
                <option key={type.id} value={type.id}>
                  {type.libelle}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="materiel" className="form-label">Materiel:</label>
            <select
              id="materiel"
              className="form-select"
              value={selectedMateriel}
              onChange={(e) => setSelectedMateriel(e.target.value)}
              required
            >
              <option value="">Sélectionner un materiel</option>
              {materiels.map(materiel => (
                <option key={materiel.id_materiel} value={materiel.id_materiel}>
                  {materiel.libelle} {/* Ensure this is the correct field */}
                </option>
              ))}
            </select>
          </div>
         
          <div className="mb-3">
            <label htmlFor="brand" className="form-label">Marque:</label>
            <input
              type="text"
              id="brand"
              className="form-control"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="serialNumber" className="form-label">Numéro de série:</label>
            <input
              type="text"
              id="serialNumber"
              className="form-control"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="deliveryDate" className="form-label">Date de livraison:</label>
            <input
              type="date"
              id="deliveryDate"
              className="form-control"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              required
            />
          </div>
          <div className="row mb-3">
            <div className="col">
              <div className="form-check">
                <input
                  type="checkbox"
                  id="perishable"
                  className="form-check-input"
                  checked={perishable}
                  onChange={handleCheckboxChange(setPerishable, setStockable)}
                />
                <label htmlFor="perishable" className="form-check-label">Périssable</label>
              </div>
            </div>
            <div className="col">
              <div className="form-check">
                <input
                  type="checkbox"
                  id="stockable"
                  className="form-check-input"
                  checked={stockable}
                  onChange={handleCheckboxChange(setStockable, setPerishable)}
                />
                <label htmlFor="stockable" className="form-check-label">Stockable</label>
              </div>
            </div>
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
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '500px',
    height: '620px',
    padding: '20px',
    borderRadius: '8px',
  },
};

export default ProductFormModal;
