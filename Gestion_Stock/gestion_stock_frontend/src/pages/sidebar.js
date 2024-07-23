import React from 'react';
import Sidebar from '../layout/sidebar'; 
import Formulaire from '../components/formulaire'; 
import NavBar from '../components/navbar';

const PageWithSidebar = () => {
  return (
    <div style={styles.page}>
      <Sidebar />
      <div style={styles.content}>
        <NavBar />
        <Formulaire />
      </div>
    </div>
  );
};

const styles = {
  page: {
    display: 'flex',
    height: '100vh', 
  },
  content: {
    flex: 1,
    padding: '20px',
    backgroundColor: '#f8f9fa',
  },
};

export default PageWithSidebar;
