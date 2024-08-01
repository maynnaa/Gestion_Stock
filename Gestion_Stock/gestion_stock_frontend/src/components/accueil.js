import React from 'react';
import styled, { keyframes } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import stockImage from '../assets/stock.jpg'; // Adjust the path if necessary

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

const Title = styled.h1`
  animation: ${fadeInDown} 1s ease-out;
`;

const Image = styled.img`
  animation: ${zoomIn} 1s ease-out;
  max-width: 100%;
`;

const Text = styled.p`
  animation: ${fadeInUp} 1s ease-out;
`;

const Accueil = () => {
  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0">
        <div className="card-body">
          <Title className="card-title text-center mb-4">
            Ministère de l’Agriculture, de la Pêche Maritime, du Développement Rural et des Eaux et Forêts
          </Title>
          <div className="row align-items-center">
            <div className="col-md-6 text-center">
              <Image
                src={stockImage}
                alt="Stock"
                className="img-fluid rounded"
              />
            </div>
            <div className="col-md-6 mt-4 mt-md-0">
              <Text className="lead text-justify">
                Bienvenue dans l'application officielle de gestion des stocks de votre ministère. Cette plateforme a été conçue pour vous offrir un outil performant et sécurisé pour le suivi et la gestion des ressources. 
                Cet outil facilitera la gestion efficace et transparente des stocks, contribuant ainsi à l'amélioration de vos services et à la réalisation de vos objectifs stratégiques.
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accueil;
