import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageWithSidebar from './pages/chef_de_service/Formualire_chefService';
import LoginPage from './pages/login';
import './App.css';
import StockChefService from './pages/chef_de_service/stock_chefService';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/formulaire" element={<PageWithSidebar />} />
          <Route path="/" element={<LoginPage />} /> 
          <Route path='/stock' element={<StockChefService/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;