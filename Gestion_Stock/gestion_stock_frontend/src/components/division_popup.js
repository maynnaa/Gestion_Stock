import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function DivisionPopup({ showModal, handleCloseModal, notification, id }) {
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [fonctionId, setFonctionId] = useState(null);
  const [idPersonnel, setIdPersonnel] = useState(null);
  const [loading, setLoading] = useState(true); // Ajout d'un état pour le chargement

  useEffect(() => {
    if (notification && notification.formulaireBesoins) {
      const fetchSelectedArticles = async () => {
        try {
          const response = await axios.get(`/api/formulaireMateriel/formulaire/${notification.formulaireBesoins.id_formulaire}`);
          console.log('Articles sélectionnés:', response.data);
          setSelectedArticles(response.data);
        } catch (error) {
          console.error('Erreur lors de la récupération des articles:', error);
          setSelectedArticles([]);
        }
      };

      fetchSelectedArticles();
    }
  }, [notification]);

  useEffect(() => {
    const fetchFonctionId = async () => {
      try {
        const response = await axios.get(`/api/personnel/${id}/fonction`);
        console.log('ID Fonction:', response.data);
        setFonctionId(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'ID Fonction:', error);
      } finally {
        setLoading(false); // Marquer le chargement comme terminé
      }
    };

    if (id) {
      fetchFonctionId();
    }
  }, [id]);

  useEffect(() => {
    if (notification && notification.formulaireBesoins) {
      const personnel = notification.formulaireBesoins.personnel;
      if (personnel && personnel.id_personnel) {
        setIdPersonnel(personnel.id_personnel);
      }
    }
  }, [notification]);

  const handleReject = async () => {
    const idFormulaire = notification?.formulaireBesoins?.id_formulaire;

    console.log('ID Formulaire:', idFormulaire);
    console.log('ID Personnel:', idPersonnel);

    if (!idFormulaire || !idPersonnel) {
      console.error('ID Formulaire ou ID Personnel manquant');
      return;
    }

    if (fonctionId === 1 || fonctionId === 2) {
      try {
        const notificationData = {
          is_seen: 0,
          type: 'reponse',
          formulaireBesoins: {
            id_formulaire: idFormulaire
          },
          personnel: {
            id_personnel: idPersonnel
          }
        };
        console.log('Données envoyées pour la notification:', notificationData);

        await axios.post('/api/notification', notificationData);

        await axios.put(`/api/formulaireBesoins/${idFormulaire}`, {
          validation: 'refusée'
        });

        console.log('Demande rejetée et notification créée');
      } catch (error) {
        console.error('Erreur lors du rejet de la demande:', error);
      }
    } else {
      console.log('Action non autorisée pour cette fonction');
    }

    handleCloseModal();
  };

  const handleApprove = async () => {
    const idFormulaire = notification?.formulaireBesoins?.id_formulaire;
  
    console.log('ID Formulaire:', idFormulaire);
  
    if (!idFormulaire) {
      console.error('ID Formulaire manquant');
      return;
    }
  
    try {
      if (fonctionId === 1) {
        const notificationData1 = {
          is_seen: 0,
          type: 'reponse',
          formulaireBesoins: {
            id_formulaire: idFormulaire
          },
          personnel: {
            id_personnel: idPersonnel
          }
        };
        console.log('Données envoyées pour la première notification:', notificationData1);
  
        await axios.post('/api/notification', notificationData1);
  
        await axios.put(`/api/formulaireBesoins/${idFormulaire}`, {
          validation: 'Approbation du directeur'
        });
  
        const notificationData2 = {
          is_seen: 0,
          type: 'Demande de besoins',
          formulaireBesoins: {
            id_formulaire: idFormulaire
          },
          personnel: {
            id_personnel: 14
          }
        };
        console.log('Données envoyées pour la deuxième notification:', notificationData2);
  
        await axios.post('/api/notification', notificationData2);
  
        console.log('Approbation du directeur enregistrée et notifications créées');
      } else if (fonctionId === 2) {
        const notificationData = {
          is_seen: 0,
          type: 'Demande de besoins',
          formulaireBesoins: {
            id_formulaire: idFormulaire
          },
          personnel: {
            id_personnel: 15
          }
        };
        console.log('Données envoyées pour la notification:', notificationData);
  
        await axios.post('/api/notification', notificationData);
  
        await axios.put(`/api/formulaireBesoins/${idFormulaire}`, {
          validation: 'Premiere validation'
        });
  
        console.log('Demande approuvée et notification créée');
      } else {
        console.log('Action non autorisée pour cette fonction');
      }
    } catch (error) {
      console.error('Erreur lors de l\'approbation de la demande:', error);
    }
  
    handleCloseModal();
  };
  
  if (loading) {
    return null; // N'affiche rien tant que les données ne sont pas chargées
  }

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Détail de la demande de besoins</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Demande de besoin N°:</strong> {notification.formulaireBesoins.id_formulaire}</p>
        <p><strong>Date de création:</strong> {new Date(notification.formulaireBesoins.date_creation).toLocaleDateString()}</p>
        <p><strong>Validation:</strong> {notification.formulaireBesoins.validation}</p>

        <Table responsive="xl" className="text-center">
          <thead>
            <tr>
              <th>Matériel</th>
              <th>Quantité</th>
              <th>Bénéficiaire</th>
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
      </Modal.Body>
      <Modal.Footer>
        {fonctionId !== 4 && notification.type !== 'reponse' && (
          <>
            <Button variant="danger" onClick={handleReject}>
              Rejeter
            </Button>
            <Button variant="success" onClick={handleApprove}>
              Approuver
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default DivisionPopup;
