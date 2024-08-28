import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ScrollableTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const materialResponse = await axios.get('http://localhost:9091/api/materiel');
        const productResponse = await axios.get('http://localhost:9091/api/produit');

        console.log("Données des matériaux :", materialResponse.data);
        console.log("Données des produits :", productResponse.data);

        // Filtrer les produits dont la disponibilité est 'disponible'
        const availableProducts = productResponse.data.filter(product => product.disponibilite === 'disponible');

        const materialQuantityMap = availableProducts.reduce((acc, product) => {
          console.log("Produit disponible :", product);  // Ajouté pour déboguer
          const materialId = product.materiel?.id_materiel; // Vérifiez le chemin d'accès
          if (materialId !== undefined) {
            acc[materialId] = (acc[materialId] || 0) + 1;
          }
          return acc;
        }, {});

        console.log("Mappage des quantités par ID matériel :", materialQuantityMap);

        const aggregatedData = materialResponse.data.map(material => ({
          nom: material.libelle,
          quantite: materialQuantityMap[material.id_materiel] || 0
        }));

        console.log("Données agrégées :", aggregatedData);

        setData(aggregatedData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4" >
      <div className="table-responsive" style={styles.tableWrapper}>
        <table className="table table-bordered">
          <thead>
            <tr className="text-center" >
              <th>Nom</th>
              <th>Quantité</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data.map((item, index) => (
              <tr key={index}>
                <td style={{ color: '#002e63'}}>{item.nom}</td>
                <td style={{ color: item.quantite > 0 ? 'lightseagreen' : 'red' }}>
                <strong>{item.quantite > 0 ? 'En stock' : 'En rupture de stock'}</strong>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


const styles = {
  tableWrapper: {
    maxWidth: '800px',
    margin: '0 auto',
    height: '800px',
    overflowY: 'auto',
    scrollbarWidth: 'thin',
  },
};

const customScrollbarStyles = `
  .table-responsive::-webkit-scrollbar {
    width: 8px;
  }

  .table-responsive::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  .table-responsive::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  .table-responsive::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = customScrollbarStyles;
document.head.appendChild(styleSheet);

export default ScrollableTable;
