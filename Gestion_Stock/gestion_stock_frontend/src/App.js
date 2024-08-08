import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageWithSidebar from './pages/chef_de_service/Formualire_chefService';
import LoginPage from './pages/login';
import HistoriquePage from './pages/chef_de_service/historique_chefService';
import StockChefService from './pages/chef_de_service/stock_chefService';
import FormulaireDivision from './pages/chef_de_division/Formulaire_chefDivision';
import HistoriqueDivision from './pages/chef_de_division/historique_chefDivision';
import DemandesRecues from './pages/chef_de_division/Demandes_recues';
import StockDivision from './pages/chef_de_division/stock_chefDivision';
import TestPage from './pages/test';
import StockDirecteur from './pages/directeur/stock_Directeur';
import DemandesRecuesDirecteur from './pages/directeur/Demandes_recues_Directeur';
import HistoriqueDemandeAchat from './pages/magasinier/historique_demande_achat';
import HistoriqueBesoins from './pages/magasinier/historique_demandes_besoins';
import FormDemandeAchat from './pages/magasinier/demande_achat';
import GestionStockMagasinier from './pages/magasinier/gestion_stock';
import GestionFournisseur from './pages/magasinier/gestion_fournisseur';
import AccueilDivision from './pages/chef_de_division/accueil_division';
import AccueilService from './pages/chef_de_service/acceuil_service';
import AccueilDirecteur from './pages/directeur/accueil_directeur';
import AccueilMagasinier from './pages/magasinier/accueil_magasinier';

function App() {
  return (
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/formulaire/:id_personnel" element={<PageWithSidebar />} />
            <Route path="/" element={<LoginPage />} />
            <Route path='/stock/:id_personnel' element={<StockChefService />} />
            <Route path="/historique/:id_personnel" element={<HistoriquePage />} />
            <Route path="/formulaireDivision/:id_personnel" element={<FormulaireDivision />} />
            <Route path="/historiqueDivision/:id_personnel" element={<HistoriqueDivision />} />
            <Route path="/demandesRecues/:id_personnel" element={<DemandesRecues />} />
            <Route path="/demande/:id_personnel" element={<TestPage />} />
            <Route path='/stockDivision/:id_personnel' element={<StockDivision />} />
            <Route path='/stockDirecteur/:id_personnel' element={<StockDirecteur />} />
            <Route path="/demandesRecuesDirecteur/:id_personnel" element={<DemandesRecuesDirecteur />} />
            <Route path="/demandeAchat/:id_personnel" element={<FormDemandeAchat />} />
            <Route path="/historiqueDemandeAchat/:id_personnel" element={<HistoriqueDemandeAchat />} />
            <Route path="/historiqueBesoinsMagasinier/:id_personnel" element={<HistoriqueBesoins />} />
            <Route path="/stockMagasinier/:id_personnel" element={<GestionStockMagasinier />} />
            <Route path="/gestionFournisseur/:id_personnel" element={<GestionFournisseur />} />
            <Route path="/accueilDivision/:id_personnel" element={<AccueilDivision />} />
            <Route path="/accueilService/:id_personnel" element={<AccueilService />} />
            <Route path="/accueilDirecteur/:id_personnel" element={<AccueilDirecteur />} />
            <Route path="/accueilMagasinier/:id_personnel" element={<AccueilMagasinier />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
