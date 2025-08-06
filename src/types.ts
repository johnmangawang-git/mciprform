export interface PoItem {
  id: number;
  pr_number: string;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  soh: number;
  created_at?: string;
  user_id?: string;
}

export interface LookupEntry {
  description: string;
  uom: string;
}

export interface LookupData {
  [itemCode: string]: LookupEntry;
}

export interface OrderHistoryEntry {
  id?: number;
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string;
  user_id: string;
  created_at?: string;
  total_amount?: number;
  total_items?: number;
}

export interface LoggedInUser {
  id: string;
  email: string;
  role: string;
}

// Database table interfaces for Supabase
export interface DbPoItem {
  id?: number;
  pr_number: string;
  item_code: string;
  description: string;
  uom: string;
  supplier: string;
  unit_price: number;
  quantity: number;
  amount: number;
  soh: number;
  user_id: string;
  created_at?: string;
}

export interface DbOrderHistory {
  id?: number;
  po_number: string;
  date: string;
  time: string;
  status: string;
  user_id: string;
  total_amount: number;
  total_items: number;
  items_data: PoItem[];
  created_at?: string;
}
}

export interface PoItem {
  id: number;
  pr_number: string;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  soh: number;
  created_at?: string;
  user_id?: string;
}

export interface LookupEntry {
  description: string;
  uom: string;
}

export interface LookupData {
  [itemCode: string]: LookupEntry;
}

export interface OrderHistoryEntry {
  id?: number;
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string;
  user_id: string;
  created_at?: string;
  total_amount?: number;
  total_items?: number;
}

export interface LoggedInUser {
  id: string;
  email: string;
  role: string;
}

// Database table interfaces for Supabase
export interface DbPoItem {
  id?: number;
  pr_number: string;
  item_code: string;
  description: string;
  uom: string;
  supplier: string;
  unit_price: number;
  quantity: number;
  amount: number;
  soh: number;
  user_id: string;
  created_at?: string;
}

export interface DbOrderHistory {
  id?: number;
  po_number: string;
  date: string;
  time: string;
  status: string;
  user_id: string;
  total_amount: number;
  total_items: number;
  items_data: PoItem[];
  created_at?: string;
}

export interface PoItem {
  id: number;
  pr_number: string;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  soh: number;
  created_at?: string;
  user_id?: string;
}

export interface LookupEntry {
  description: string;
  uom: string;
}

export interface LookupData {
  [itemCode: string]: LookupEntry;
}

export interface OrderHistoryEntry {
  id?: number;
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string;
  user_id: string;
  created_at?: string;
  total_amount?: number;
  total_items?: number;
}

export interface LoggedInUser {
  id: string;
  email: string;
  role: string;
}

// Database table interfaces for Supabase
export interface DbPoItem {
  id?: number;
  pr_number: string;
  item_code: string;
  description: string;
  uom: string;
  supplier: string;
  unit_price: number;
  quantity: number;
  amount: number;
  soh: number;
  user_id: string;
  created_at?: string;
}

export interface DbOrderHistory {
  id?: number;
  po_number: string;
  date: string;
  time: string;
  status: string;
  user_id: string;
  total_amount: number;
  total_items: number;
  items_data: PoItem[];
  created_at?: string;
}

export interface PoItem {
  id: number;
  pr_number: string;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  soh: number;
  created_at?: string;
  user_id?: string;
}

export interface LookupEntry {
  description: string;
  uom: string;
}

export interface LookupData {
  [itemCode: string]: LookupEntry;
}

export interface OrderHistoryEntry {
  id?: number;
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string;
  user_id: string;
  created_at?: string;
  total_amount?: number;
  total_items?: number;
}

export interface LoggedInUser {
  id: string;
  email: string;
  role: string;
}

// Database table interfaces for Supabase
export interface DbPoItem {
  id?: number;
  pr_number: string;
  item_code: string;
  description: string;
  uom: string;
  supplier: string;
  unit_price: number;
  quantity: number;
  amount: number;
  soh: number;
  user_id: string;
  created_at?: string;
}

export interface DbOrderHistory {
  id?: number;
  po_number: string;
  date: string;
  time: string;
  status: string;
  user_id: string;
  total_amount: number;
  total_items: number;
  items_data: PoItem[];
  created_at?: string;
}

export interface PoItem {
  id: number;
  pr_number: string;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  soh: number;
  created_at?: string;
  user_id?: string;
}

export interface LookupEntry {
  description: string;
  uom: string;
}

export interface LookupData {
  [itemCode: string]: LookupEntry;
}

export interface OrderHistoryEntry {
  id?: number;
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string;
  user_id: string;
  created_at?: string;
  total_amount?: number;
  total_items?: number;
}

export interface LoggedInUser {
  id: string;
  email: string;
  role: string;
}

// Database table interfaces for Supabase
export interface DbPoItem {
  id?: number;
  pr_number: string;
  item_code: string;
  description: string;
  uom: string;
  supplier: string;
  unit_price: number;
  quantity: number;
  amount: number;
  soh: number;
  user_id: string;
  created_at?: string;
}

export interface DbOrderHistory {
  id?: number;
  po_number: string;
  date: string;
  time: string;
  status: string;
  user_id: string;
  total_amount: number;
  total_items: number;
  items_data: PoItem[];
  created_at?: string;
}

export interface PoItem {
  id: number;
  pr_number: string;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  soh: number;
  created_at?: string;
  user_id?: string;
}

export interface LookupEntry {
  description: string;
  uom: string;
}

export interface LookupData {
  [itemCode: string]: LookupEntry;
}

export interface OrderHistoryEntry {
  id?: number;
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string;
  user_id: string;
  created_at?: string;
  total_amount?: number;
  total_items?: number;
}

export interface LoggedInUser {
  id: string;
  email: string;
  role: string;
}

