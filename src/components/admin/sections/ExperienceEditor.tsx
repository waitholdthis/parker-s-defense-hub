import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Plus, X, ChevronDown, ChevronRight } from 'lucide-react';

interface Experience {
  id: string;
  title: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  missionContext: string;
  responsibilities: string[];
  outcomes: string[];
}

interface ExperienceEditorProps {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

export function ExperienceEditor({ data, onChange }: ExperienceEditorProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([0]));

  const toggleItem = (index: number) => {
    const newOpen = new Set(openItems);
    if (newOpen.has(index)) {
      newOpen.delete(index);
    } else {
      newOpen.add(index);
    }
    setOpenItems(newOpen);
  };

  const handleChange = (index: number, field: keyof Experience, value: any) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleResponsibilityChange = (expIndex: number, respIndex: number, value: string) => {
    const updated = [...data];
    updated[expIndex].responsibilities[respIndex] = value;
    onChange(updated);
  };

  const handleOutcomeChange = (expIndex: number, outcomeIndex: number, value: string) => {
    const updated = [...data];
    updated[expIndex].outcomes[outcomeIndex] = value;
    onChange(updated);
  };

  const addResponsibility = (expIndex: number) => {
    const updated = [...data];
    updated[expIndex].responsibilities.push('');
    onChange(updated);
  };

  const removeResponsibility = (expIndex: number, respIndex: number) => {
    const updated = [...data];
    updated[expIndex].responsibilities = updated[expIndex].responsibilities.filter((_, i) => i !== respIndex);
    onChange(updated);
  };

  const addOutcome = (expIndex: number) => {
    const updated = [...data];
    updated[expIndex].outcomes.push('');
    onChange(updated);
  };

  const removeOutcome = (expIndex: number, outcomeIndex: number) => {
    const updated = [...data];
    updated[expIndex].outcomes = updated[expIndex].outcomes.filter((_, i) => i !== outcomeIndex);
    onChange(updated);
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: `exp-${Date.now()}`,
      title: '',
      organization: '',
      location: '',
      startDate: '',
      endDate: '',
      missionContext: '',
      responsibilities: [],
      outcomes: []
    };
    onChange([...data, newExp]);
    setOpenItems(prev => new Set([...prev, data.length]));
  };

  const removeExperience = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {data.map((exp, expIndex) => (
        <Collapsible 
          key={exp.id}
          open={openItems.has(expIndex)}
          onOpenChange={() => toggleItem(expIndex)}
        >
          <div className="border rounded-lg">
            <CollapsibleTrigger asChild>
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50">
                <div className="flex items-center gap-2">
                  {openItems.has(expIndex) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                  <div>
                    <span className="font-medium">{exp.title || 'New Position'}</span>
                    <span className="text-muted-foreground text-sm ml-2">
                      {exp.organization && `at ${exp.organization}`}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeExperience(expIndex);
                  }}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <div className="px-4 pb-4 space-y-4 border-t pt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Job Title</Label>
                    <Input
                      value={exp.title}
                      onChange={(e) => handleChange(expIndex, 'title', e.target.value)}
                      placeholder="e.g., Senior CBRN Warrant Officer"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Organization</Label>
                    <Input
                      value={exp.organization}
                      onChange={(e) => handleChange(expIndex, 'organization', e.target.value)}
                      placeholder="e.g., 18th Airborne Corps"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input
                      value={exp.location}
                      onChange={(e) => handleChange(expIndex, 'location', e.target.value)}
                      placeholder="e.g., Fort Liberty, NC"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input
                        value={exp.startDate}
                        onChange={(e) => handleChange(expIndex, 'startDate', e.target.value)}
                        placeholder="e.g., 2021"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input
                        value={exp.endDate}
                        onChange={(e) => handleChange(expIndex, 'endDate', e.target.value)}
                        placeholder="e.g., Present"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Mission Context</Label>
                  <Textarea
                    value={exp.missionContext}
                    onChange={(e) => handleChange(expIndex, 'missionContext', e.target.value)}
                    placeholder="Describe the mission and your role..."
                    rows={3}
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Key Responsibilities</Label>
                    <Button variant="outline" size="sm" onClick={() => addResponsibility(expIndex)}>
                      <Plus className="w-3 h-3 mr-1" />
                      Add
                    </Button>
                  </div>
                  {exp.responsibilities.map((resp, respIndex) => (
                    <div key={respIndex} className="flex gap-2">
                      <Input
                        value={resp}
                        onChange={(e) => handleResponsibilityChange(expIndex, respIndex, e.target.value)}
                        placeholder="Describe responsibility..."
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeResponsibility(expIndex, respIndex)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Key Outcomes</Label>
                    <Button variant="outline" size="sm" onClick={() => addOutcome(expIndex)}>
                      <Plus className="w-3 h-3 mr-1" />
                      Add
                    </Button>
                  </div>
                  {exp.outcomes.map((outcome, outcomeIndex) => (
                    <div key={outcomeIndex} className="flex gap-2">
                      <Input
                        value={outcome}
                        onChange={(e) => handleOutcomeChange(expIndex, outcomeIndex, e.target.value)}
                        placeholder="Describe measurable outcome..."
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeOutcome(expIndex, outcomeIndex)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      ))}

      <Button variant="outline" onClick={addExperience} className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add Experience
      </Button>
    </div>
  );
}
