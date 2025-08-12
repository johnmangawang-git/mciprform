import { createClient } from '@supabase/supabase-js';

export const handler = async () => {
  const { SUPABASE_SERVICE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env as Record<string, string | undefined>;
  if (!SUPABASE_SERVICE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return { statusCode: 500, body: 'Server not configured' };
  }
  const supabase = createClient(SUPABASE_SERVICE_URL, SUPABASE_SERVICE_ROLE_KEY);
  const { data, error } = await supabase
    .from('purchase_orders')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(200);

  if (error) return { statusCode: 500, body: 'Failed to fetch' };
  return { statusCode: 200, body: JSON.stringify(data) };
};


