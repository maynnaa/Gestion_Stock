import React from 'react';
import styled, { keyframes } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import stockImage from '../assets/stock.jpg'; // Ajustez le chemin si nécessaire

// Animations
const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const zoomIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled components
const Title = styled.h1`
  animation: ${fadeInDown} 1s ease-out;
  font-size: 2.5rem;
  color: #004d40;
  text-align: center;
  margin-bottom: 20px;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`;

const Image = styled.img`
  animation: ${zoomIn} 1s ease-out;
  max-width: 80%;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

const Text = styled.p`
  animation: ${fadeInUp} 1s ease-out;
  font-size: 1.15rem;
  line-height: 1.7;
  color: #333;
  text-align: justify;
  margin-top: 20px;
`;

const Container = styled.div`
  margin-top: 30px;
  padding: 20px;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 30px;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const Column = styled.div`
  flex: 1;
  min-width: 300px;
  margin: 20px;
  display: flex;
  justify-content: center;
`;

const Accueil = () => {
  return (
    <Container className="container">
      <Card className="card">
        <Title>Ministère de l’Agriculture, de la Pêche Maritime, du Développement Rural et des Eaux et Forêts</Title>
        <Row>
          <Column>
            <Image
              src={stockImage}
              alt="Stock de matériel informatique"
              className="img-fluid"
            />
          </Column>
          <Column>
            <Text>
              Nous sommes heureux de vous présenter notre outil officiel dédié à la gestion des stocks de matériel informatique. Cette plateforme a été conçue pour assurer un suivi efficace et sécurisé des équipements informatiques au sein du ministère.
              <br /><br />
              Grâce à cet outil, vous pourrez :
              <ul>
                <li>Suivre en temps réel l'état des stocks et des inventaires.</li>
                <li>Optimiser la gestion et la distribution des ressources matérielles.</li>
                <li>Garantir une transparence et une efficacité accrues dans la gestion des équipements technologiques.</li>
              </ul>
              En associant innovation et modernité à la gestion des ressources, nous soutenons les objectifs stratégiques de votre ministère en matière de développement durable et d'efficacité opérationnelle.
            </Text>
          </Column>
        </Row>
      </Card>
    </Container>
  );
};

export default Accueil;
