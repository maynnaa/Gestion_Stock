import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const generateRandomCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

const divisions = ['Division 1'];
const services = ['Service 1'];
const materials = ['Material 1', 'Material 2', 'Material 3'];
const beneficiaries = ['User 1', 'User 2', 'User 3'];

const Formulaire = () => {
  const [ppr] = useState(generateRandomCode());
  const [selectedDivision, setSelectedDivision] = useState(divisions[0]);
  const [selectedService, setSelectedService] = useState(services[0]);
  const [tableRows, setTableRows] = useState([{ material: materials[0], quantity: 1, beneficiary: beneficiaries[0] }]);

  const addRow = () => {
    setTableRows([...tableRows, { material: materials[0], quantity: 1, beneficiary: beneficiaries[0] }]);
  };

  const removeRow = (index) => {
    setTableRows(tableRows.filter((_, i) => i !== index));
  };

  const handleRowChange = (index, field, value) => {
    const newTableRows = [...tableRows];
    newTableRows[index][field] = value;
    setTableRows(newTableRows);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm" style={styles.card}>
        <div className="card-body">
          <h5 className="card-title mb-3" style={styles.cardTitle}>Formulaire De Besoin</h5>

          <div className="form-group row mb-3">
            <label className="col-sm-3 col-form-label">PPR:</label>
            <div className="col-sm-9">
              <input type="text" className="form-control" value={ppr} readOnly />
            </div>
          </div>

          <div className="form-group row mb-3">
            <label className="col-sm-3 col-form-label">Division:</label>
            <div className="col-sm-9">
              <select
                className="form-control"
                value={selectedDivision}
                onChange={(e) => setSelectedDivision(e.target.value)}
              >
                {divisions.map((division, index) => (
                  <option key={index} value={division}>
                    {division}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group row mb-3">
            <label className="col-sm-3 col-form-label">Service:</label>
            <div className="col-sm-9">
              <select
                className="form-control"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
              >
                {services.map((service, index) => (
                  <option key={index} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-secondary" onClick={addRow}>Ajouter un bénéficiaire</button>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>Bénéficiaire</th>
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
                      value={row.beneficiary}
                      onChange={(e) => handleRowChange(index, 'beneficiary', e.target.value)}
                    >
                      {beneficiaries.map((beneficiary, idx) => (
                        <option key={idx} value={beneficiary}>
                          {beneficiary}
                        </option>
                      ))}
                    </select>
                  </td>
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

          <div className="text-center" style={styles.buttonContainer}>
            <button className="btn btn-secondary" style={styles.cancelButton} onClick={() => window.location.reload()}>
              Annuler
            </button>
            <button type="submit" className="btn btn-primary" style={styles.submitButton}>
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

export default Formulaire;