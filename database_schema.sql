-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create lookup_data table
CREATE TABLE IF NOT EXISTS lookup_data (
  id SERIAL PRIMARY KEY,
  item_code TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  uom TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create pr_items table
CREATE TABLE IF NOT EXISTS pr_items (
  id SERIAL PRIMARY KEY,
  pr_number TEXT NOT NULL,
  item_code TEXT NOT NULL,
  description TEXT NOT NULL,
  uom TEXT NOT NULL,
  supplier TEXT NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  quantity INTEGER NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  soh INTEGER DEFAULT 0,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order_history table
CREATE TABLE IF NOT EXISTS order_history (
  id SERIAL PRIMARY KEY,
  po_number TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  status TEXT DEFAULT 'Pending',
  user_id UUID REFERENCES auth.users(id),
  total_amount DECIMAL(10,2) NOT NULL,
  total_items INTEGER NOT NULL,
  items_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE lookup_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE pr_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_history ENABLE ROW LEVEL SECURITY;

-- Create policies for user_profiles
CREATE POLICY "Users can view their own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create policies for lookup_data (read-only for all authenticated users)
CREATE POLICY "Authenticated users can view lookup data" ON lookup_data
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Only admins can modify lookup data" ON lookup_data
  FOR ALL TO authenticated USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create policies for pr_items
CREATE POLICY "Users can view all pr_items" ON pr_items
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can insert their own pr_items" ON pr_items
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pr_items" ON pr_items
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own pr_items" ON pr_items
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Create policies for order_history
CREATE POLICY "Users can view their own orders, admins can view all" ON order_history
  FOR SELECT TO authenticated USING (
    auth.uid() = user_id OR 
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Users can insert their own orders" ON order_history
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Only admins can update orders" ON order_history
  FOR UPDATE TO authenticated USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_pr_items_user_id ON pr_items(user_id);
CREATE INDEX IF NOT EXISTS idx_pr_items_pr_number ON pr_items(pr_number);
CREATE INDEX IF NOT EXISTS idx_order_history_user_id ON order_history(user_id);
CREATE INDEX IF NOT EXISTS idx_order_history_created_at ON order_history(created_at);
CREATE INDEX IF NOT EXISTS idx_lookup_data_item_code ON lookup_data(item_code);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lookup_data_updated_at BEFORE UPDATE ON lookup_data
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_order_history_updated_at BEFORE UPDATE ON order_history
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample admin user (replace with your actual user ID after creating an account)
-- INSERT INTO user_profiles (id, email, role) 
-- VALUES ('your-user-id-here', 'admin@example.com', 'admin');

-- Insert some sample lookup data
INSERT INTO lookup_data (item_code, description, uom) VALUES
('ITEM001', 'Sample Item 1', 'PCS'),
('ITEM002', 'Sample Item 2', 'KG'),
('ITEM003', 'Sample Item 3', 'METER')
ON CONFLICT (item_code) DO NOTHING;