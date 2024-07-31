import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get('http://localhost:9091/api/personnel/login', {
        params: {
          email: email,
          password: password
        }
      });
      setMessage(response.data); // Affiche le message de succès
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data); // Affiche le message d'erreur
      } else {
        setMessage('Erreur de connexion');
      }
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
      <div className="card p-5" style={{ maxWidth: '600px', width: '100%' }}>
        <h2 className="text-center mb-4">Authentification</h2>
        <div className="text-center mb-4">
          <img src="/MAPDEF_logo.png" alt="Logo" style={{ width: '200px' }} />
        </div>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              className="form-control" 
              id="email" 
              placeholder="Email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input 
              type="password" 
              className="form-control" 
              id="password" 
              placeholder="Mot de passe" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-3">Se connecter</button>
        </form>
        {message && <div className="mt-3 text-center">{message}</div>}
      </div>
    </div>
  );
};

export default Login;