// Database table interfaces for Supabase
export interface DbPoItem {
  id?: number;
  pr_number: string;
  item_code: string;
  description: string;
  uom: string;
  supplier: string;
  unit_price: number;
  quantity: number;
  amount: number;
  soh: number;
  user_id: string;
  created_at?: string;
}

export interface DbOrderHistory {
  id?: number;
  po_number: string;
  date: string;
  time: string;
  status: string;
  user_id: string;
  total_amount: number;
  total_items: number;
  items_data: PoItem[];
  created_at?: string;
}

export interface PoItem {
  id: number;
  pr_number: string;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  soh: number;
  created_at?: string;
  user_id?: string;
}

export interface LookupEntry {
  description: string;
  uom: string;
}

export interface LookupData {
  [itemCode: string]: LookupEntry;
}

export interface OrderHistoryEntry {
  id?: number;
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string;
  user_id: string;
  created_at?: string;
  total_amount?: number;
  total_items?: number;
}

export interface LoggedInUser {
  id: string;
  email: string;
  role: string;
}

// Database table interfaces for Supabase
export interface DbPoItem {
  id?: number;
  pr_number: string;
  item_code: string;
  description: string;
  uom: string;
  supplier: string;
  unit_price: number;
  quantity: number;
  amount: number;
  soh: number;
  user_id: string;
  created_at?: string;
}

export interface DbOrderHistory {
  id?: number;
  po_number: string;
  date: string;
  time: string;
  status: string;
  user_id: string;
  total_amount: number;
  total_items: number;
  items_data: PoItem[];
  created_at?: string;
}

export interface PoItem {
  id: number;
  pr_number: string;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  soh: number;
  created_at?: string;
  user_id?: string;
}

export interface LookupEntry {
  description: string;
  uom: string;
}

export interface LookupData {
  [itemCode: string]: LookupEntry;
}

export interface OrderHistoryEntry {
  id?: number;
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string;
  user_id: string;
  created_at?: string;
  total_amount?: number;
  total_items?: number;
}

export interface LoggedInUser {
  id: string;
  email: string;
  role: string;
}

// Database table interfaces for Supabase
export interface DbPoItem {
  id?: number;
  pr_number: string;
  item_code: string;
  description: string;
  uom: string;
  supplier: string;
  unit_price: number;
  quantity: number;
  amount: number;
  soh: number;
  user_id: string;
  created_at?: string;
}

export interface DbOrderHistory {
  id?: number;
  po_number: string;
  date: string;
  time: string;
  status: string;
  user_id: string;
  total_amount: number;
  total_items: number;
  items_data: PoItem[];
  created_at?: string;
}

export interface PoItem {
  id: number;
  pr_number: string;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  soh: number;
  created_at?: string;
  user_id?: string;
}

export interface LookupEntry {
  description: string;
  uom: string;
}

export interface LookupData {
  [itemCode: string]: LookupEntry;
}

export interface OrderHistoryEntry {
  id?: number;
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string;
  user_id: string;
  created_at?: string;
  total_amount?: number;
  total_items?: number;
}

export interface LoggedInUser {
  id: string;
  email: string;
  role: string;
}

// Database table interfaces for Supabase
export interface DbPoItem {
  id?: number;
  pr_number: string;
  item_code: string;
  description: string;
  uom: string;
  supplier: string;
  unit_price: number;
  quantity: number;
  amount: number;
  soh: number;
  user_id: string;
  created_at?: string;
}

export interface DbOrderHistory {
  id?: number;
  po_number: string;
  date: string;
  time: string;
  status: string;
  user_id: string;
  total_amount: number;
  total_items: number;
  items_data: PoItem[];
  created_at?: string;
}

export interface PoItem {
  id: number;
  pr_number: string;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  soh: number;
  created_at?: string;
  user_id?: string;
}

export interface LookupEntry {
  description: string;
  uom: string;
}

export interface LookupData {
  [itemCode: string]: LookupEntry;
}

export interface OrderHistoryEntry {
  id?: number;
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string;
  user_id: string;
  created_at?: string;
  total_amount?: number;
  total_items?: number;
}

export interface LoggedInUser {
  id: string;
  email: string;
  role: string;
}

// Database table interfaces for Supabase
export interface DbPoItem {
  id?: number;
  pr_number: string;
  item_code: string;
  description: string;
  uom: string;
  supplier: string;
  unit_price: number;
  quantity: number;
  amount: number;
  soh: number;
  user_id: string;
  created_at?: string;
}

export interface DbOrderHistory {
  id?: number;
  po_number: string;
  date: string;
  time: string;
  status: string;
  user_id: string;
  total_amount: number;
  total_items: number;
  items_data: PoItem[];
  created_at?: string;
}

export interface PoItem {
  id: number;
  pr_number: string;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  soh: number;
  created_at?: string;
  user_id?: string;
}

export interface LookupEntry {
  description: string;
  uom: string;
}

export interface LookupData {
  [itemCode: string]: LookupEntry;
}

export interface OrderHistoryEntry {
  id?: number;
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string;
  user_id: string;
  created_at?: string;
  total_amount?: number;
  total_items?: number;
}

export interface LoggedInUser {
  id: string;
  email: string;
  role: string;
}

// Database table interfaces for Supabase
export interface DbPoItem {
  id?: number;
  pr_number: string;
  item_code: string;
  description: string;
  uom: string;
  supplier: string;
  unit_price: number;
  quantity: number;
  amount: number;
  soh: number;
  user_id: string;
  created_at?: string;
}

export interface DbOrderHistory {
  id?: number;
  po_number: string;
  date: string;
  time: string;
  status: string;
  user_id: string;
  total_amount: number;
  total_items: number;
  items_data: PoItem[];
  created_at?: string;
}

export interface PoItem {
  id: number;
  pr_number: string;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  soh: number;
  created_at?: string;
  user_id?: string;
}

