import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

type IncomingPoItem = {
  id: number;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
};

type SendApprovalPayload = {
  poNumber: string;
  user: string;
  items: IncomingPoItem[];
  approverEmail: string;
};

export const handler = async (event: any) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const {
    RESEND_API_KEY,
    SUPABASE_SERVICE_URL,
    SUPABASE_SERVICE_ROLE_KEY,
    URL,
  } = process.env as Record<string, string | undefined>;

  if (!RESEND_API_KEY || !SUPABASE_SERVICE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return { statusCode: 500, body: 'Server not configured. Missing env vars.' };
  }

  let payload: SendApprovalPayload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, body: 'Invalid JSON payload.' };
  }

  if (!payload.poNumber || !payload.user || !payload.approverEmail || !Array.isArray(payload.items)) {
    return { statusCode: 400, body: 'Missing required fields.' };
  }

  const supabase = createClient(SUPABASE_SERVICE_URL, SUPABASE_SERVICE_ROLE_KEY);

  const token = crypto.randomUUID();
  const { error } = await supabase
    .from('purchase_orders')
    .insert({
      po_number: payload.poNumber,
      user: payload.user,
      items: payload.items,
      status: 'Submitted',
      approver_email: payload.approverEmail,
      approval_token: token,
    });

  if (error) {
    console.error('Supabase insert error', error);
    return { statusCode: 500, body: 'Failed to save order.' };
  }

  const scheme = (event.headers && (event.headers['x-forwarded-proto'] || event.headers['X-Forwarded-Proto'])) || 'https';
  const host = (event.headers && (event.headers.host || event.headers.Host)) || '';
  const base = (URL && URL.replace(/\/$/, '')) || (host ? `${scheme}://${host}` : '');
  const approvalLink = `${base}/api/approve?token=${encodeURIComponent(token)}`;

  const itemsSummary = payload.items
    .map((i) => `${i.itemCode} - ${i.description} x${i.quantity} @ ${i.unitPrice} = ${i.amount}`)
    .join('\n');

  const resend = new Resend(RESEND_API_KEY);
  try {
    await resend.emails.send({
      from: 'MCI PO App <onboarding@resend.dev>',
      to: payload.approverEmail,
      subject: `PO ${payload.poNumber} approval request`,
      text: `A new PO requires your approval.\n\nPO: ${payload.poNumber}\nRequested by: ${payload.user}\nItems:\n${itemsSummary}\n\nApprove here: ${approvalLink}`,
      html: `
        <p>A new PO requires your approval.</p>
        <p><strong>PO:</strong> ${payload.poNumber}<br/>
        <strong>Requested by:</strong> ${payload.user}</p>
        <pre style="background:#f6f8fa;padding:12px;border-radius:6px;">${itemsSummary}</pre>
        <p><a href="${approvalLink}" style="display:inline-block;background:#2e7d32;color:#fff;padding:10px 16px;border-radius:6px;text-decoration:none;">Approve</a></p>
      `,
    });
  } catch (e) {
    console.error('Email send error', e);
    return { statusCode: 500, body: 'Failed to send email.' };
  }

  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};


