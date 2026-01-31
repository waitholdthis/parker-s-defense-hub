import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SummaryEditorProps {
  missionStatement: string;
  executiveSummary: string[];
  skillChips: string[];
  onMissionChange: (value: string) => void;
  onSummaryChange: (value: string[]) => void;
  onChipsChange: (value: string[]) => void;
}

export function SummaryEditor({ 
  missionStatement, 
  executiveSummary, 
  skillChips,
  onMissionChange, 
  onSummaryChange,
  onChipsChange
}: SummaryEditorProps) {
  const handleSummaryItemChange = (index: number, value: string) => {
    const updated = [...executiveSummary];
    updated[index] = value;
    onSummaryChange(updated);
  };

  const addSummaryItem = () => {
    onSummaryChange([...executiveSummary, '']);
  };

  const removeSummaryItem = (index: number) => {
    onSummaryChange(executiveSummary.filter((_, i) => i !== index));
  };

  const addChip = () => {
    const newChip = prompt('Enter new skill chip:');
    if (newChip?.trim()) {
      onChipsChange([...skillChips, newChip.trim()]);
    }
  };

  const removeChip = (index: number) => {
    onChipsChange(skillChips.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="mission">Mission Statement</Label>
        <Textarea
          id="mission"
          value={missionStatement}
          onChange={(e) => onMissionChange(e.target.value)}
          placeholder="Enter your mission statement..."
          rows={4}
        />
        <p className="text-xs text-muted-foreground">
          A 2-3 sentence summary of your professional focus and value proposition
        </p>
      </div>

      <div className="space-y-2">
        <Label>Skill Chips</Label>
        <div className="flex flex-wrap gap-2">
          {skillChips.map((chip, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="flex items-center gap-1 pr-1"
            >
              {chip}
              <button
                onClick={() => removeChip(index)}
                className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          <Button variant="outline" size="sm" onClick={addChip}>
            <Plus className="w-3 h-3 mr-1" />
            Add
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Key competency tags displayed at the top of your profile
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Executive Summary Points</Label>
          <Button variant="outline" size="sm" onClick={addSummaryItem}>
            <Plus className="w-3 h-3 mr-1" />
            Add Point
          </Button>
        </div>
        
        {executiveSummary.map((item, index) => (
          <div key={index} className="flex gap-2">
            <div className="flex-1">
              <Textarea
                value={item}
                onChange={(e) => handleSummaryItemChange(index, e.target.value)}
                placeholder={`Summary point ${index + 1}...`}
                rows={2}
              />
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => removeSummaryItem(index)}
              className="text-muted-foreground hover:text-destructive"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
