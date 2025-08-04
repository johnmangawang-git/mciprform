
import React from 'react';
import Layout from '../layout/Layout';
import styles from './Dashboard.module.css';

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <div className={styles.dashboard}>
        <h1>Dashboard</h1>
        <div className={styles.widgets}>
          <div className={styles.widget}>
            <h2>Total Orders</h2>
            <p>150</p>
          </div>
          <div className={styles.widget}>
            <h2>Pending Orders</h2>
            <p>25</p>
          </div>
          <div className={styles.widget}>
            <h2>Completed Orders</h2>
            <p>125</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
