import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const generateRandomCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};


const materials = ['Material 1', 'Material 2', 'Material 3'];
const fournisseurs = ['Fournisseur 1', 'Fournisseur 2', 'Fournisseur 3'];

const FormulaireDemandeAchat = () => {
  const [selectedFournisseur, setSelectedFournisseur] = useState(fournisseurs[0]);
  const [tableRows, setTableRows] = useState([{ material: materials[0], quantity: 1 }]);

  const addRow = () => {
    setTableRows([...tableRows, { material: materials[0], quantity: 1}]);
  };

  const removeRow = (index) => {
    setTableRows(tableRows.filter((_, i) => i !== index));
  };

  const handleRowChange = (index, field, value) => {
    const newTableRows = [...tableRows];
    newTableRows[index][field] = value;
    setTableRows(newTableRows);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-sm" style={styles.card}>
        <div className="card-body">
          <h5 className="card-title mb-3" style={styles.cardTitle}>Demande d'achat</h5>

          <div className="form-group row mb-3">
            <label className="col-sm-3 col-form-label">Fournisseur:</label>
            <div className="col-sm-9">
              <select
                className="form-control"
                value={selectedFournisseur}
                onChange={(e) => setSelectedFournisseur(e.target.value)}
              >
                {fournisseurs.map((fournisseur, index) => (
                  <option key={index} value={fournisseur}>
                    {fournisseur}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-secondary" onClick={addRow}>Ajouter un matériel</button>
          </div>

          <div style={styles.tableContainer}>
            <table className="table">
              <thead>
                <tr>
                  <th>Matériel</th>
                  <th>Quantité</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <select
                        className="form-control"
                        value={row.material}
                        onChange={(e) => handleRowChange(index, 'material', e.target.value)}
                      >
                        {materials.map((material, idx) => (
                          <option key={idx} value={material}>
                            {material}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        value={row.quantity}
                        onChange={(e) => handleRowChange(index, 'quantity', e.target.value)}
                        min="1"
                      />
                    </td>
                    <td>
                      <button className="btn btn-danger" onClick={() => removeRow(index)}>🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center" style={styles.buttonContainer}>
            <button className="btn btn-secondary" style={styles.cancelButton} onClick={() => window.location.reload()}>
              Annuler
            </button>
            <button type="submit" className="btn btn-primary" style={styles.submitButton} onClick={handleSubmit}>
              Envoyer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '15px',
  },
  cardTitle: {
    marginBottom: '15px',
  },
  tableContainer: {
    maxHeight: '150px',
    overflowY: 'auto',
  },
  buttonContainer: {
    marginTop: '15px',
    display: 'flex',
    justifyContent: 'center',
  },
  cancelButton: {
    marginRight: '10px',
  },
  submitButton: {
    marginLeft: '10px',
  },
};

export default FormulaireDemandeAchat;