export interface LookupEntry {
  description: string;
  uom: string;
}

export interface LookupData {
  [itemCode: string]: LookupEntry;
}

export interface OrderHistoryEntry {
  id?: number;
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string;
  user_id: string;
  created_at?: string;
  total_amount?: number;
  total_items?: number;
}

export interface LoggedInUser {
  id: string;
  email: string;
  role: string;
}

// Database table interfaces for Supabase
export interface DbPoItem {
  id?: number;
  pr_number: string;
  item_code: string;
  description: string;
  uom: string;
  supplier: string;
  unit_price: number;
  quantity: number;
  amount: number;
  soh: number;
  user_id: string;
  created_at?: string;
}

export interface DbOrderHistory {
  id?: number;
  po_number: string;
  date: string;
  time: string;
  status: string;
  user_id: string;
  total_amount: number;
  total_items: number;
  items_data: PoItem[];
  created_at?: string;
}

export interface PoItem {
  id: number;
  pr_number: string;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  soh: number;
  created_at?: string;
  user_id?: string;
}

export interface LookupEntry {
  description: string;
  uom: string;
}

export interface LookupData {
  [itemCode: string]: LookupEntry;
}

export interface OrderHistoryEntry {
  id?: number;
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string;
  user_id: string;
  created_at?: string;
  total_amount?: number;
  total_items?: number;
}

export interface LoggedInUser {
  id: string;
  email: string;
  role: string;
}

// Database table interfaces for Supabase
export interface DbPoItem {
  id?: number;
  pr_number: string;
  item_code: string;
  description: string;
  uom: string;
  supplier: string;
  unit_price: number;
  quantity: number;
  amount: number;
  soh: number;
  user_id: string;
  created_at?: string;
}

export interface DbOrderHistory {
  id?: number;
  po_number: string;
  date: string;
  time: string;
  status: string;
  user_id: string;
  total_amount: number;
  total_items: number;
  items_data: PoItem[];
  created_at?: string;
}

export interface PoItem {
  id: number;
  pr_number: string;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  soh: number;
  created_at?: string;
  user_id?: string;
}

export interface LookupEntry {
  description: string;
  uom: string;
}

export interface LookupData {
  [itemCode: string]: LookupEntry;
}

export interface OrderHistoryEntry {
  id?: number;
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string;
  user_id: string;
  created_at?: string;
  total_amount?: number;
  total_items?: number;
}

export interface LoggedInUser {
  id: string;
  email: string;
  role: string;
}

// Database table interfaces for Supabase
export interface DbPoItem {
  id?: number;
  pr_number: string;
  item_code: string;
  description: string;
  uom: string;
  supplier: string;
  unit_price: number;
  quantity: number;
  amount: number;
  soh: number;
  user_id: string;
  created_at?: string;
}

export interface DbOrderHistory {
  id?: number;
  po_number: string;
  date: string;
  time: string;
  status: string;
  user_id: string;
  total_amount: number;
  total_items: number;
  items_data: PoItem[];
  created_at?: string;
}

export interface PoItem {
  id: number;
  pr_number: string;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  soh: number;
  created_at?: string;
  user_id?: string;
}

export interface LookupEntry {
  description: string;
  uom: string;
}

export interface LookupData {
  [itemCode: string]: LookupEntry;
}

export interface OrderHistoryEntry {
  id?: number;
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string;
  user_id: string;
  created_at?: string;
  total_amount?: number;
  total_items?: number;
}

export interface LoggedInUser {
  id: string;
  email: string;
  role: string;
}

// Database table interfaces for Supabase
export interface DbPoItem {
  id?: number;
  pr_number: string;
  item_code: string;
  description: string;
  uom: string;
  supplier: string;
  unit_price: number;
  quantity: number;
  amount: number;
  soh: number;
  user_id: string;
  created_at?: string;
}

export interface DbOrderHistory {
  id?: number;
  po_number: string;
  date: string;
  time: string;
  status: string;
  user_id: string;
  total_amount: number;
  total_items: number;
  items_data: PoItem[];
  created_at?: string;
}

export interface PoItem {
  id: number;
  pr_number: string;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  soh: number;
  created_at?: string;
  user_id?: string;
}

export interface LookupEntry {
  description: string;
  uom: string;
}

export interface LookupData {
  [itemCode: string]: LookupEntry;
}

export interface OrderHistoryEntry {
  id?: number;
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string;
  user_id: string;
  created_at?: string;
  total_amount?: number;
  total_items?: number;
}

export interface LoggedInUser {
  id: string;
  email: string;
  role: string;
}

// Database table interfaces for Supabase
export interface DbPoItem {
  id?: number;
  pr_number: string;
  item_code: string;
  description: string;
  uom: string;
  supplier: string;
  unit_price: number;
  quantity: number;
  amount: number;
  soh: number;
  user_id: string;
  created_at?: string;
}

export interface DbOrderHistory {
  id?: number;
  po_number: string;
  date: string;
  time: string;
  status: string;
  user_id: string;
  total_amount: number;
  total_items: number;
  items_data: PoItem[];
  created_at?: string;
}

export interface PoItem {
  id: number;
  pr_number: string;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  soh: number;
  created_at?: string;
  user_id?: string;
}

export interface LookupEntry {
  description: string;
  uom: string;
}

export interface LookupData {
  [itemCode: string]: LookupEntry;
}

export interface OrderHistoryEntry {
  id?: number;
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string;
  user_id: string;
  created_at?: string;
  total_amount?: number;
  total_items?: number;
}

export interface LoggedInUser {
  id: string;
  email: string;
  role: string;
}

// Database table interfaces for Supabase
export interface DbPoItem {
  id?: number;
  pr_number: string;
  item_code: string;
  description: string;
  uom: string;
  supplier: string;
  unit_price: number;
  quantity: number;
  amount: number;
  soh: number;
  user_id: string;
  created_at?: string;
}

