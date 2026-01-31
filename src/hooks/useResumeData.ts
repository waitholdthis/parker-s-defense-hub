import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ResumeData {
  personal: {
    name: string;
    title: string;
    organization: string;
    location: string;
    email: string;
    linkedin: string;
    phone: string;
    availability: string;
    travelWillingness: string;
    clearance: string;
  };
  missionStatement: string;
  skillChips: string[];
  executiveSummary: string[];
  skills: {
    categories: Array<{
      name: string;
      skills: Array<{
        name: string;
        proficiency: string;
        years: number;
      }>;
    }>;
  };
  experience: Array<{
    id: string;
    title: string;
    organization: string;
    location: string;
    startDate: string;
    endDate: string;
    missionContext: string;
    responsibilities: string[];
    outcomes: string[];
  }>;
  education: Array<{
    id: string;
    type: string;
    title: string;
    institution: string;
    location: string;
    completionDate: string;
    status: string;
    description: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    status: string;
  }>;
  projects: Array<{
    id: string;
    title: string;
    problem: string;
    role: string;
    approach: string;
    outcome: string;
    tools: string[];
  }>;
  strengths: string[];
  developmentAreas: string[];
  gaps: Array<{
    gap: string;
    mitigation: string;
  }>;
  learningPlan: Array<{
    item: string;
    targetDate: string;
    status: string;
  }>;
  publications: any[];
  speaking: any[];
  awards: any[];
}

interface UseResumeDataReturn {
  data: ResumeData | null;
  loading: boolean;
  error: string | null;
  updatedAt: string | null;
  refetch: () => Promise<void>;
  updateData: (newData: ResumeData, sessionToken: string) => Promise<{ success: boolean; error?: string }>;
}

export function useResumeData(): UseResumeDataReturn {
  const [data, setData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: result, error: invokeError } = await supabase.functions.invoke('admin-resume', {
        body: { action: 'get' }
      });

      if (invokeError) {
        throw invokeError;
      }

      if (result.error) {
        throw new Error(result.error);
      }

      setData(result.content);
      setUpdatedAt(result.updatedAt);
    } catch (err) {
      console.error('Error fetching resume data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch resume data');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateData = useCallback(async (newData: ResumeData, sessionToken: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data: result, error: invokeError } = await supabase.functions.invoke('admin-resume', {
        body: { 
          action: 'update',
          sessionToken,
          content: newData
        }
      });

      if (invokeError) {
        throw invokeError;
      }

      if (result.error) {
        return { success: false, error: result.error };
      }

      // Refetch to get latest data
      await fetchData();
      return { success: true };
    } catch (err) {
      console.error('Error updating resume data:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to update resume data' 
      };
    }
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    updatedAt,
    refetch: fetchData,
    updateData
  };
}
