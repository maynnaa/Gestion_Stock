import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageWithSidebar from './pages/chef_de_service/Formualire_chefService';
import LoginPage from './pages/login';
import HistoriquePage  from './pages/chef_de_service/historique_chefService';
import './App.css';
import StockChefService from './pages/chef_de_service/stock_chefService';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/formulaire" element={<PageWithSidebar />} />
<<<<<<< HEAD
          <Route path="/historique" element={<HistoriquePage />} />

          <Route path="/" element={<LoginPage />} /> {/* la  route par défaut */}
||||||| a0d02bf
          <Route path="/" element={<LoginPage />} /> {/* la  route par défaut */}
=======
          <Route path="/" element={<LoginPage />} /> 
          <Route path='/stock' element={<StockChefService/>} />
>>>>>>> 9ef07fa742114099cec4136bf20646822b87ad3d
        </Routes>
      </div>
    </Router>
  );
}

export default App;