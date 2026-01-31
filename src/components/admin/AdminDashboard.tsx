import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { LogOut, Save, RefreshCw, User, FileText, Briefcase, GraduationCap, FolderOpen, Sparkles, Clock } from 'lucide-react';
import { ResumeData } from '@/hooks/useResumeData';
import { PersonalEditor } from './sections/PersonalEditor';
import { SummaryEditor } from './sections/SummaryEditor';
import { SkillsEditor } from './sections/SkillsEditor';
import { ExperienceEditor } from './sections/ExperienceEditor';
import { EducationEditor } from './sections/EducationEditor';
import { ProjectsEditor } from './sections/ProjectsEditor';
import { DevelopmentEditor } from './sections/DevelopmentEditor';

interface AdminDashboardProps {
  data: ResumeData;
  updatedAt: string | null;
  sessionToken: string;
  onLogout: () => void;
  onSave: (data: ResumeData, sessionToken: string) => Promise<{ success: boolean; error?: string }>;
  onRefresh: () => void;
}

export function AdminDashboard({ data, updatedAt, sessionToken, onLogout, onSave, onRefresh }: AdminDashboardProps) {
  const [editedData, setEditedData] = useState<ResumeData>(data);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const { toast } = useToast();

  const handleDataChange = (section: keyof ResumeData, value: any) => {
    setEditedData(prev => ({
      ...prev,
      [section]: value
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const result = await onSave(editedData, sessionToken);
    
    if (result.success) {
      toast({
        title: 'Changes saved',
        description: 'Your resume has been updated successfully.',
      });
      setHasChanges(false);
    } else {
      toast({
        title: 'Save failed',
        description: result.error || 'Could not save changes. Please try again.',
        variant: 'destructive',
      });
    }
    
    setIsSaving(false);
  };

  const handleRefresh = () => {
    onRefresh();
    setEditedData(data);
    setHasChanges(false);
    toast({
      title: 'Data refreshed',
      description: 'Resume content has been reloaded from the database.',
    });
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Resume Editor</h1>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Last updated: {formatDate(updatedAt)}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button 
              size="sm" 
              onClick={handleSave} 
              disabled={isSaving || !hasChanges}
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {hasChanges && (
          <Card className="mb-6 border-amber-500/50 bg-amber-50/50 dark:bg-amber-950/20">
            <CardContent className="py-3 flex items-center justify-between">
              <p className="text-sm text-amber-800 dark:text-amber-400">
                You have unsaved changes
              </p>
              <Button size="sm" onClick={handleSave} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Now'}
              </Button>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="flex flex-wrap h-auto gap-1 bg-muted p-1">
            <TabsTrigger value="personal" className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Personal</span>
            </TabsTrigger>
            <TabsTrigger value="summary" className="flex items-center gap-1">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Summary</span>
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center gap-1">
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Skills</span>
            </TabsTrigger>
            <TabsTrigger value="experience" className="flex items-center gap-1">
              <Briefcase className="w-4 h-4" />
              <span className="hidden sm:inline">Experience</span>
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center gap-1">
              <GraduationCap className="w-4 h-4" />
              <span className="hidden sm:inline">Education</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-1">
              <FolderOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Projects</span>
            </TabsTrigger>
            <TabsTrigger value="development" className="flex items-center gap-1">
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Development</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Basic contact and professional details</CardDescription>
              </CardHeader>
              <CardContent>
                <PersonalEditor 
                  data={editedData.personal} 
                  onChange={(value) => handleDataChange('personal', value)} 
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="summary">
            <Card>
              <CardHeader>
                <CardTitle>Summary & Mission</CardTitle>
                <CardDescription>Mission statement and executive summary points</CardDescription>
              </CardHeader>
              <CardContent>
                <SummaryEditor 
                  missionStatement={editedData.missionStatement}
                  executiveSummary={editedData.executiveSummary}
                  skillChips={editedData.skillChips}
                  onMissionChange={(value) => handleDataChange('missionStatement', value)}
                  onSummaryChange={(value) => handleDataChange('executiveSummary', value)}
                  onChipsChange={(value) => handleDataChange('skillChips', value)}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <CardTitle>Skills Taxonomy</CardTitle>
                <CardDescription>Skill categories with proficiency levels and years of experience</CardDescription>
              </CardHeader>
              <CardContent>
                <SkillsEditor 
                  data={editedData.skills}
                  onChange={(value) => handleDataChange('skills', value)}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experience">
            <Card>
              <CardHeader>
                <CardTitle>Professional Experience</CardTitle>
                <CardDescription>Work history with responsibilities and outcomes</CardDescription>
              </CardHeader>
              <CardContent>
                <ExperienceEditor 
                  data={editedData.experience}
                  onChange={(value) => handleDataChange('experience', value)}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="education">
            <Card>
              <CardHeader>
                <CardTitle>Education & Certifications</CardTitle>
                <CardDescription>Academic credentials and professional development</CardDescription>
              </CardHeader>
              <CardContent>
                <EducationEditor 
                  education={editedData.education}
                  certifications={editedData.certifications}
                  onEducationChange={(value) => handleDataChange('education', value)}
                  onCertificationsChange={(value) => handleDataChange('certifications', value)}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Key Projects</CardTitle>
                <CardDescription>Notable projects and case studies</CardDescription>
              </CardHeader>
              <CardContent>
                <ProjectsEditor 
                  data={editedData.projects}
                  onChange={(value) => handleDataChange('projects', value)}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="development">
            <Card>
              <CardHeader>
                <CardTitle>Strengths & Development</CardTitle>
                <CardDescription>Strengths, development areas, gaps, and learning plan</CardDescription>
              </CardHeader>
              <CardContent>
                <DevelopmentEditor 
                  strengths={editedData.strengths}
                  developmentAreas={editedData.developmentAreas}
                  gaps={editedData.gaps}
                  learningPlan={editedData.learningPlan}
                  onStrengthsChange={(value) => handleDataChange('strengths', value)}
                  onDevelopmentAreasChange={(value) => handleDataChange('developmentAreas', value)}
                  onGapsChange={(value) => handleDataChange('gaps', value)}
                  onLearningPlanChange={(value) => handleDataChange('learningPlan', value)}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
