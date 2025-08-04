import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import UserManagement from '../ui/UserManagement';
import styles from './Admin.module.css';

const Admin: React.FC = () => {
  return (
    <Layout>
      <div className={styles.admin}>
        <h1>Admin</h1>
        <UserManagement />
      </div>
    </Layout>
  );
};

export default Admin;