export interface DbOrderHistory {
  id?: number;
  po_number: string;
  date: string;
  time: string;
  status: string;
  user_id: string;
  total_amount: number;
  total_items: number;
  items_data: PoItem[];
  created_at?: string;
}

export interface PoItem {
  id: number;
  pr_number: string;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  soh: number;
  created_at?: string;
  user_id?: string;
}

export interface LookupEntry {
  description: string;
  uom: string;
}

export interface LookupData {
  [itemCode: string]: LookupEntry;
}

export interface OrderHistoryEntry {
  id?: number;
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string;
  user_id: string;
  created_at?: string;
  total_amount?: number;
  total_items?: number;
}

export interface LoggedInUser {
  id: string;
  email: string;
  role: string;
}

// Database table interfaces for Supabase
export interface DbPoItem {
  id?: number;
  pr_number: string;
  item_code: string;
  description: string;
  uom: string;
  supplier: string;
  unit_price: number;
  quantity: number;
  amount: number;
  soh: number;
  user_id: string;
  created_at?: string;
}

export interface DbOrderHistory {
  id?: number;
  po_number: string;
  date: string;
  time: string;
  status: string;
  user_id: string;
  total_amount: number;
  total_items: number;
  items_data: PoItem[];
  created_at?: string;
}

export interface PoItem {
  id: number;
  pr_number: string;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  soh: number;
  created_at?: string;
  user_id?: string;
}

export interface LookupEntry {
  description: string;
  uom: string;
}

export interface LookupData {
  [itemCode: string]: LookupEntry;
}

export interface OrderHistoryEntry {
  id?: number;
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string;
  user_id: string;
  created_at?: string;
  total_amount?: number;
  total_items?: number;
}

export interface LoggedInUser {
  id: string;
  email: string;
  role: string;
}

// Database table interfaces for Supabase
export interface DbPoItem {
  id?: number;
  pr_number: string;
  item_code: string;
  description: string;
  uom: string;
  supplier: string;
  unit_price: number;
  quantity: number;
  amount: number;
  soh: number;
  user_id: string;
  created_at?: string;
}

export interface DbOrderHistory {
  id?: number;
  po_number: string;
  date: string;
  time: string;
  status: string;
  user_id: string;
  total_amount: number;
  total_items: number;
  items_data: PoItem[];
  created_at?: string;
}

export interface PoItem {
  id: number;
  pr_number: string;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  soh: number;
  created_at?: string;
  user_id?: string;
}

export interface LookupEntry {
  description: string;
  uom: string;
}

export interface LookupData {
  [itemCode: string]: LookupEntry;
}

export interface OrderHistoryEntry {
  id?: number;
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string;
  user_id: string;
  created_at?: string;
  total_amount?: number;
  total_items?: number;
}

export interface LoggedInUser {
  id: string;
  email: string;
  role: string;
}

// Database table interfaces for Supabase
export interface DbPoItem {
  id?: number;
  pr_number: string;
  item_code: string;
  description: string;
  uom: string;
  supplier: string;
  unit_price: number;
  quantity: number;
  amount: number;
  soh: number;
  user_id: string;
  created_at?: string;
}

export interface DbOrderHistory {
  id?: number;
  po_number: string;
  date: string;
  time: string;
  status: string;
  user_id: string;
  total_amount: number;
  total_items: number;
  items_data: PoItem[];
  created_at?: string;
}

export interface PoItem {
  id: number;
  pr_number: string;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  soh: number;
  created_at?: string;
  user_id?: string;
}

export interface LookupEntry {
  description: string;
  uom: string;
}

export interface LookupData {
  [itemCode: string]: LookupEntry;
}

export interface OrderHistoryEntry {
  id?: number;
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string;
  user_id: string;
  created_at?: string;
  total_amount?: number;
  total_items?: number;
}

export interface LoggedInUser {
  id: string;
  email: string;
  role: string;
}

// Database table interfaces for Supabase
export interface DbPoItem {
  id?: number;
  pr_number: string;
  item_code: string;
  description: string;
  uom: string;
  supplier: string;
  unit_price: number;
  quantity: number;
  amount: number;
  soh: number;
  user_id: string;
  created_at?: string;
}

export interface DbOrderHistory {
  id?: number;
  po_number: string;
  date: string;
  time: string;
  status: string;
  user_id: string;
  total_amount: number;
  total_items: number;
  items_data: PoItem[];
  created_at?: string;
}

export interface PoItem {
  id: number;
  pr_number: string;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  soh: number;
  created_at?: string;
  user_id?: string;
}

export interface LookupEntry {
  description: string;
  uom: string;
}

export interface LookupData {
  [itemCode: string]: LookupEntry;
}

export interface OrderHistoryEntry {
  id?: number;
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string;
  user_id: string;
  created_at?: string;
  total_amount?: number;
  total_items?: number;
}

export interface LoggedInUser {
  id: string;
  email: string;
  role: string;
}

// Database table interfaces for Supabase
export interface DbPoItem {
  id?: number;
  pr_number: string;
  item_code: string;
  description: string;
  uom: string;
  supplier: string;
  unit_price: number;
  quantity: number;
  amount: number;
  soh: number;
  user_id: string;
  created_at?: string;
}

export interface DbOrderHistory {
  id?: number;
  po_number: string;
  date: string;
  time: string;
  status: string;
  user_id: string;
  total_amount: number;
  total_items: number;
  items_data: PoItem[];
  created_at?: string;
}

export interface PoItem {
  id: number;
  pr_number: string;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  soh: number;
  created_at?: string;
  user_id?: string;
}

export interface LookupEntry {
  description: string;
  uom: string;
}

export interface LookupData {
  [itemCode: string]: LookupEntry;
}

export interface OrderHistoryEntry {
  id?: number;
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string;
  user_id: string;
  created_at?: string;
  total_amount?: number;
  total_items?: number;
}

