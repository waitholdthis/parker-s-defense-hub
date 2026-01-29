-- Create admin_users table for password-based admin authentication
CREATE TABLE public.admin_users (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    username TEXT NOT NULL UNIQUE DEFAULT 'admin',
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on admin_users (will deny all access - only edge functions with service role can access)
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create resume_content table to store the JSON content (single row)
CREATE TABLE public.resume_content (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    content JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_by UUID REFERENCES public.admin_users(id)
);

-- Enable RLS on resume_content
ALTER TABLE public.resume_content ENABLE ROW LEVEL SECURITY;

-- Create admin_sessions table for session management
CREATE TABLE public.admin_sessions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    admin_user_id UUID NOT NULL REFERENCES public.admin_users(id) ON DELETE CASCADE,
    session_token TEXT NOT NULL UNIQUE,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on admin_sessions (deny all access via RLS - only edge functions access)
ALTER TABLE public.admin_sessions ENABLE ROW LEVEL SECURITY;

-- Helper function: Check if a session token is valid
CREATE OR REPLACE FUNCTION public.is_valid_admin_session(token TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.admin_sessions
        WHERE session_token = token
        AND expires_at > now()
    )
$$;

-- RLS Policy: Everyone can read resume_content (public access for the website)
CREATE POLICY "Public can read resume content"
ON public.resume_content
FOR SELECT
USING (true);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_resume_content_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_resume_content_updated_at
BEFORE UPDATE ON public.resume_content
FOR EACH ROW
EXECUTE FUNCTION public.update_resume_content_updated_at();