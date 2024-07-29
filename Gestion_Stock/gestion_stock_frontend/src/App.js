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
import AffectationMateriel from './pages/magasinier/affectation_materiel';




function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/formulaire" element={<PageWithSidebar />} />
          <Route path="/" element={<LoginPage />} /> 
          <Route path='/stock' element={<StockChefService/>} />
          <Route path="/historique" element={<HistoriquePage />} />
          <Route path="/formulaireDivision" element={<FormulaireDivision />} />
          <Route path="/historiqueDivision" element={<HistoriqueDivision />} />
          <Route path="/demandesRecues" element={<DemandesRecues />} />
          <Route path="/demande" element={<TestPage />} />
          <Route path='/stockDivision' element={<StockDivision />} />
          <Route path='/stockDivision' element={< StockDivision/>} />
          <Route path='/stockDivision' element={< StockDivision/>} />
          <Route path='/stockDirecteur' element={< StockDirecteur/>} />
          <Route path="/demandesRecuesDirecteur" element={<DemandesRecuesDirecteur />} />
          <Route path="/demandeAchat" element={<FormDemandeAchat/>} />
          <Route path="/historiqueDemandeAchat" element={<HistoriqueDemandeAchat />} />
          <Route path="/historiqueBesoinsMagasinier" element={<HistoriqueBesoins />} />
          <Route path="/stockMagasinier" element={<GestionStockMagasinier />} />
          <Route path="/gestionFournisseur" element={<GestionFournisseur />} />
          <Route path="/affectationMateriel" element={<AffectationMateriel />} />












        </Routes>
      </div>
    </Router>
  );
}

export default App;