export interface LoggedInUser {
  id: string;
  email: string;
  role: string;
}

// Database table interfaces for Supabase
export interface DbPoItem {
  id?: number;
  pr_number: string;
  item_code: string;
  description: string;
  uom: string;
  supplier: string;
  unit_price: number;
  quantity: number;
  amount: number;
  soh: number;
  user_id: string;
  created_at?: string;
}

export interface DbOrderHistory {
  id?: number;
  po_number: string;
  date: string;
  time: string;
  status: string;
  user_id: string;
  total_amount: number;
  total_items: number;
  items_data: PoItem[];
  created_at?: string;
}

export interface PoItem {
  id: number;
  pr_number: string;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  soh: number;
  created_at?: string;
  user_id?: string;
}

export interface LookupEntry {
  description: string;
  uom: string;
}

export interface LookupData {
  [itemCode: string]: LookupEntry;
}

export interface OrderHistoryEntry {
  id?: number;
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string;
  user_id: string;
  created_at?: string;
  total_amount?: number;
  total_items?: number;
}

export interface LoggedInUser {
  id: string;
  email: string;
  role: string;
}

// Database table interfaces for Supabase
export interface DbPoItem {
  id?: number;
  pr_number: string;
  item_code: string;
  description: string;
  uom: string;
  supplier: string;
  unit_price: number;
  quantity: number;
  amount: number;
  soh: number;
  user_id: string;
  created_at?: string;
}

export interface DbOrderHistory {
  id?: number;
  po_number: string;
  date: string;
  time: string;
  status: string;
  user_id: string;
  total_amount: number;
  total_items: number;
  items_data: PoItem[];
  created_at?: string;
}

export interface PoItem {
  id: number;
  pr_number: string;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  soh: number;
  created_at?: string;
  user_id?: string;
}

export interface LookupEntry {
  description: string;
  uom: string;
}

export interface LookupData {
  [itemCode: string]: LookupEntry;
}

export interface OrderHistoryEntry {
  id?: number;
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string;
  user_id: string;
  created_at?: string;
  total_amount?: number;
  total_items?: number;
}

export interface LoggedInUser {
  id: string;
  email: string;
  role: string;
}

// Database table interfaces for Supabase
export interface DbPoItem {
  id?: number;
  pr_number: string;
  item_code: string;
  description: string;
  uom: string;
  supplier: string;
  unit_price: number;
  quantity: number;
  amount: number;
  soh: number;
  user_id: string;
  created_at?: string;
}

export interface DbOrderHistory {
  id?: number;
  po_number: string;
  date: string;
  time: string;
  status: string;
  user_id: string;
  total_amount: number;
  total_items: number;
  items_data: PoItem[];
  created_at?: string;
}

export interface PoItem {
  id: number;
  pr_number: string;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  soh: number;
  created_at?: string;
  user_id?: string;
}

export interface LookupEntry {
  description: string;
  uom: string;
}

export interface LookupData {
  [itemCode: string]: LookupEntry;
}

export interface OrderHistoryEntry {
  id?: number;
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string;
  user_id: string;
  created_at?: string;
  total_amount?: number;
  total_items?: number;
}

export interface LoggedInUser {
  id: string;
  email: string;
  role: string;
}

// Database table interfaces for Supabase
export interface DbPoItem {
  id?: number;
  pr_number: string;
  item_code: string;
  description: string;
  uom: string;
  supplier: string;
  unit_price: number;
  quantity: number;
  amount: number;
  soh: number;
  user_id: string;
  created_at?: string;
}

export interface DbOrderHistory {
  id?: number;
  po_number: string;
  date: string;
  time: string;
  status: string;
  user_id: string;
  total_amount: number;
  total_items: number;
  items_data: PoItem[];
  created_at?: string;
}

export interface PoItem {
  id: number;
  pr_number: string;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  soh: number;
  created_at?: string;
  user_id?: string;
}

export interface LookupEntry {
  description: string;
  uom: string;
}

export interface LookupData {
  [itemCode: string]: LookupEntry;
}

export interface OrderHistoryEntry {
  id?: number;
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string;
  user_id: string;
  created_at?: string;
  total_amount?: number;
  total_items?: number;
}

export interface LoggedInUser {
  id: string;
  email: string;
  role: string;
}

// Database table interfaces for Supabase
export interface DbPoItem {
  id?: number;
  pr_number: string;
  item_code: string;
  description: string;
  uom: string;
  supplier: string;
  unit_price: number;
  quantity: number;
  amount: number;
  soh: number;
  user_id: string;
  created_at?: string;
}

export interface DbOrderHistory {
  id?: number;
  po_number: string;
  date: string;
  time: string;
  status: string;
  user_id: string;
  total_amount: number;
  total_items: number;
  items_data: PoItem[];
  created_at?: string;
}

export interface PoItem {
  id: number;
  pr_number: string;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  soh: number;
  created_at?: string;
  user_id?: string;
}

export interface LookupEntry {
  description: string;
  uom: string;
}

export interface LookupData {
  [itemCode: string]: LookupEntry;
}

export interface OrderHistoryEntry {
  id?: number;
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string;
  user_id: string;
  created_at?: string;
  total_amount?: number;
  total_items?: number;
}

export interface LoggedInUser {
  id: string;
  email: string;
  role: string;
}

// Database table interfaces for Supabase
export interface DbPoItem {
  id?: number;
  pr_number: string;
  item_code: string;
  description: string;
  uom: string;
  supplier: string;
  unit_price: number;
  quantity: number;
  amount: number;
  soh: number;
  user_id: string;
  created_at?: string;
}

export interface DbOrderHistory {
  id?: number;
  po_number: string;
  date: string;
  time: string;
  status: string;
  user_id: string;
  total_amount: number;
  total_items: number;
  items_data: PoItem[];
  created_at?: string;
}

