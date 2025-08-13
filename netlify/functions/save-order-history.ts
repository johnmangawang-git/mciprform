import { createClient } from '@supabase/supabase-js';

type UiPoItem = {
  id: number;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
};

type Payload = {
  poNumber: string;
  date: string;
  time: string;
  items: UiPoItem[];
  status?: string;
  userId?: string | null;
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

  if (!payload.poNumber || !payload.date || !payload.time || !Array.isArray(payload.items)) {
    return { statusCode: 400, body: 'Missing required fields' };
  }

  const totalAmount = payload.items.reduce((sum, i) => sum + (Number(i.amount) || 0), 0);
  const totalItems = payload.items.length;

  const row = {
    po_number: payload.poNumber,
    date: payload.date,
    time: payload.time,
    status: payload.status || 'Submitted',
    user_id: payload.userId || null,
    total_amount: totalAmount,
    total_items: totalItems,
    items_data: payload.items, // store UI items as-is in JSONB
  };

  const supabase = createClient(SUPABASE_SERVICE_URL, SUPABASE_SERVICE_ROLE_KEY);
  const { error } = await supabase.from('order_history').insert(row);
  if (error) {
    console.error('Insert order_history error', error);
    return { statusCode: 500, body: 'Failed to save order history' };
  }

  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};


