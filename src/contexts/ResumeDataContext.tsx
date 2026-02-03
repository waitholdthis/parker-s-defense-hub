import { createContext, useContext, ReactNode } from 'react';
import { useResumeData, ResumeData } from '@/hooks/useResumeData';
import { Loader2 } from 'lucide-react';

interface ResumeDataContextType {
  data: ResumeData;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const ResumeDataContext = createContext<ResumeDataContextType | null>(null);

export function ResumeDataProvider({ children }: { children: ReactNode }) {
  const { data, loading, error, refetch } = useResumeData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">{error || 'Failed to load resume data'}</p>
          <button 
            onClick={refetch}
            className="text-primary underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <ResumeDataContext.Provider value={{ data, loading, error, refetch }}>
      {children}
    </ResumeDataContext.Provider>
  );
}

export function useResumeDataContext(): ResumeDataContextType {
  const context = useContext(ResumeDataContext);
  if (!context) {
    throw new Error('useResumeDataContext must be used within a ResumeDataProvider');
  }
  return context;
}
