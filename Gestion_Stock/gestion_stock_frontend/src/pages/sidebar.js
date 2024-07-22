import React from 'react';
import Sidebar from '../layout/sidebar';
import Formulaire from '../components/formulaire'; // Importez le composant Formulaire

const PageWithSidebar = () => {
  return (
    <div style={styles.page}>
      <Sidebar />
      <div style={styles.content}> 
        <Formulaire /> 
      </div>
    </div>
  );
};

const styles = {
  page: {
    display: 'flex',
  },
  content: {
    flex: 1,
    padding: '20px',
  },
};

export default PageWithSidebar;
