import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import PageWithSidebar from './pages/chef_de_service/Formualire_chefService';
import LoginPage from './pages/login';
import HistoriquePage from './pages/chef_de_service/historique_chefService';
import StockChefService from './pages/chef_de_service/stock_chefService';
import FormulaireDivision from './pages/chef_de_division/Formulaire_chefDivision';
import HistoriqueDivision from './pages/chef_de_division/historique_chefDivision';
import DemandesRecues from './pages/chef_de_division/Demandes_recues';




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





        </Routes>
      </div>
    </Router>
  );
}

export default App;