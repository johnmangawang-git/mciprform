
import React from 'react';
import styles from './Topbar.module.css';

const Topbar: React.FC = () => {
  return (
    <div className={styles.topbar}>
      <div className={styles.searchBar}>
        <input type="text" placeholder="Search..." />
      </div>
      <div className={styles.userMenu}>
        <span>John Doe</span>
        <button>Logout</button>
      </div>
    </div>
  );
};

export default Topbar;
