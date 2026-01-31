import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Plus, X } from 'lucide-react';

interface Gap {
  gap: string;
  mitigation: string;
}

interface LearningItem {
  item: string;
  targetDate: string;
  status: string;
}

interface DevelopmentEditorProps {
  strengths: string[];
  developmentAreas: string[];
  gaps: Gap[];
  learningPlan: LearningItem[];
  onStrengthsChange: (value: string[]) => void;
  onDevelopmentAreasChange: (value: string[]) => void;
  onGapsChange: (value: Gap[]) => void;
  onLearningPlanChange: (value: LearningItem[]) => void;
}

export function DevelopmentEditor({
  strengths,
  developmentAreas,
  gaps,
  learningPlan,
  onStrengthsChange,
  onDevelopmentAreasChange,
  onGapsChange,
  onLearningPlanChange
}: DevelopmentEditorProps) {
  
  // Strengths handlers
  const handleStrengthChange = (index: number, value: string) => {
    const updated = [...strengths];
    updated[index] = value;
    onStrengthsChange(updated);
  };

  const addStrength = () => {
    onStrengthsChange([...strengths, '']);
  };

  const removeStrength = (index: number) => {
    onStrengthsChange(strengths.filter((_, i) => i !== index));
  };

  // Development areas handlers
  const handleDevAreaChange = (index: number, value: string) => {
    const updated = [...developmentAreas];
    updated[index] = value;
    onDevelopmentAreasChange(updated);
  };

  const addDevArea = () => {
    onDevelopmentAreasChange([...developmentAreas, '']);
  };

  const removeDevArea = (index: number) => {
    onDevelopmentAreasChange(developmentAreas.filter((_, i) => i !== index));
  };

  // Gaps handlers
  const handleGapChange = (index: number, field: keyof Gap, value: string) => {
    const updated = [...gaps];
    updated[index] = { ...updated[index], [field]: value };
    onGapsChange(updated);
  };

  const addGap = () => {
    onGapsChange([...gaps, { gap: '', mitigation: '' }]);
  };

  const removeGap = (index: number) => {
    onGapsChange(gaps.filter((_, i) => i !== index));
  };

  // Learning plan handlers
  const handleLearningChange = (index: number, field: keyof LearningItem, value: string) => {
    const updated = [...learningPlan];
    updated[index] = { ...updated[index], [field]: value };
    onLearningPlanChange(updated);
  };

  const addLearningItem = () => {
    onLearningPlanChange([...learningPlan, { item: '', targetDate: '', status: 'Planned' }]);
  };

  const removeLearningItem = (index: number) => {
    onLearningPlanChange(learningPlan.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8">
      {/* Strengths */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Strengths</h3>
            <p className="text-sm text-muted-foreground">Core competencies and proven capabilities</p>
          </div>
          <Button variant="outline" size="sm" onClick={addStrength}>
            <Plus className="w-3 h-3 mr-1" />
            Add
          </Button>
        </div>
        {strengths.map((strength, index) => (
          <div key={index} className="flex gap-2">
            <Textarea
              value={strength}
              onChange={(e) => handleStrengthChange(index, e.target.value)}
              placeholder="e.g., Operational Leadership: Proven ability to lead CBRN operations..."
              rows={2}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeStrength(index)}
              className="text-muted-foreground hover:text-destructive shrink-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      <Separator />

      {/* Development Areas */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Development Areas</h3>
            <p className="text-sm text-muted-foreground">Areas where you're actively building expertise</p>
          </div>
          <Button variant="outline" size="sm" onClick={addDevArea}>
            <Plus className="w-3 h-3 mr-1" />
            Add
          </Button>
        </div>
        {developmentAreas.map((area, index) => (
          <div key={index} className="flex gap-2">
            <Textarea
              value={area}
              onChange={(e) => handleDevAreaChange(index, e.target.value)}
              placeholder="e.g., Nuclear Policy Analysis: Deepening expertise in..."
              rows={2}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeDevArea(index)}
              className="text-muted-foreground hover:text-destructive shrink-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      <Separator />

      {/* Capability Gaps */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Capability Gaps & Mitigation</h3>
            <p className="text-sm text-muted-foreground">Identified gaps with your plan to address them</p>
          </div>
          <Button variant="outline" size="sm" onClick={addGap}>
            <Plus className="w-3 h-3 mr-1" />
            Add
          </Button>
        </div>
        {gaps.map((gap, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-3">
            <div className="flex gap-2">
              <div className="flex-1 space-y-2">
                <Label>Gap</Label>
                <Input
                  value={gap.gap}
                  onChange={(e) => handleGapChange(index, 'gap', e.target.value)}
                  placeholder="e.g., Limited civilian emergency management credentials"
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeGap(index)}
                className="text-muted-foreground hover:text-destructive shrink-0 self-end"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-2">
              <Label>Mitigation Strategy</Label>
              <Textarea
                value={gap.mitigation}
                onChange={(e) => handleGapChange(index, 'mitigation', e.target.value)}
                placeholder="How are you addressing this gap?"
                rows={2}
              />
            </div>
          </div>
        ))}
      </div>

      <Separator />

      {/* Learning Plan */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Learning Plan</h3>
            <p className="text-sm text-muted-foreground">Current learning objectives with target dates</p>
          </div>
          <Button variant="outline" size="sm" onClick={addLearningItem}>
            <Plus className="w-3 h-3 mr-1" />
            Add
          </Button>
        </div>
        {learningPlan.map((item, index) => (
          <div key={index} className="grid grid-cols-12 gap-2 items-end border rounded-lg p-3">
            <div className="col-span-6 space-y-1">
              <Label className="text-xs">Learning Item</Label>
              <Input
                value={item.item}
                onChange={(e) => handleLearningChange(index, 'item', e.target.value)}
                placeholder="e.g., Complete AFIT CWMD coursework"
              />
            </div>
            <div className="col-span-2 space-y-1">
              <Label className="text-xs">Target Date</Label>
              <Input
                value={item.targetDate}
                onChange={(e) => handleLearningChange(index, 'targetDate', e.target.value)}
                placeholder="e.g., June 2025"
              />
            </div>
            <div className="col-span-3 space-y-1">
              <Label className="text-xs">Status</Label>
              <Select
                value={item.status}
                onValueChange={(value) => handleLearningChange(index, 'status', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Planned">Planned</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeLearningItem(index)}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
