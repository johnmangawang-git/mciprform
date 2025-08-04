import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import OrderHistoryTable from '../ui/OrderHistoryTable';
import styles from './OrderHistory.module.css';
import type { OrderHistoryEntry } from '../../types';

const OrderHistory: React.FC = () => {

  return (
    <Layout>
      <div className={styles.orderHistory}>
        <h1>Order History</h1>
        <OrderHistoryTable />
      </div>
    </Layout>
  );
};

export default OrderHistory;