import { createClient } from '@supabase/supabase-js';

export const handler = async (event: any) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { token } = event.queryStringParameters || {};
  if (!token) return { statusCode: 400, body: 'Missing token' };

  const { SUPABASE_SERVICE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env as Record<string, string | undefined>;
  if (!SUPABASE_SERVICE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return { statusCode: 500, body: 'Server not configured' };
  }

  const supabase = createClient(SUPABASE_SERVICE_URL, SUPABASE_SERVICE_ROLE_KEY);

  const { data, error } = await supabase
    .from('purchase_orders')
    .update({ status: 'Approved', approved_at: new Date().toISOString() })
    .eq('approval_token', token)
    .select('po_number')
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('Supabase update error', error);
    return { statusCode: 500, body: 'Failed to update order.' };
  }

  if (!data) {
    return { statusCode: 404, body: 'Invalid or expired token.' };
  }

  const body = `<!doctype html><html><head><meta charset="utf-8"/><title>Approved</title></head>
  <body style="font-family:Arial,Helvetica,sans-serif;padding:24px;">
    <h2>PO ${data.po_number} approved</h2>
    <p>Thank you. The requester and admin can now see this PO as Approved.</p>
  </body></html>`;

  return { statusCode: 200, headers: { 'content-type': 'text/html' }, body };
};


