import React from 'react';
import Sidebar from '../layout/sidebar';

const PageWithSidebar = () => {
  return (
    <div style={styles.page}>
      <Sidebar />
      <div style={styles.content}>
        {/* Contenu principal de la page */}
        <h1>Contenu de la page </h1>
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
