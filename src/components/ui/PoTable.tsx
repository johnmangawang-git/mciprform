
import React from 'react';
import styles from './PoTable.module.css';

const PoTable: React.FC = () => {
  return (
    <div className={styles.poTable}>
      <table>
        <thead>
          <tr>
            <th>Item Code</th>
            <th>Description</th>
            <th>UOM</th>
            <th>Supplier</th>
            <th>Unit Price</th>
            <th>Quantity</th>
            <th>Amount</th>
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

export default PoTable;
