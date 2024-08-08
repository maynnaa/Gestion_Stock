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

  useEffect(() => {
    const fetchPersonnelData = async () => {
      try {
        const response = await fetch(`/api/personnel/${id_personnel}`);
        if (!response.ok) throw new Error('Failed to fetch personnel data');
        const data = await response.json();
        setPpr(data.ppr);
        setSelectedService(data.entite.libelle);

        const divisionResponse = await fetch(`/api/entite/${data.entite.entite_parent_id}`);
        if (!divisionResponse.ok) throw new Error('Failed to fetch division data');
        const divisionData = await divisionResponse.json();
        setSelectedDivision(divisionData.libelle);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchMaterialTypes = async () => {
      try {
        const response = await fetch('/api/type-materiel');
        if (!response.ok) throw new Error('Failed to fetch material types');
        const data = await response.json();
        setMaterialTypes(data);
      } catch (error) {
        console.error('Error fetching material types:', error);
      }
    };

    const fetchBeneficiaries = async () => {
      try {
        const response = await fetch('/api/personnel');
        if (!response.ok) throw new Error('Failed to fetch beneficiaries');
        const data = await response.json();
        setBeneficiaries(data);
      } catch (error) {
        console.error('Error fetching beneficiaries:', error);
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
        if (!response.ok) throw new Error('Failed to fetch materials');
        const data = await response.json();
        setMaterials(data);
      } catch (error) {
        console.error('Error fetching materials:', error);
      }
    };

    fetchMaterials();
  }, [selectedMaterialType]);

  const addRow = () => {
    setTableRows([...tableRows, { material: '', quantity: 1, beneficiary: '' }]); // Initialize beneficiary to ''
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

    const formData = {
      ppr,
      selectedDivision,
      selectedService,
      personnel: { id_personnel },
      date_creation: new Date().toISOString().split('T')[0],
      validation: 'en cours'
    };

    try {
      const response = await fetch('/api/formulaireBesoins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const formBesoinsData = await response.json();
      const formulaireBesoins = formBesoinsData.id_formulaire;

      const materialRequests = tableRows.map(row => {
        const materialData = {
          formulaireBesoins,
          materiel: row.material,
          id_personnel: beneficiaries.find(b => b.id_personnel === row.beneficiary)?.id_personnel,
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

      alert('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <style>
        {`
          ::-webkit-scrollbar {
            width: 8px;
          }
          ::-webkit-scrollbar-thumb {
            background-color: #888;
            border-radius: 4px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
        `}
      </style>
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
              <label className="col-sm-3 col-form-label">Direction:</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" value={selectedDivision} readOnly />
              </div>
            </div>

            <div className="form-group row mb-3">
              <label className="col-sm-3 col-form-label">Division:</label>
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
                          disabled={!beneficiaries}
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
                        <button className="btn btn-danger" type="button" onClick={() => removeRow(index)}>Supprimer</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-end">
              <button className="btn btn-primary" type="submit">Soumettre</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    width: '800px',
    borderRadius: '8px',
    padding: '20px',
    backgroundColor: 'white',
  },
  cardTitle: {
    color: 'black',
    textAlign: 'center',
  },
  tableContainer: {
    maxHeight: '300px',
    overflowY: 'auto',
  },
};

export default FormulaireDivisionn;
