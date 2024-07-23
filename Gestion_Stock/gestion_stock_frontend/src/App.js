import logo from './logo.svg';
import './App.css';
import PageWithSidebar from './pages/sidebar';
import LoginPage from './pages/login';

function App() {
  return (
    <div className="App">
      <LoginPage />
      <PageWithSidebar />
      
    </div>
  );
}

export default App;