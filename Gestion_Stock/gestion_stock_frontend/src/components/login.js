import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
      <div className="card p-5" style={{ maxWidth: '600px', width: '100%' }}>
        <h2 className="text-center mb-4">Authentification</h2>
        <div className="text-center mb-4">
          <img src="/MAPDEF_logo.png" alt="Logo" style={{ width: '200px' }} />
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="email"></label>
            <input 
              type="email" 
              className="form-control" 
              id="email" 
              placeholder="Email" 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password"></label>
            <input 
              type="password" 
              className="form-control" 
              id="password" 
              placeholder="Mot de passe" 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-3">Se connecter</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
