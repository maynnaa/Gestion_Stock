import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageWithSidebar from './pages/sidebar';
import LoginPage from './pages/login';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sidebar" element={<PageWithSidebar />} />
          <Route path="/" element={<LoginPage />} /> {/* la  route par défaut */}
        </Routes>
      </div>
    </Router>
  );
}

export default App; 