export interface PoItem {
  id: number;
  pr_number: string;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  soh: number;
  created_at?: string;
  user_id?: string;
}

export interface LookupEntry {
  description: string;
  uom: string;
}

export interface LookupData {
  [itemCode: string]: LookupEntry;
}

export interface OrderHistoryEntry {
  id?: number;
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string;
  user_id: string;
  created_at?: string;
  total_amount?: number;
  total_items?: number;
}

export interface LoggedInUser {
  id: string;
  email: string;
  role: string;
}

// Database table interfaces for Supabase
export interface DbPoItem {
  id?: number;
  pr_number: string;
  item_code: string;
  description: string;
  uom: string;
  supplier: string;
  unit_price: number;
  quantity: number;
  amount: number;
  soh: number;
  user_id: string;
  created_at?: string;
}

export interface DbOrderHistory {
  id?: number;
  po_number: string;
  date: string;
  time: string;
  status: string;
  user_id: string;
  total_amount: number;
  total_items: number;
  items_data: PoItem[];
  created_at?: string;
}

export interface PoItem {
  id: number;
  pr_number: string;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  soh: number;
  created_at?: string;
  user_id?: string;
}

export interface LookupEntry {
  description: string;
  uom: string;
}

export interface LookupData {
  [itemCode: string]: LookupEntry;
}

export interface OrderHistoryEntry {
  id?: number;
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string;
  user_id: string;
  created_at?: string;
  total_amount?: number;
  total_items?: number;
}

export interface LoggedInUser {
  id: string;
  email: string;
  role: string;
}

// Database table interfaces for Supabase
export interface DbPoItem {
  id?: number;
  pr_number: string;
  item_code: string;
  description: string;
  uom: string;
  supplier: string;
  unit_price: number;
  quantity: number;
  amount: number;
  soh: number;
  user_id: string;
  created_at?: string;
}

export interface DbOrderHistory {
  id?: number;
  po_number: string;
  date: string;
  time: string;
  status: string;
  user_id: string;
  total_amount: number;
  total_items: number;
  items_data: PoItem[];
  created_at?: string;
}

export interface PoItem {
  id: number;
  pr_number: string;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  soh: number;
  created_at?: string;
  user_id?: string;
}

export interface LookupEntry {
  description: string;
  uom: string;
}

export interface LookupData {
  [itemCode: string]: LookupEntry;
}

export interface OrderHistoryEntry {
  id?: number;
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string;
  user_id: string;
  created_at?: string;
  total_amount?: number;
  total_items?: number;
}

export interface LoggedInUser {
  id: string;
  email: string;
  role: string;
}

// Database table interfaces for Supabase
export interface DbPoItem {
  id?: number;
  pr_number: string;
  item_code: string;
  description: string;
  uom: string;
  supplier: string;
  unit_price: number;
  quantity: number;
  amount: number;
  soh: number;
  user_id: string;
  created_at?: string;
}

export interface DbOrderHistory {
  id?: number;
  po_number: string;
  date: string;
  time: string;
  status: string;
  user_id: string;
  total_amount: number;
  total_items: number;
  items_data: PoItem[];
  created_at?: string;
}

export interface PoItem {
  id: number;
  pr_number: string;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  soh: number;
  created_at?: string;
  user_id?: string;
}

export interface LookupEntry {
  description: string;
  uom: string;
}

export interface LookupData {
  [itemCode: string]: LookupEntry;
}

export interface OrderHistoryEntry {
  id?: number;
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string;
  user_id: string;
  created_at?: string;
  total_amount?: number;
  total_items?: number;
}

export interface LoggedInUser {
  id: string;
  email: string;
  role: string;
}

// Database table interfaces for Supabase
export interface DbPoItem {
  id?: number;
  pr_number: string;
  item_code: string;
  description: string;
  uom: string;
  supplier: string;
  unit_price: number;
  quantity: number;
  amount: number;
  soh: number;
  user_id: string;
  created_at?: string;
}

export interface DbOrderHistory {
  id?: number;
  po_number: string;
  date: string;
  time: string;
  status: string;
  user_id: string;
  total_amount: number;
  total_items: number;
  items_data: PoItem[];
  created_at?: string;
}

export interface PoItem {
  id: number;
  pr_number: string;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  soh: number;
  created_at?: string;
  user_id?: string;
}

export interface LookupEntry {
  description: string;
  uom: string;
}

export interface LookupData {
  [itemCode: string]: LookupEntry;
}

export interface OrderHistoryEntry {
  id?: number;
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string;
  user_id: string;
  created_at?: string;
  total_amount?: number;
  total_items?: number;
}

export interface LoggedInUser {
  id: string;
  email: string;
  role: string;
}

// Database table interfaces for Supabase
export interface DbPoItem {
  id?: number;
  pr_number: string;
  item_code: string;
  description: string;
  uom: string;
  supplier: string;
  unit_price: number;
  quantity: number;
  amount: number;
  soh: number;
  user_id: string;
  created_at?: string;
}

export interface DbOrderHistory {
  id?: number;
  po_number: string;
  date: string;
  time: string;
  status: string;
  user_id: string;
  total_amount: number;
  total_items: number;
  items_data: PoItem[];
  created_at?: string;
}

export interface PoItem {
  id: number;
  pr_number: string;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  soh: number;
  created_at?: string;
  user_id?: string;
}

export interface LookupEntry {
  description: string;
  uom: string;
}

export interface LookupData {
  [itemCode: string]: LookupEntry;
}

export interface OrderHistoryEntry {
  id?: number;
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string;
  user_id: string;
  created_at?: string;
  total_amount?: number;
  total_items?: number;
}

export interface LoggedInUser {
  id: string;
  email: string;
  role: string;
}

