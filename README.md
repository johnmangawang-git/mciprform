## MCI Online PO Form

React + TypeScript + Vite app for creating and tracking Purchase Orders (PO). Enhanced with:

- Approval via email link (single approver)
- Supabase storage for PO records and approval status
- Netlify Functions for secure email sending and approval webhook

### Local development

1. Install deps: `npm i`
2. Create `.env` with:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```
3. Create `netlify/functions/.env` (not committed) with:
```
GMAIL_USER=your.gmail.address@gmail.com
GMAIL_APP_PASSWORD=your_app_password
APP_BASE_URL=http://localhost:8888
SUPABASE_SERVICE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```
4. Run: `npm run dev`

### Deploy

- GitHub: commit, push
- Netlify: connect repo, set build `npm run build`, publish `dist`.
  Set env vars in Netlify UI:
  - `RESEND_API_KEY` (from resend.com)
  - `SUPABASE_SERVICE_URL`, `SUPABASE_SERVICE_ROLE_KEY`
  - Optional: `URL` (Netlify auto-populates in production)
  Functions auto-deployed from `netlify/functions`.
- Supabase: create project and a table `purchase_orders` with columns:
  - `id` uuid primary key default `uuid_generate_v4()`
  - `po_number` text
  - `user` text
  - `items` jsonb
  - `status` text
  - `approver_email` text
  - `approval_token` text
  - `created_at` timestamptz default now()
  - `approved_at` timestamptz

RLS can be configured later; this app currently reads/writes via service function endpoints.
