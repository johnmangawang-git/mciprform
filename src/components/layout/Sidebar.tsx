
import React from 'react';
import styles from './Sidebar.module.css';

const Sidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>MCI</div>
      <nav className={styles.nav}>
        <a href="#" className={styles.navLink}>Dashboard</a>
        <a href="#" className={styles.navLink}>Create PO</a>
        <a href="#" className={styles.navLink}>Order History</a>
        <a href="#" className={styles.navLink}>Admin</a>
      </nav>
    </div>
  );
};

export default Sidebar;
