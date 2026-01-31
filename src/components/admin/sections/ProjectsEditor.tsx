import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { Plus, X, ChevronDown, ChevronRight } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  problem: string;
  role: string;
  approach: string;
  outcome: string;
  tools: string[];
}

interface ProjectsEditorProps {
  data: Project[];
  onChange: (data: Project[]) => void;
}

export function ProjectsEditor({ data, onChange }: ProjectsEditorProps) {
  const [openProjects, setOpenProjects] = useState<Set<number>>(new Set([0]));

  const toggleProject = (index: number) => {
    const newOpen = new Set(openProjects);
    if (newOpen.has(index)) {
      newOpen.delete(index);
    } else {
      newOpen.add(index);
    }
    setOpenProjects(newOpen);
  };

  const handleChange = (index: number, field: keyof Project, value: any) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const addTool = (projectIndex: number) => {
    const newTool = prompt('Enter tool/technology name:');
    if (newTool?.trim()) {
      const updated = [...data];
      updated[projectIndex].tools.push(newTool.trim());
      onChange(updated);
    }
  };

  const removeTool = (projectIndex: number, toolIndex: number) => {
    const updated = [...data];
    updated[projectIndex].tools = updated[projectIndex].tools.filter((_, i) => i !== toolIndex);
    onChange(updated);
  };

  const addProject = () => {
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      title: '',
      problem: '',
      role: '',
      approach: '',
      outcome: '',
      tools: []
    };
    onChange([...data, newProject]);
    setOpenProjects(prev => new Set([...prev, data.length]));
  };

  const removeProject = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {data.map((project, index) => (
        <Collapsible 
          key={project.id}
          open={openProjects.has(index)}
          onOpenChange={() => toggleProject(index)}
        >
          <div className="border rounded-lg">
            <CollapsibleTrigger asChild>
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50">
                <div className="flex items-center gap-2">
                  {openProjects.has(index) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                  <span className="font-medium">{project.title || 'New Project'}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeProject(index);
                  }}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <div className="px-4 pb-4 space-y-4 border-t pt-4">
                <div className="space-y-2">
                  <Label>Project Title</Label>
                  <Input
                    value={project.title}
                    onChange={(e) => handleChange(index, 'title', e.target.value)}
                    placeholder="e.g., Corps-Wide CBRN Readiness Assessment Program"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Your Role</Label>
                    <Input
                      value={project.role}
                      onChange={(e) => handleChange(index, 'role', e.target.value)}
                      placeholder="e.g., Program Lead and Principal Developer"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Problem Statement</Label>
                  <Textarea
                    value={project.problem}
                    onChange={(e) => handleChange(index, 'problem', e.target.value)}
                    placeholder="What problem or challenge did this project address?"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Approach</Label>
                  <Textarea
                    value={project.approach}
                    onChange={(e) => handleChange(index, 'approach', e.target.value)}
                    placeholder="How did you approach solving this problem?"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Outcome</Label>
                  <Textarea
                    value={project.outcome}
                    onChange={(e) => handleChange(index, 'outcome', e.target.value)}
                    placeholder="What were the measurable results and impact?"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tools & Methods</Label>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool, toolIndex) => (
                      <Badge 
                        key={toolIndex} 
                        variant="secondary" 
                        className="flex items-center gap-1 pr-1"
                      >
                        {tool}
                        <button
                          onClick={() => removeTool(index, toolIndex)}
                          className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                    <Button variant="outline" size="sm" onClick={() => addTool(index)}>
                      <Plus className="w-3 h-3 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      ))}

      <Button variant="outline" onClick={addProject} className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add Project
      </Button>
    </div>
  );
}
