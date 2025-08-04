
import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import styles from './Layout.module.css';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Topbar />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
