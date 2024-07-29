import React from 'react';

const Sidebar = () => {
  return (
    <div style={styles.sidebar}>
      <div style={styles.logo}>
        <img src="/MAPDEF_logo.png" alt="logo" style={styles.logoImage} />
      </div>
    </div>
  );
};

const styles = {
  sidebar: {
    height: '100vh',
    width: '250px',
    backgroundColor: '#ABEDDD',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px',
    boxSizing: 'border-box',
  },
  logo: {
    marginBottom: '20px',
    fontSize: '50px',
    fontWeight: 'bold',
  },
  logoImage: {
    width: '200px',
    height: 'auto',
  },
};

export default Sidebar;
