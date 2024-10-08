import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import toastify styles

const FormulaireDemandeAchat = ({ id }) => {
  const [fournisseurs, setFournisseurs] = useState([]);
  const [fournisseurMapping, setFournisseurMapping] = useState({});
  const [selectedFournisseurId, setSelectedFournisseurId] = useState('');
  const [materialTypes, setMaterialTypes] = useState([]);
  const [selectedMaterialType, setSelectedMaterialType] = useState('');
  const [materials, setMaterials] = useState([]);
  const [tableRows, setTableRows] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9091/api/fournisseur')
      .then(response => {
        setFournisseurs(response.data);
        const mapping = response.data.reduce((acc, fournisseur) => {
          acc[fournisseur.nom] = fournisseur.fournisseur_id;
          return acc;
        }, {});
        setFournisseurMapping(mapping);
      })
      .catch(error => console.error('Error fetching fournisseurs:', error));

    axios.get('http://localhost:9091/api/type-materiel')
      .then(response => {
        setMaterialTypes(response.data);
      })
      .catch(error => console.error('Error fetching material types:', error));
  }, []);

  useEffect(() => {
    if (selectedMaterialType) {
      axios.get(`http://localhost:9091/api/materiel?typeMaterielId=${selectedMaterialType}`)
        .then(response => {
          setMaterials(response.data);
        })
        .catch(error => console.error('Error fetching materials:', error));
    }
  }, [selectedMaterialType]);

  const addRow = () => {
    setTableRows([...tableRows, { material: '', quantity: 1 }]);
  };

  const removeRow = (index) => {
    setTableRows(tableRows.filter((_, i) => i !== index));
  };

  const handleRowChange = (index, field, value) => {
    const newTableRows = [...tableRows];
    newTableRows[index][field] = value;
    setTableRows(newTableRows);
  };

  const handleQuantityChange = (index, value) => {
    const newQuantity = Math.max(1, value);
    handleRowChange(index, 'quantity', newQuantity);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!selectedFournisseurId) {
        toast.error('Veuillez sélectionner un fournisseur.'); // Show error toast
        return;
      }

      const demandeResponse = await axios.post('http://localhost:9091/api/demandeAchat', {
        date_demande: new Date().toISOString(),
        personnel: { id_personnel: id },
      });

      const idDemande = demandeResponse.data.id_demande;

      for (let row of tableRows) {
        if (!row.material) {
          continue;
        }

        await axios.post('http://localhost:9091/api/article', {
          quantite: row.quantity,
          demandeAchat: { id_demande: idDemande },
          materiel: { id_materiel: row.material },
          fournisseur: { fournisseur_id: selectedFournisseurId }
        });
      }

      toast.success('Demande d\'achat enregistrée avec succès'); // Show success toast
      resetForm();
    } catch (error) {
      console.error('Error submitting demande d\'achat:', error);
      toast.error('Une erreur s\'est produite lors de l\'enregistrement de la demande'); // Show error toast
    }
  };

  const handleFournisseurChange = (e) => {
    const fournisseurName = e.target.value;
    const fournisseurId = fournisseurMapping[fournisseurName];
    setSelectedFournisseurId(fournisseurId || '');
  };

  const resetForm = () => {
    setSelectedFournisseurId('');
    setSelectedMaterialType('');
    setMaterials([]);
    setTableRows([]);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 flex-column">
      <ToastContainer /> {/* Add ToastContainer here */}
      <div className="card shadow-sm" style={styles.card}>
        <div className="card-body">
          <h5 className="card-title mb-3" style={styles.cardTitle}>Demande d'achat</h5>

          <div className="form-group row mb-3">
            <label className="col-sm-3 col-form-label">Fournisseur:</label>
            <div className="col-sm-9">
              <select
                className="form-control"
                onChange={handleFournisseurChange}
              >
                <option value="">Choisissez un fournisseur</option>
                {fournisseurs.map((fournisseur) => (
                  <option key={fournisseur.fournisseur_id} value={fournisseur.nom}>
                    {fournisseur.nom}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group row mb-3">
            <label className="col-sm-3 col-form-label">Type du matériel:</label>
            <div className="col-sm-9">
              <select
                className="form-control"
                value={selectedMaterialType}
                onChange={(e) => setSelectedMaterialType(e.target.value)}
              >
                <option value="">Choisissez un type</option>
                {materialTypes.map((type) => (
                  <option key={type.type_materiel_id} value={type.type_materiel_id}>
                    {type.libelle}
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
                        disabled={!selectedMaterialType}
                      >
                        <option value="">Choisissez un matériel</option>
                        {materials.map((material) => (
                          <option key={material.id_materiel} value={material.id_materiel}>
                            {material.libelle}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => handleQuantityChange(index, tableRows[index].quantity - 1)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="form-control mx-2"
                          value={row.quantity}
                          onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                          min="1"
                        />
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => handleQuantityChange(index, tableRows[index].quantity + 1)}
                        >
                          +
                        </button>
                      </div>
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
            <button className="btn btn-primary" style={styles.submitButton} onClick={handleSubmit}>
              Soumettre
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
    maxWidth: '700px',
  },
  cardTitle: {
    textAlign: 'center',
  },
  tableContainer: {
    marginBottom: '20px',
  },
  buttonContainer: {
    marginTop: '20px',
  },
  cancelButton: {
    marginRight: '10px',
  },
  submitButton: {
    marginLeft: '10px',
  },
};

export default FormulaireDemandeAchat;
