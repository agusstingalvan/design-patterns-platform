-- ============================================
-- TRIGGERS
-- ============================================

-- Trigger to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (user_id, name, avatar_url)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email),
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists and create new one
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patterns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PROFILES POLICIES
-- ============================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;

-- SELECT: Users can view their own profile and profiles in their team
CREATE POLICY "Users can view profiles"
  ON public.profiles FOR SELECT
  USING (
    user_id = auth.uid()
    OR team_id IN (
      SELECT team_id FROM public.profiles WHERE user_id = auth.uid()
    )
  );

-- UPDATE: Users can only update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (user_id = auth.uid());

-- INSERT: System can create profiles (via trigger)
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- ============================================
-- TEAMS POLICIES
-- ============================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their teams" ON public.teams;
DROP POLICY IF EXISTS "Users can create teams" ON public.teams;

-- SELECT: Users can view teams they belong to
CREATE POLICY "Users can view their teams"
  ON public.teams FOR SELECT
  USING (
    id IN (
      SELECT team_id FROM public.profiles WHERE user_id = auth.uid()
    )
  );

-- INSERT: Authenticated users can create teams
CREATE POLICY "Users can create teams"
  ON public.teams FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- ============================================
-- PROJECTS POLICIES
-- ============================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view accessible projects" ON public.projects;
DROP POLICY IF EXISTS "Users can create projects" ON public.projects;

-- SELECT: Users can view their own projects and team projects
CREATE POLICY "Users can view accessible projects"
  ON public.projects FOR SELECT
  USING (
    -- Check if user created patterns for this project
    EXISTS (
      SELECT 1 FROM public.patterns
      WHERE patterns.project_id = projects.id
      AND patterns.user_id = auth.uid()
    )
    OR
    -- Team projects (shared)
    (
      shared = true
      AND team_id IN (
        SELECT team_id FROM public.profiles WHERE user_id = auth.uid()
      )
    )
  );

-- INSERT: Authenticated users can create projects
CREATE POLICY "Users can create projects"
  ON public.projects FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- ============================================
-- PATTERNS POLICIES
-- ============================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view accessible patterns" ON public.patterns;
DROP POLICY IF EXISTS "Users can create patterns" ON public.patterns;

-- SELECT: Users can view their own patterns and team patterns
CREATE POLICY "Users can view accessible patterns"
  ON public.patterns FOR SELECT
  USING (
    user_id = auth.uid()
    OR
    (
      team_id IN (
        SELECT team_id FROM public.profiles WHERE user_id = auth.uid()
      )
    )
  );

-- INSERT: Authenticated users can create their own patterns
CREATE POLICY "Users can create patterns"
  ON public.patterns FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- ============================================
-- CATEGORIES POLICIES
-- ============================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view categories" ON public.categories;

-- SELECT: Anyone can view categories (they are public reference data)
CREATE POLICY "Anyone can view categories"
  ON public.categories FOR SELECT
  USING (true);