// Database table interfaces for Supabase
export interface DbPoItem {
  id?: number;
  pr_number: string;
  item_code: string;
  description: string;
  uom: string;
  supplier: string;
  unit_price: number;
  quantity: number;
  amount: number;
  soh: number;
  user_id: string;
  created_at?: string;
}

export interface DbOrderHistory {
  id?: number;
  po_number: string;
  date: string;
  time: string;
  status: string;
  user_id: string;
  total_amount: number;
  total_items: number;
  items_data: PoItem[];
  created_at?: string;
}

export interface PoItem {
  id: number;
  pr_number: string;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  soh: number;
  created_at?: string;
  user_id?: string;
}

export interface LookupEntry {
  description: string;
  uom: string;
}

export interface LookupData {
  [itemCode: string]: LookupEntry;
}

export interface OrderHistoryEntry {
  id?: number;
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string;
  user_id: string;
  created_at?: string;
  total_amount?: number;
  total_items?: number;
}

export interface LoggedInUser {
  id: string;
  email: string;
  role: string;
}

// Database table interfaces for Supabase
export interface DbPoItem {
  id?: number;
  pr_number: string;
  item_code: string;
  description: string;
  uom: string;
  supplier: string;
  unit_price: number;
  quantity: number;
  amount: number;
  soh: number;
  user_id: string;
  created_at?: string;
}

export interface DbOrderHistory {
  id?: number;
  po_number: string;
  date: string;
  time: string;
  status: string;
  user_id: string;
  total_amount: number;
  total_items: number;
  items_data: PoItem[];
  created_at?: string;
}

export interface PoItem {
  id: number;
  pr_number: string;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  soh: number;
  created_at?: string;
  user_id?: string;
}

export interface LookupEntry {
  description: string;
  uom: string;
}

export interface LookupData {
  [itemCode: string]: LookupEntry;
}

export interface OrderHistoryEntry {
  id?: number;
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string;
  user_id: string;
  created_at?: string;
  total_amount?: number;
  total_items?: number;
}

export interface LoggedInUser {
  id: string;
  email: string;
  role: string;
}

// Database table interfaces for Supabase
export interface DbPoItem {
  id?: number;
  pr_number: string;
  item_code: string;
  description: string;
  uom: string;
  supplier: string;
  unit_price: number;
  quantity: number;
  amount: number;
  soh: number;
  user_id: string;
  created_at?: string;
}

export interface DbOrderHistory {
  id?: number;
  po_number: string;
  date: string;
  time: string;
  status: string;
  user_id: string;
  total_amount: number;
  total_items: number;
  items_data: PoItem[];
  created_at?: string;
}

export interface PoItem {
  id: number;
  pr_number: string;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  soh: number;
  created_at?: string;
  user_id?: string;
}

export interface LookupEntry {
  description: string;
  uom: string;
}

export interface LookupData {
  [itemCode: string]: LookupEntry;
}

export interface OrderHistoryEntry {
  id?: number;
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string;
  user_id: string;
  created_at?: string;
  total_amount?: number;
  total_items?: number;
}

export interface LoggedInUser {
  id: string;
  email: string;
  role: string;
}

// Database table interfaces for Supabase
export interface DbPoItem {
  id?: number;
  pr_number: string;
  item_code: string;
  description: string;
  uom: string;
  supplier: string;
  unit_price: number;
  quantity: number;
  amount: number;
  soh: number;
  user_id: string;
  created_at?: string;
}

export interface DbOrderHistory {
  id?: number;
  po_number: string;
  date: string;
  time: string;
  status: string;
  user_id: string;
  total_amount: number;
  total_items: number;
  items_data: PoItem[];
  created_at?: string;
}

export interface PoItem {
  id: number;
  pr_number: string;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  soh: number;
  created_at?: string;
  user_id?: string;
}

export interface LookupEntry {
  description: string;
  uom: string;
}

export interface LookupData {
  [itemCode: string]: LookupEntry;
}

export interface OrderHistoryEntry {
  id?: number;
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string;
  user_id: string;
  created_at?: string;
  total_amount?: number;
  total_items?: number;
}

export interface LoggedInUser {
  id: string;
  email: string;
  role: string;
}

// Database table interfaces for Supabase
export interface DbPoItem {
  id?: number;
  pr_number: string;
  item_code: string;
  description: string;
  uom: string;
  supplier: string;
  unit_price: number;
  quantity: number;
  amount: number;
  soh: number;
  user_id: string;
  created_at?: string;
}

export interface DbOrderHistory {
  id?: number;
  po_number: string;
  date: string;
  time: string;
  status: string;
  user_id: string;
  total_amount: number;
  total_items: number;
  items_data: PoItem[];
  created_at?: string;
}

export interface PoItem {
  id: number;
  pr_number: string;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  soh: number;
  created_at?: string;
  user_id?: string;
}

export interface LookupEntry {
  description: string;
  uom: string;
}

export interface LookupData {
  [itemCode: string]: LookupEntry;
}

export interface OrderHistoryEntry {
  id?: number;
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string;
  user_id: string;
  created_at?: string;
  total_amount?: number;
  total_items?: number;
}

export interface LoggedInUser {
  id: string;
  email: string;
  role: string;
}

// Database table interfaces for Supabase
export interface DbPoItem {
  id?: number;
  pr_number: string;
  item_code: string;
  description: string;
  uom: string;
  supplier: string;
  unit_price: number;
  quantity: number;
  amount: number;
  soh: number;
  user_id: string;
  created_at?: string;
}

export interface DbOrderHistory {
  id?: number;
  po_number: string;
  date: string;
  time: string;
  status: string;
  user_id: string;
  total_amount: number;
  total_items: number;
  items_data: PoItem[];
  created_at?: string;
}

export interface PoItem {
  id: number;
  pr_number: string;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  soh: number;
  created_at?: string;
  user_id?: string;
}

export interface LookupEntry {
  description: string;
  uom: string;
}

