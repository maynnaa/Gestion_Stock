import DefaultExample from "../../components/historique";
import React from 'react';
import Sidebar from "../../layout/sidebar";
import NavBar from "../../components/navbar";

const styles = {
  pageContainer: {
    display: 'grid',
    gridTemplateColumns: '0px 1fr', 
    gridTemplateRows: '60px 1fr', 
    height: '100vh',
  },
  sidebar: {
    gridColumn: '1',
    gridRow: '2',
    overflowY: 'auto',
  },
  contentContainer: {
    gridColumn: '2',
    gridRow: '2',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px', 
    overflowY: 'auto',
  },
  navBar: {
    gridColumn: '1 / span 2',
  },
};

const HistoriquePage = () => {
  return (
    <div style={styles.pageContainer}>
      <NavBar style={styles.navBar} />
      <Sidebar style={styles.sidebar} />
      <div style={styles.contentContainer}>
        <DefaultExample />
      </div>
    </div>
  );
};

export default HistoriquePage;
