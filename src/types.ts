export interface PoItem {
  id: number;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  soh: number;
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
  user_id: string;
}

export interface LoggedInUser {
  id: string;
  email: string;
  role: string;
}