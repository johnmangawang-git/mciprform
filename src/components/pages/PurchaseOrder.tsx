import React, { useState } from 'react';
import Layout from '../layout/Layout';
import PoTable from '../../components/PoTable';
import Button from '../ui/Button';
import styles from './PurchaseOrder.module.css';

interface PoItem {
  id: number;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
}

const PurchaseOrder: React.FC = () => {
  const [items, setItems] = useState<PoItem[]>([]);

  const handleAddItem = () => {
    // Logic to add a new item
  };

  return (
    <Layout>
      <div className={styles.purchaseOrder}>
        <h1>Create Purchase Order</h1>
        <div className={styles.actions}>
          <Button onClick={handleAddItem} primary>
            Add Item
          </Button>
        </div>
        <PoTable items={items} setItems={setItems} lookupData={{}} />
      </div>
    </Layout>
  );
};

export default PurchaseOrder;