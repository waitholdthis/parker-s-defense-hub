import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

const SESSION_KEY = 'admin_session_token';

interface UseAdminAuthReturn {
  isAuthenticated: boolean;
  isLoading: boolean;
  sessionToken: string | null;
  login: (password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

export function useAdminAuth(): UseAdminAuthReturn {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionToken, setSessionToken] = useState<string | null>(null);

  const verifySession = useCallback(async (token: string): Promise<boolean> => {
    try {
      const { data: result, error } = await supabase.functions.invoke('admin-login', {
        body: { action: 'verify', sessionToken: token }
      });

      if (error) {
        console.error('Session verification error:', error);
        return false;
      }

      return result?.valid === true;
    } catch (err) {
      console.error('Session verification failed:', err);
      return false;
    }
  }, []);

  // Check session on mount
  useEffect(() => {
    const checkSession = async () => {
      const storedToken = localStorage.getItem(SESSION_KEY);
      
      if (storedToken) {
        const isValid = await verifySession(storedToken);
        if (isValid) {
          setSessionToken(storedToken);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem(SESSION_KEY);
        }
      }
      
      setIsLoading(false);
    };

    checkSession();
  }, [verifySession]);

  const login = useCallback(async (password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data: result, error } = await supabase.functions.invoke('admin-login', {
        body: { action: 'login', password }
      });

      if (error) {
        return { success: false, error: 'Login failed. Please try again.' };
      }

      if (result.error) {
        return { success: false, error: result.error };
      }

      if (result.success && result.sessionToken) {
        localStorage.setItem(SESSION_KEY, result.sessionToken);
        setSessionToken(result.sessionToken);
        setIsAuthenticated(true);
        return { success: true };
      }

      return { success: false, error: 'Unexpected login response' };
    } catch (err) {
      console.error('Login error:', err);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      if (sessionToken) {
        await supabase.functions.invoke('admin-login', {
          body: { action: 'logout', sessionToken }
        });
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem(SESSION_KEY);
      setSessionToken(null);
      setIsAuthenticated(false);
    }
  }, [sessionToken]);

  return {
    isAuthenticated,
    isLoading,
    sessionToken,
    login,
    logout
  };
}
