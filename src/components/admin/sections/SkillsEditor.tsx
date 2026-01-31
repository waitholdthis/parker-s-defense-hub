import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Plus, X, ChevronDown, ChevronRight } from 'lucide-react';

interface Skill {
  name: string;
  proficiency: string;
  years: number;
}

interface Category {
  name: string;
  skills: Skill[];
}

interface SkillsData {
  categories: Category[];
}

interface SkillsEditorProps {
  data: SkillsData;
  onChange: (data: SkillsData) => void;
}

export function SkillsEditor({ data, onChange }: SkillsEditorProps) {
  const [openCategories, setOpenCategories] = useState<Set<number>>(new Set([0]));

  const toggleCategory = (index: number) => {
    const newOpen = new Set(openCategories);
    if (newOpen.has(index)) {
      newOpen.delete(index);
    } else {
      newOpen.add(index);
    }
    setOpenCategories(newOpen);
  };

  const handleCategoryNameChange = (categoryIndex: number, value: string) => {
    const updated = { ...data };
    updated.categories[categoryIndex].name = value;
    onChange(updated);
  };

  const handleSkillChange = (categoryIndex: number, skillIndex: number, field: keyof Skill, value: string | number) => {
    const updated = { ...data };
    updated.categories[categoryIndex].skills[skillIndex] = {
      ...updated.categories[categoryIndex].skills[skillIndex],
      [field]: value
    };
    onChange(updated);
  };

  const addCategory = () => {
    const updated = {
      ...data,
      categories: [...data.categories, { name: 'New Category', skills: [] }]
    };
    onChange(updated);
    setOpenCategories(prev => new Set([...prev, data.categories.length]));
  };

  const removeCategory = (index: number) => {
    const updated = {
      ...data,
      categories: data.categories.filter((_, i) => i !== index)
    };
    onChange(updated);
  };

  const addSkill = (categoryIndex: number) => {
    const updated = { ...data };
    updated.categories[categoryIndex].skills.push({
      name: '',
      proficiency: 'Working',
      years: 1
    });
    onChange(updated);
  };

  const removeSkill = (categoryIndex: number, skillIndex: number) => {
    const updated = { ...data };
    updated.categories[categoryIndex].skills = updated.categories[categoryIndex].skills.filter((_, i) => i !== skillIndex);
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {data.categories.map((category, categoryIndex) => (
        <Collapsible 
          key={categoryIndex} 
          open={openCategories.has(categoryIndex)}
          onOpenChange={() => toggleCategory(categoryIndex)}
        >
          <div className="border rounded-lg">
            <CollapsibleTrigger asChild>
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50">
                <div className="flex items-center gap-2">
                  {openCategories.has(categoryIndex) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                  <span className="font-medium">{category.name}</span>
                  <span className="text-xs text-muted-foreground">
                    ({category.skills.length} skills)
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeCategory(categoryIndex);
                  }}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <div className="px-4 pb-4 space-y-4 border-t">
                <div className="pt-4 space-y-2">
                  <Label>Category Name</Label>
                  <Input
                    value={category.name}
                    onChange={(e) => handleCategoryNameChange(categoryIndex, e.target.value)}
                    placeholder="Category name"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Skills</Label>
                    <Button variant="outline" size="sm" onClick={() => addSkill(categoryIndex)}>
                      <Plus className="w-3 h-3 mr-1" />
                      Add Skill
                    </Button>
                  </div>
                  
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="grid grid-cols-12 gap-2 items-end">
                      <div className="col-span-5">
                        <Input
                          value={skill.name}
                          onChange={(e) => handleSkillChange(categoryIndex, skillIndex, 'name', e.target.value)}
                          placeholder="Skill name"
                        />
                      </div>
                      <div className="col-span-3">
                        <Select
                          value={skill.proficiency}
                          onValueChange={(value) => handleSkillChange(categoryIndex, skillIndex, 'proficiency', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Foundational">Foundational</SelectItem>
                            <SelectItem value="Working">Working</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="col-span-3">
                        <Input
                          type="number"
                          min="0"
                          value={skill.years}
                          onChange={(e) => handleSkillChange(categoryIndex, skillIndex, 'years', parseInt(e.target.value) || 0)}
                          placeholder="Years"
                        />
                      </div>
                      <div className="col-span-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeSkill(categoryIndex, skillIndex)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      ))}

      <Button variant="outline" onClick={addCategory} className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add Category
      </Button>
    </div>
  );
}
