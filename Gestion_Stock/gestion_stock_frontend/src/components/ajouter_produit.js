// File: ../../components/ajouter_produit.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';

// Set the root element for accessibility
Modal.setAppElement('#root');

const ProductFormModal = ({ isOpen, onClose }) => {
  const [productName, setProductName] = useState('');
  const [brand, setBrand] = useState('');
  const [type, setType] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [perishable, setPerishable] = useState(false);
  const [stockable, setStockable] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form data here
    console.log({
      productName,
      brand,
      type,
      deliveryDate,
      serialNumber,
      perishable,
      stockable
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
        <h2 className="my-4">Ajouter un produit</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="productName" className="form-label">Nom du produit:</label>
            <input
              type="text"
              id="productName"
              className="form-control"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
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
            <label htmlFor="type" className="form-label">Type:</label>
            <input
              type="text"
              id="type"
              className="form-control"
              value={type}
              onChange={(e) => setType(e.target.value)}
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
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              id="perishable"
              className="form-check-input"
              checked={perishable}
              onChange={(e) => setPerishable(e.target.checked)}
            />
            <label htmlFor="perishable" className="form-check-label">Périssable</label>
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              id="stockable"
              className="form-check-input"
              checked={stockable}
              onChange={(e) => setStockable(e.target.checked)}
            />
            <label htmlFor="stockable" className="form-check-label">Stockable</label>
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
    height: '680px', 
    padding: '20px',
    borderRadius: '8px',
  },
};

export default ProductFormModal;
