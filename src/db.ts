import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let supabaseClient: SupabaseClient | null = null;

export const getSupabase = (): SupabaseClient | null => {
  try {
    // Vite exposes env vars with VITE_ prefix in the browser
    const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
    if (!url || !anonKey) return null;
    if (!supabaseClient) {
      supabaseClient = createClient(url, anonKey);
    }
    return supabaseClient;
  } catch {
    return null;
  }
};

export type PurchaseOrderRow = {
  id: string;
  po_number: string;
  user: string;
  items: unknown;
  status: 'Pending' | 'Submitted' | 'Approved' | 'Rejected';
  approver_email: string | null;
  approval_token: string | null;
  created_at: string | null;
  approved_at: string | null;
};


