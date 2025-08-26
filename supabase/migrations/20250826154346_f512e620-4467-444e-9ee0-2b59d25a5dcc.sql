-- Create users table for authentication
CREATE TABLE public.users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  user_type TEXT NOT NULL CHECK (user_type IN ('tourist', 'police')),
  full_name TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tourist_profiles table
CREATE TABLE public.tourist_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  tourist_id TEXT NOT NULL UNIQUE,
  current_location JSONB,
  destination JSONB,
  route_data JSONB,
  current_checkpoint INTEGER DEFAULT 0,
  credit_score INTEGER DEFAULT 100,
  status TEXT DEFAULT 'offline' CHECK (status IN ('offline', 'online', 'moving', 'idle', 'restricted')),
  last_seen TIMESTAMP WITH TIME ZONE DEFAULT now(),
  emergency_contact TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create location_tracking table
CREATE TABLE public.location_tracking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tourist_id TEXT NOT NULL REFERENCES public.tourist_profiles(tourist_id) ON DELETE CASCADE,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  checkpoint_reached INTEGER,
  zone_type TEXT CHECK (zone_type IN ('green', 'yellow', 'red', 'orange')),
  deviation_distance DECIMAL(10, 2) DEFAULT 0,
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create alerts table
CREATE TABLE public.alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tourist_id TEXT NOT NULL REFERENCES public.tourist_profiles(tourist_id) ON DELETE CASCADE,
  alert_type TEXT NOT NULL CHECK (alert_type IN ('offline_device', 'idle_tourist', 'checkpoint_missed', 'route_deviation', 'restricted_zone')),
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  message TEXT NOT NULL,
  zone_type TEXT CHECK (zone_type IN ('green', 'yellow', 'red', 'orange')),
  action_taken TEXT,
  sms_sent BOOLEAN DEFAULT FALSE,
  police_notified BOOLEAN DEFAULT FALSE,
  resolved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- Create simulation_sessions table
CREATE TABLE public.simulation_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_name TEXT NOT NULL,
  status TEXT DEFAULT 'stopped' CHECK (status IN ('stopped', 'running', 'completed')),
  start_time TIMESTAMP WITH TIME ZONE,
  end_time TIMESTAMP WITH TIME ZONE,
  participants JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tourist_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.location_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.simulation_sessions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for users
CREATE POLICY "Users can view their own data" ON public.users
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own data" ON public.users
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own data" ON public.users
  FOR UPDATE USING (true);

-- Create RLS policies for tourist_profiles
CREATE POLICY "Tourist profiles are viewable by everyone" ON public.tourist_profiles
  FOR SELECT USING (true);

CREATE POLICY "Tourists can insert their own profile" ON public.tourist_profiles
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Tourists can update their own profile" ON public.tourist_profiles
  FOR UPDATE USING (true);

-- Create RLS policies for location_tracking
CREATE POLICY "Location tracking viewable by everyone" ON public.location_tracking
  FOR SELECT USING (true);

CREATE POLICY "Location tracking insertable" ON public.location_tracking
  FOR INSERT WITH CHECK (true);

-- Create RLS policies for alerts
CREATE POLICY "Alerts viewable by everyone" ON public.alerts
  FOR SELECT USING (true);

CREATE POLICY "Alerts insertable" ON public.alerts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Alerts updatable" ON public.alerts
  FOR UPDATE USING (true);

-- Create RLS policies for simulation_sessions
CREATE POLICY "Simulation sessions viewable by everyone" ON public.simulation_sessions
  FOR SELECT USING (true);

CREATE POLICY "Simulation sessions manageable" ON public.simulation_sessions
  FOR ALL USING (true);

-- Create function to generate tourist ID
CREATE OR REPLACE FUNCTION generate_tourist_id()
RETURNS TEXT AS $$
BEGIN
  RETURN 'T' || LPAD((EXTRACT(EPOCH FROM NOW())::BIGINT % 100000)::TEXT, 5, '0');
END;
$$ LANGUAGE plpgsql;

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for timestamp updates
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tourist_profiles_updated_at
  BEFORE UPDATE ON public.tourist_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable realtime for all tables
ALTER TABLE public.tourist_profiles REPLICA IDENTITY FULL;
ALTER TABLE public.location_tracking REPLICA IDENTITY FULL;
ALTER TABLE public.alerts REPLICA IDENTITY FULL;
ALTER TABLE public.simulation_sessions REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.tourist_profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.location_tracking;
ALTER PUBLICATION supabase_realtime ADD TABLE public.alerts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.simulation_sessions;