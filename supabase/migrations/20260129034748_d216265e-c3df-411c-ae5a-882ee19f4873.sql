-- Add explicit deny-all policies for admin_users and admin_sessions
-- These tables are only accessed by edge functions using service role key

-- Deny all operations on admin_users (edge functions bypass RLS with service role)
CREATE POLICY "Deny all access to admin_users"
ON public.admin_users
FOR ALL
USING (false)
WITH CHECK (false);

-- Deny all operations on admin_sessions (edge functions bypass RLS with service role)
CREATE POLICY "Deny all access to admin_sessions"
ON public.admin_sessions
FOR ALL
USING (false)
WITH CHECK (false);