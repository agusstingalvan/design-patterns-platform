-- Function to get user by email
-- This function is needed for inviting collaborators
-- Run this in your Supabase SQL Editor

CREATE OR REPLACE FUNCTION get_user_by_email(email_param text)
RETURNS TABLE (id uuid) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT au.id
  FROM auth.users au
  WHERE au.email = email_param;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION get_user_by_email(text) TO authenticated;
