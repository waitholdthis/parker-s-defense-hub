import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useResumeData } from '@/hooks/useResumeData';
import { AdminAuth } from '@/components/admin/AdminAuth';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { Loader2 } from 'lucide-react';

export default function Admin() {
  const { isAuthenticated, isLoading: authLoading, sessionToken, login, logout } = useAdminAuth();
  const { data, loading: dataLoading, error, updatedAt, refetch, updateData } = useResumeData();

  // Loading state
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Not authenticated - show login
  if (!isAuthenticated) {
    return <AdminAuth onLogin={login} />;
  }

  // Loading resume data
  if (dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Loading resume data...</p>
        </div>
      </div>
    );
  }

  // Error state
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
    <AdminDashboard
      data={data}
      updatedAt={updatedAt}
      sessionToken={sessionToken!}
      onLogout={logout}
      onSave={updateData}
      onRefresh={refetch}
    />
  );
}
