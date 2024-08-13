import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const generateRandomCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

const FormulaireDivisionn = () => {
  const { id_personnel } = useParams();
  const [ppr, setPpr] = useState(generateRandomCode());
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [materialTypes, setMaterialTypes] = useState([]);
  const [selectedMaterialType, setSelectedMaterialType] = useState('');
  const [materials, setMaterials] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  useEffect(() => {
    const fetchPersonnelData = async () => {
      try {
        const response = await fetch(`/api/personnel/${id_personnel}`);
        if (!response.ok) throw new Error('Échec du chargement des données du personnel');
        const data = await response.json();
        setPpr(data.ppr);
        setSelectedService(data.entite.libelle);

        const divisionResponse = await fetch(`/api/entite/${data.entite.entite_parent_id}`);
        if (!divisionResponse.ok) throw new Error('Échec du chargement des données de la division');
        const divisionData = await divisionResponse.json();
        setSelectedDivision(divisionData.libelle);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        setAlertMessage('Erreur lors du chargement des données');
        setAlertType('danger');
      }
    };

    const fetchMaterialTypes = async () => {
      try {
        const response = await fetch('/api/type-materiel');
        if (!response.ok) throw new Error('Échec du chargement des types de matériel');
        const data = await response.json();
        setMaterialTypes(data);
      } catch (error) {
        console.error('Erreur lors du chargement des types de matériel:', error);
        setAlertMessage('Erreur lors du chargement des types de matériel');
        setAlertType('danger');
      }
    };

    const fetchBeneficiaries = async () => {
      try {
        const response = await fetch('/api/personnel');
        if (!response.ok) throw new Error('Échec du chargement des bénéficiaires');
        const data = await response.json();
        setBeneficiaries(data);
      } catch (error) {
        console.error('Erreur lors du chargement des bénéficiaires:', error);
        setAlertMessage('Erreur lors du chargement des bénéficiaires');
        setAlertType('danger');
      }
    };

    fetchPersonnelData();
    fetchMaterialTypes();
    fetchBeneficiaries();
  }, [id_personnel]);

  useEffect(() => {
    const fetchMaterials = async () => {
      if (!selectedMaterialType) return;

      try {
        const response = await fetch(`/api/materiel?type=${selectedMaterialType}`);
        if (!response.ok) throw new Error('Échec du chargement des matériels');
        const data = await response.json();
        setMaterials(data);
      } catch (error) {
        console.error('Erreur lors du chargement des matériels:', error);
        setAlertMessage('Erreur lors du chargement des matériels');
        setAlertType('danger');
      }
    };

    fetchMaterials();
  }, [selectedMaterialType]);

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage('');
        setAlertType('');
      }, 3000); // 3 seconds

      return () => clearTimeout(timer); // Cleanup the timer if the component unmounts or message changes
    }
  }, [alertMessage]);

  const addRow = () => {
    setTableRows([...tableRows, { material: '', quantity: 1, id_personnel: '' }]);
  };

  const removeRow = (index) => {
    setTableRows(tableRows.filter((_, i) => i !== index));
  };

  const handleRowChange = (index, field, value) => {
    const newTableRows = [...tableRows];
    newTableRows[index][field] = value;
    setTableRows(newTableRows);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Préparer les données à envoyer
    const formData = {
      ppr,
      selectedDivision,
      selectedService,
      personnel: { id_personnel },
      date_creation: new Date().toISOString().split('T')[0],
      validation: 'en cours',
    };

    try {
      // Soumettre FormulaireBesoins
      const response = await fetch('/api/formulaireBesoins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Échec de la soumission du formulaire');
      }

      const formBesoinsData = await response.json();
      const formulaireBesoins = formBesoinsData.id_formulaire; // Correctly retrieve formulaire ID

      // Soumettre chaque FormulaireMateriel
      const materialRequests = tableRows.map((row) => {
        const materialData = {
          formulaireBesoins, // Correct formulaire ID
          materiel: row.material,
          id_personnel: row.beneficiary,
          quantite: row.quantity,
        };
        return fetch('/api/formulaireMateriel', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(materialData),
        });
      });

      await Promise.all(materialRequests);

      // Gérer la soumission réussie
      setAlertMessage('Formulaire soumis avec succès');
      setAlertType('success');

      // Reset only the material type and table entries
      setSelectedMaterialType('');
      setMaterials([]);
      setTableRows([]);
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire:', error);
      setAlertMessage('Échec de la soumission du formulaire');
      setAlertType('danger');
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      {alertMessage && (
        <div className={`alert alert-${alertType} mt-3`} role="alert" style={styles.alert}>
          {alertMessage}
        </div>
      )}
      <div className="card shadow-sm" style={styles.card}>
        <div className="card-body">
          <h5 className="card-title mb-3" style={styles.cardTitle}>Formulaire De Besoin</h5>

          <form onSubmit={handleSubmit}>
            <div className="form-group row mb-3">
              <label className="col-sm-3 col-form-label">PPR:</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" value={ppr} readOnly />
              </div>
            </div>

            <div className="form-group row mb-3">
              <label className="col-sm-3 col-form-label">Division:</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" value={selectedDivision} readOnly />
              </div>
            </div>

            <div className="form-group row mb-3">
              <label className="col-sm-3 col-form-label">Service:</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" value={selectedService} readOnly />
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
              <button className="btn btn-secondary" type="button" onClick={addRow}>Ajouter un bénéficiaire</button>
            </div>

            <div style={styles.tableContainer}>
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
                          <option value="">Choisissez un bénéficiaire</option>
                          {beneficiaries.map((beneficiary) => (
                            <option key={beneficiary.id_personnel} value={beneficiary.id_personnel}>
                              {beneficiary.nom_complet}
                            </option>
                          ))}
                        </select>
                      </td>
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
                        <input
                          type="number"
                          className="form-control"
                          value={row.quantity}
                          onChange={(e) => handleRowChange(index, 'quantity', e.target.value)}
                          min="1"
                        />
                      </td>
                      <td>
                        <button className="btn btn-danger" type="button" onClick={() => removeRow(index)}>🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-center" style={styles.buttonContainer}>
              <button className="btn btn-secondary" type="button" style={styles.cancelButton} onClick={() => window.location.reload()}>
                Annuler
              </button>
              <button type="submit" className="btn btn-primary">Enregistrer</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    width: '100%',
    maxWidth: '700px',
    minWidth: '600px',
    height: '70%',
    maxHeight: '',
    overflowY: 'auto',
    borderRadius: '10px',
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontFamily: 'Arial, sans-serif',
    fontSize: '1.5rem',
    color: '#333',
  },
  tableContainer: {
    maxHeight: '200px',
    overflowY: 'auto',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  cancelButton: {
    marginRight: '10px',
  },
  alert: {
    width: '80%',
    maxWidth: '800px',
    marginBottom: '20px',
  },
};

export default FormulaireDivisionn;
