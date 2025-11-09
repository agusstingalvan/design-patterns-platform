-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.categories (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT categories_pkey PRIMARY KEY (id)
);
CREATE TABLE public.patterns (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  team_id uuid,
  user_id uuid,
  pattern jsonb NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  category_id uuid,
  project_id uuid,
  CONSTRAINT patterns_pkey PRIMARY KEY (id),
  CONSTRAINT fk_patterns_team FOREIGN KEY (team_id) REFERENCES public.teams(id),
  CONSTRAINT fk_patterns_user FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT fk_patterns_category FOREIGN KEY (category_id) REFERENCES public.categories(id),
  CONSTRAINT fk_patterns_project FOREIGN KEY (project_id) REFERENCES public.projects(id)
);
CREATE TABLE public.profiles (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  team_id uuid,
  name text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  avatar_url text,
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT fk_profiles_user FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT fk_profiles_team FOREIGN KEY (team_id) REFERENCES public.teams(id)
);
CREATE TABLE public.projects (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  shared boolean NOT NULL DEFAULT false,
  team_id uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT projects_pkey PRIMARY KEY (id),
  CONSTRAINT fk_projects_team FOREIGN KEY (team_id) REFERENCES public.teams(id)
);
CREATE TABLE public.teams (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT teams_pkey PRIMARY KEY (id)
);