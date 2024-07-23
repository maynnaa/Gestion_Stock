import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';

function DefaultExample() {
  const items = [
    { id: 1,creationDate: '2024-07-01' },
    { id: 2,creationDate: '2024-07-02' },
    { id: 3, creationDate: '2024-07-03' },
    { id: 4, creationDate: '2024-07-04' },
    { id: 4, creationDate: '2024-07-04' },
    { id: 4, creationDate: '2024-07-04' },
    { id: 4, creationDate: '2024-07-04' },
    { id: 4, creationDate: '2024-07-04' },
    { id: 4, creationDate: '2024-07-04' },
    { id: 5, creationDate: '2024-07-05' }
  ];

  return (
    <div className="scrollable-list">
      <ListGroup>
        {items.map(item => (
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
