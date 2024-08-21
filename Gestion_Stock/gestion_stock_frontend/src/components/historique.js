import React, { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FaArrowRight } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, FormControl } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';

function DefaultExample({ searchTerm = '' }) {
  const [formulaireBesoins, setFormulaireBesoins] = useState([]);
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchDate, setSearchDate] = useState(searchTerm); // État pour la recherche par date
  const { id_personnel } = useParams();

  useEffect(() => {
    const fetchFormulaireBesoins = async () => {
      if (!id_personnel) {
        console.error('No id_personnel provided');
        return;
      }

      try {
        const response = await axios.get(`/api/formulaireBesoins/user/${id_personnel}`);
        console.log('FormulaireBesoins response:', response);

        if (Array.isArray(response.data)) {
          setFormulaireBesoins(response.data);
        } else {
          console.error('Expected an array but got:', response.data);
          setFormulaireBesoins([]);
        }
      } catch (error) {
        console.error('Error fetching formulaireBesoins data:', error);
        setFormulaireBesoins([]);
      }
    };

    fetchFormulaireBesoins();
  }, [id_personnel]);

  useEffect(() => {
    if (selectedItem) {
      const fetchSelectedArticles = async () => {
        try {
          const response = await axios.get(`/api/formulaireMateriel/formulaire/${selectedItem.id_formulaire}`);
          console.log('Selected Articles:', response.data);
          setSelectedArticles(response.data);
        } catch (error) {
          console.error('Error fetching selected articles:', error);
          setSelectedArticles([]);
        }
      };

      fetchSelectedArticles();
    }
  }, [selectedItem]);

  // Filtrage par date
  const filteredItems = formulaireBesoins.filter(item => {
    if (!searchDate) return true;
    const itemDate = new Date(item.date_creation).toISOString().split('T')[0];
    return itemDate === searchDate;
  });

  const handleShowModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy');
  };

  return (
    <div style={{ overflowY: 'auto' }}>
      <FormControl
        type="date"
        value={searchDate}
        onChange={e => setSearchDate(e.target.value)}
        placeholder="Rechercher par date"
        className="mb-3"
        style={{ width: '40%', margin: '0 auto' }} 
        title="Rechercher par date" 
      />
      <div style={{ width: '100%', maxWidth: '750px', margin: '0 auto' }}>
        <ListGroup>
          {filteredItems.map(item => (
            <ListGroup.Item key={item.id_formulaire}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div><strong>Demande de besoin N°{item.id_formulaire}</strong></div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div><strong>Date de création:</strong> {formatDate(item.date_creation)}</div>
                  <Button 
                    onClick={() => handleShowModal(item)} 
                    style={{ background: 'none', border: 'none', padding: '0', marginLeft: '1rem' }} 
                  >
                    <FaArrowRight style={{ color: 'blue' }} />
                  </Button>
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>

      {/* Modal for displaying item details */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Détail de la demande de besoins</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem ? (
            <div>
              <p><strong>Demande de besoin N°:</strong> {selectedItem.id_formulaire}</p>
              <p><strong>Date de création:</strong> {formatDate(selectedItem.date_creation)}</p>
              <p><strong>Validation:</strong> {selectedItem.validation}</p>

              <Table responsive="xl" className="text-center">
                <thead>
                  <tr>
                    <th>Matériel</th>
                    <th>Quantité</th>
                    <th>Beneficiaire</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedArticles.map(article => (
                    <tr key={article.id}>
                      <td>{article.materiel.libelle}</td>
                      <td>{article.quantite}</td>
                      <td>{article.personnel.nom_complet}</td> 
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <p>Aucun détail disponible</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DefaultExample;
