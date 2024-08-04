import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const FormulaireDemandeAchat = () => {
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
        console.log('Fournisseurs fetched:', response.data);
        setFournisseurs(response.data);

        // Create fournisseur mapping
        const mapping = response.data.reduce((acc, fournisseur) => {
          acc[fournisseur.nom] = fournisseur.fournisseur_id;
          return acc;
        }, {});
        setFournisseurMapping(mapping);
      })
      .catch(error => console.error('Error fetching fournisseurs:', error));

    axios.get('http://localhost:9091/api/type-materiel')
      .then(response => {
        console.log('Material types fetched:', response.data);
        setMaterialTypes(response.data);
      })
      .catch(error => console.error('Error fetching material types:', error));
  }, []);

  useEffect(() => {
    if (selectedMaterialType) {
      axios.get(`http://localhost:9091/api/materiel?typeMaterielId=${selectedMaterialType}`)
        .then(response => {
          console.log('Materials fetched:', response.data);
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
        alert('Veuillez sélectionner un fournisseur.');
        return;
      }
  
      const demandeResponse = await axios.post('http://localhost:9091/api/demandeAchat', {
        date_demande: new Date().toISOString(),
        id_personne: 1
      });
  
      const idDemande = demandeResponse.data.id_demande;
      console.log('Demande created with ID:', idDemande);
  
     
      for (let row of tableRows) {
        if (!row.material) {
          console.warn('Skipping row with missing material:', row);
          continue;
        }
  
        console.log('Submitting article with:', {
          quantite: row.quantity,
          demandeAchat: { id_demande: idDemande },
          materiel: { id_materiel: row.material },
          fournisseur_id: selectedFournisseurId 
        });

  
        await axios.post('http://localhost:9091/api/article', {
          quantite: row.quantity,
          demandeAchat: { id_demande: idDemande },
          materiel: { id_materiel: row.material },
          fournisseur: {fournisseur_id: selectedFournisseurId}
        })
        .then(response => {
          console.log('Article submitted successfully:', response.data);
        })
        .catch(error => {
          console.error('Error submitting article:', error);
        });
        
      }
  
      alert('Demande d\'achat enregistrée avec succès');
      resetForm();
    } catch (error) {
      console.error('Error submitting demande d\'achat:', error);
      alert('Une erreur s\'est produite lors de l\'enregistrement de la demande');
    }
  };
  
  
  const handleFournisseurChange = (e) => {
    const fournisseurName = e.target.value;
    const fournisseurId = fournisseurMapping[fournisseurName];
    console.log('Selected fournisseur:', fournisseurName, 'ID:', fournisseurId); // Debugging
    setSelectedFournisseurId(fournisseurId || '');
  };

  const resetForm = () => {
    setSelectedFournisseurId('');
    setSelectedMaterialType('');
    setMaterials([]);
    setTableRows([]);
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
    width: '80%',
    maxWidth: '600px',
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
