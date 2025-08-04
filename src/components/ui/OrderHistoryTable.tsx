
import React from 'react';
import styles from './OrderHistoryTable.module.css';

const OrderHistoryTable: React.FC = () => {
  return (
    <div className={styles.orderHistoryTable}>
      <table>
        <thead>
          <tr>
            <th>PO Number</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Table rows will be dynamically generated here */}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistoryTable;
