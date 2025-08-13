import { createClient } from '@supabase/supabase-js';

type UiPoItem = {
  id: number;
  pr_number?: string;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number | string;
  quantity: number | string;
  amount: number | string;
  soh?: number | string;
};

type Payload = {
  prNumber: string;
  userId?: string | null;
  items: UiPoItem[];
};

export const handler = async (event: any) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { SUPABASE_SERVICE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env as Record<string, string | undefined>;
  if (!SUPABASE_SERVICE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return { statusCode: 500, body: 'Server not configured' };
  }

  let payload: Payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, body: 'Invalid JSON payload' };
  }

  if (!payload.prNumber || !Array.isArray(payload.items) || payload.items.length === 0) {
    return { statusCode: 400, body: 'Missing prNumber or items' };
  }

  // Map camelCase to snake_case and coerce numbers
  const rows = payload.items.map((i) => ({
    pr_number: payload.prNumber,
    item_code: String(i.itemCode || '').trim(),
    description: String(i.description || '').trim(),
    uom: String(i.uom || '').trim(),
    supplier: String(i.supplier || '').trim(),
    unit_price: Number(i.unitPrice) || 0,
    quantity: Number(i.quantity) || 0,
    amount: Number(i.amount) || 0,
    soh: Number(i.soh ?? 0) || 0,
    user_id: payload.userId || null,
  }));

  // Basic validation to avoid NOT NULL violations
  for (const r of rows) {
    if (!r.item_code || !r.description || !r.uom || !r.supplier) {
      return { statusCode: 400, body: 'Missing required string fields' };
    }
  }

  const supabase = createClient(SUPABASE_SERVICE_URL, SUPABASE_SERVICE_ROLE_KEY);
  const { error } = await supabase.from('pr_items').insert(rows);
  if (error) {
    console.error('Insert pr_items error', error);
    return { statusCode: 500, body: 'Failed to save pr items' };
  }

  return { statusCode: 200, body: JSON.stringify({ ok: true, inserted: rows.length }) };
};


