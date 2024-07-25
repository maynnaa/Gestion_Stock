import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { FaArrowRight } from 'react-icons/fa'; // Importation de l'icône pour la redirection
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'; // Importation pour la redirection

function DemandeAchat({ searchTerm }) {
  const items = [
    { id: 1, creationDate: '01/07/2024' },
    { id: 2, creationDate: '02/07/2024' },
    { id: 3, creationDate: '03/07/2024' },
    { id: 4, creationDate: '04/07/2024' },
    { id: 5, creationDate: '05/06/2024' },
    { id: 6, creationDate: '06/06/2024' },
    { id: 7, creationDate: '07/06/2024' },
    { id: 8, creationDate: '08/03/2024' },
    { id: 9, creationDate: '09/02/2024' },
    { id: 10, creationDate: '10/01/2024' },
  ];

  const navigate = useNavigate(); // Hook pour la redirection

  const filteredItems = items.filter(item => 
    item.creationDate.includes(searchTerm)
  );

  const handleRedirect = (id) => {
    // Redirection vers la page de la demande spécifique
    navigate(`/demande`);
  };

  return (
    <div className="scrollable-list">
      <ListGroup>
        {filteredItems.map(item => (
          <ListGroup.Item key={item.id}>
            <div className="d-flex justify-content-between align-items-center">
              <div><strong>Demande d'achat N°{item.id}</strong></div>
              <div className="d-flex align-items-center">
                <div><strong>Date de création:</strong> {item.creationDate}</div>
                <button onClick={() => handleRedirect(item.id)} className="btn btn-link ml-3">
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default DemandeAchat;
