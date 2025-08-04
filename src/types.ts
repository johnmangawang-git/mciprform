export interface PoItem {
  id: number;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
}

export interface LookupEntry {
  description: string;
  uom: string;
}

export interface LookupData {
  [itemCode: string]: LookupEntry;
}

export interface OrderHistoryEntry {
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string; // e.g., 'Pending', 'Delivered'
}
