import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';

function DefaultExample({ searchTerm }) {
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

  const filteredItems = items.filter(item => 
    item.creationDate.includes(searchTerm)
  );

  return (
    <div className="scrollable-list">
      <ListGroup>
        {filteredItems.map(item => (
          <ListGroup.Item key={item.id}>
            <div className="d-flex justify-content-between">
              <div><strong>ID:</strong> {item.id}</div>
              <div><strong>Date de création:</strong> {item.creationDate}</div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default DefaultExample;
