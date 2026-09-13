-- =================================================================
-- KUNALISTIC PRODUCTION DATABASE SCHEMA & ROW LEVEL SECURITY
-- Primary Colors: Champion Blue (#151130), Lavender Tonic (#C8BEFA)
-- =================================================================

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- 2. Favorites Table
CREATE TABLE IF NOT EXISTS public.favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  tool_slug TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, tool_slug)
);

ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own favorites"
  ON public.favorites FOR ALL
  USING (auth.uid() = user_id);

-- 3. Tool Usage History Table
CREATE TABLE IF NOT EXISTS public.tool_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  tool_slug TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  status TEXT DEFAULT 'completed',
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.tool_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own history"
  ON public.tool_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert history"
  ON public.tool_history FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- 4. Saved Tool & AI Outputs
CREATE TABLE IF NOT EXISTS public.saved_outputs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  tool_slug TEXT NOT NULL,
  title TEXT NOT NULL,
  content_json JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.saved_outputs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their saved outputs"
  ON public.saved_outputs FOR ALL
  USING (auth.uid() = user_id);

-- 5. Voluntary Support Transactions (No sensitive credentials stored!)
CREATE TABLE IF NOT EXISTS public.support_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  provider TEXT NOT NULL,
  provider_order_id TEXT NOT NULL,
  provider_payment_id TEXT,
  amount NUMERIC(10, 2) NOT NULL,
  currency TEXT DEFAULT 'INR' NOT NULL,
  status TEXT NOT NULL, -- 'pending', 'completed', 'failed', 'refunded'
  supporter_display_name TEXT,
  supporter_message TEXT,
  show_on_supporter_wall BOOLEAN DEFAULT false,
  moderation_status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'hidden'
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  completed_at TIMESTAMPTZ
);

ALTER TABLE public.support_transactions ENABLE ROW LEVEL SECURITY;

-- Public can view approved supporter wall items
CREATE POLICY "Public can view approved supporter wall entries"
  ON public.support_transactions FOR SELECT
  USING (show_on_supporter_wall = true AND moderation_status = 'approved');

-- 6. System Settings
CREATE TABLE IF NOT EXISTS public.system_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read for system settings"
  ON public.system_settings FOR SELECT
  TO PUBLIC
  USING (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_favorites_user ON public.favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_history_user ON public.tool_history(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_user ON public.saved_outputs(user_id);
CREATE INDEX IF NOT EXISTS idx_support_wall ON public.support_transactions(show_on_supporter_wall, moderation_status);