export interface LookupData {
  [itemCode: string]: LookupEntry;
}

export interface OrderHistoryEntry {
  id?: number;
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string;
  user_id: string;
  created_at?: string;
  total_amount?: number;
  total_items?: number;
}

export interface LoggedInUser {
  id: string;
  email: string;
  role: string;
}

// Database table interfaces for Supabase
export interface DbPoItem {
  id?: number;
  pr_number: string;
  item_code: string;
  description: string;
  uom: string;
  supplier: string;
  unit_price: number;
  quantity: number;
  amount: number;
  soh: number;
  user_id: string;
  created_at?: string;
}

export interface DbOrderHistory {
  id?: number;
  po_number: string;
  date: string;
  time: string;
  status: string;
  user_id: string;
  total_amount: number;
  total_items: number;
  items_data: PoItem[];
  created_at?: string;
}

export interface PoItem {
  id: number;
  pr_number: string;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  soh: number;
  created_at?: string;
  user_id?: string;
}

export interface LookupEntry {
  description: string;
  uom: string;
}

export interface LookupData {
  [itemCode: string]: LookupEntry;
}

export interface OrderHistoryEntry {
  id?: number;
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string;
  user_id: string;
  created_at?: string;
  total_amount?: number;
  total_items?: number;
}

export interface LoggedInUser {
  id: string;
  email: string;
  role: string;
}

// Database table interfaces for Supabase
export interface DbPoItem {
  id?: number;
  pr_number: string;
  item_code: string;
  description: string;
  uom: string;
  supplier: string;
  unit_price: number;
  quantity: number;
  amount: number;
  soh: number;
  user_id: string;
  created_at?: string;
}

export interface DbOrderHistory {
  id?: number;
  po_number: string;
  date: string;
  time: string;
  status: string;
  user_id: string;
  total_amount: number;
  total_items: number;
  items_data: PoItem[];
  created_at?: string;
}

export interface PoItem {
  id: number;
  pr_number: string;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  soh: number;
  created_at?: string;
  user_id?: string;
}

export interface LookupEntry {
  description: string;
  uom: string;
}

export interface LookupData {
  [itemCode: string]: LookupEntry;
}

export interface OrderHistoryEntry {
  id?: number;
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string;
  user_id: string;
  created_at?: string;
  total_amount?: number;
  total_items?: number;
}

export interface LoggedInUser {
  id: string;
  email: string;
  role: string;
}

// Database table interfaces for Supabase
export interface DbPoItem {
  id?: number;
  pr_number: string;
  item_code: string;
  description: string;
  uom: string;
  supplier: string;
  unit_price: number;
  quantity: number;
  amount: number;
  soh: number;
  user_id: string;
  created_at?: string;
}

export interface DbOrderHistory {
  id?: number;
  po_number: string;
  date: string;
  time: string;
  status: string;
  user_id: string;
  total_amount: number;
  total_items: number;
  items_data: PoItem[];
  created_at?: string;
}

export interface PoItem {
  id: number;
  pr_number: string;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  soh: number;
  created_at?: string;
  user_id?: string;
}

export interface LookupEntry {
  description: string;
  uom: string;
}

export interface LookupData {
  [itemCode: string]: LookupEntry;
}

export interface OrderHistoryEntry {
  id?: number;
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string;
  user_id: string;
  created_at?: string;
  total_amount?: number;
  total_items?: number;
}

export interface LoggedInUser {
  id: string;
  email: string;
  role: string;
}

// Database table interfaces for Supabase
export interface DbPoItem {
  id?: number;
  pr_number: string;
  item_code: string;
  description: string;
  uom: string;
  supplier: string;
  unit_price: number;
  quantity: number;
  amount: number;
  soh: number;
  user_id: string;
  created_at?: string;
}

export interface DbOrderHistory {
  id?: number;
  po_number: string;
  date: string;
  time: string;
  status: string;
  user_id: string;
  total_amount: number;
  total_items: number;
  items_data: PoItem[];
  created_at?: string;
}

export interface PoItem {
  id: number;
  pr_number: string;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  soh: number;
  created_at?: string;
  user_id?: string;
}

export interface LookupEntry {
  description: string;
  uom: string;
}

export interface LookupData {
  [itemCode: string]: LookupEntry;
}

export interface OrderHistoryEntry {
  id?: number;
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string;
  user_id: string;
  created_at?: string;
  total_amount?: number;
  total_items?: number;
}

export interface LoggedInUser {
  id: string;
  email: string;
  role: string;
}

// Database table interfaces for Supabase
export interface DbPoItem {
  id?: number;
  pr_number: string;
  item_code: string;
  description: string;
  uom: string;
  supplier: string;
  unit_price: number;
  quantity: number;
  amount: number;
  soh: number;
  user_id: string;
  created_at?: string;
}

export interface DbOrderHistory {
  id?: number;
  po_number: string;
  date: string;
  time: string;
  status: string;
  user_id: string;
  total_amount: number;
  total_items: number;
  items_data: PoItem[];
  created_at?: string;
}

export interface PoItem {
  id: number;
  pr_number: string;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  soh: number;
  created_at?: string;
  user_id?: string;
}

export interface LookupEntry {
  description: string;
  uom: string;
}

export interface LookupData {
  [itemCode: string]: LookupEntry;
}

export interface OrderHistoryEntry {
  id?: number;
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string;
  user_id: string;
  created_at?: string;
  total_amount?: number;
  total_items?: number;
}

export interface LoggedInUser {
  id: string;
  email: string;
  role: string;
}

// Database table interfaces for Supabase
export interface DbPoItem {
  id?: number;
  pr_number: string;
  item_code: string;
  description: string;
  uom: string;
  supplier: string;
  unit_price: number;
  quantity: number;
  amount: number;
  soh: number;
  user_id: string;
  created_at?: string;
}

export interface DbOrderHistory {
  id?: number