import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageWithSidebar from './pages/chef_de_service/Formualire_chefService';
import LoginPage from './pages/login';
import HistoriquePage  from './pages/chef_de_service/historique_chefService';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/formulaire" element={<PageWithSidebar />} />
          <Route path="/historique" element={<HistoriquePage />} />

          <Route path="/" element={<LoginPage />} /> {/* la  route par défaut */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;