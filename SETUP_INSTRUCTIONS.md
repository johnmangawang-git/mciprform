# MCI Online PR Form - Setup Instructions

## Database Setup

### 1. Supabase Configuration
Your Supabase credentials are already configured in the `.env` file:
- URL: https://mmxoptgjgfogygnlhoan.supabase.co
- Anon Key: Already set

### 2. Database Schema Setup
1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `database_schema.sql`
4. Run the SQL script to create all necessary tables and policies

### 3. Create Admin User
1. Sign up for an account in your application
2. After creating the account, go to Supabase dashboard
3. Navigate to Authentication > Users
4. Find your user ID
5. Go to SQL Editor and run:
```sql
INSERT INTO user_profiles (id, email, role) 
VALUES ('your-user-id-here', 'your-email@example.com', 'admin');
```

## Features Fixed

### 1. Order History
- ✅ Proper database schema with JSONB storage for items
- ✅ Real-time updates using Supabase subscriptions
- ✅ Admin can see all orders, users see only their own
- ✅ Proper data transformation between database and frontend
- ✅ Enhanced error handling

### 2. Submit Order Function
- ✅ Improved error handling and validation
- ✅ Proper database insertion with correct field mapping
- ✅ Transaction-like behavior (items + order history)
- ✅ Loading states for better UX
- ✅ Automatic PR number generation

### 3. Database Integration
- ✅ Central database with Row Level Security
- ✅ Real-time synchronization across all users
- ✅ Proper user authentication and authorization
- ✅ Admin vs regular user permissions

### 4. Data Structure
- ✅ Fixed type mismatches between frontend and database
- ✅ Proper JSONB storage for complex data
- ✅ Enhanced TypeScript interfaces
- ✅ Database field mapping

## How to Test

### 1. Start the Application
```bash
npm run dev
```

### 2. Create Test Users
1. Create a regular user account
2. Create an admin user account (follow admin setup above)

### 3. Test Order Submission
1. Login as regular user
2. Add items to the order
3. Click "Submit Order"
4. Check that order appears in Order History

### 4. Test Admin Features
1. Login as admin
2. Check that you can see all users' orders
3. Test "Save all Orders" functionality
4. Test upload items feature (admin only)

### 5. Test Real-time Updates
1. Open application in two browser windows
2. Login as different users
3. Submit an order in one window
4. Check that admin can see the new order immediately

## Database Tables

### user_profiles
- Stores user roles (admin/user)
- Links to Supabase auth users

### lookup_data
- Item code lookup information
- Description and UOM data

### pr_items
- Individual purchase request items
- Links to users and PR numbers

### order_history
- Complete order records
- Stores items as JSONB
- Tracks totals and status

## Security Features

- Row Level Security (RLS) enabled
- Users can only see their own data (except admins)
- Proper authentication required
- Admin-only features protected

## Troubleshooting

### Common Issues
1. **Login fails**: Check Supabase URL and keys in .env
2. **No order history**: Ensure database schema is properly set up
3. **Permission errors**: Check user_profiles table and RLS policies
4. **Real-time not working**: Check Supabase realtime is enabled

### Debug Steps
1. Check browser console for errors
2. Verify Supabase connection in Network tab
3. Check user_profiles table for proper role assignment
4. Ensure all database tables exist