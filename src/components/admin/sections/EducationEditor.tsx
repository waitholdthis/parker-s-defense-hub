import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import { Plus, X, ChevronDown, ChevronRight } from 'lucide-react';

interface Education {
  id: string;
  type: string;
  title: string;
  institution: string;
  location: string;
  completionDate: string;
  status: string;
  description: string;
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
  status: string;
}

interface EducationEditorProps {
  education: Education[];
  certifications: Certification[];
  onEducationChange: (data: Education[]) => void;
  onCertificationsChange: (data: Certification[]) => void;
}

export function EducationEditor({ education, certifications, onEducationChange, onCertificationsChange }: EducationEditorProps) {
  const [openEdu, setOpenEdu] = useState<Set<number>>(new Set([0]));

  const toggleEdu = (index: number) => {
    const newOpen = new Set(openEdu);
    if (newOpen.has(index)) {
      newOpen.delete(index);
    } else {
      newOpen.add(index);
    }
    setOpenEdu(newOpen);
  };

  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    const updated = [...education];
    updated[index] = { ...updated[index], [field]: value };
    onEducationChange(updated);
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: `edu-${Date.now()}`,
      type: 'education',
      title: '',
      institution: '',
      location: '',
      completionDate: '',
      status: 'Completed',
      description: ''
    };
    onEducationChange([...education, newEdu]);
    setOpenEdu(prev => new Set([...prev, education.length]));
  };

  const removeEducation = (index: number) => {
    onEducationChange(education.filter((_, i) => i !== index));
  };

  const handleCertificationChange = (index: number, field: keyof Certification, value: string) => {
    const updated = [...certifications];
    updated[index] = { ...updated[index], [field]: value };
    onCertificationsChange(updated);
  };

  const addCertification = () => {
    onCertificationsChange([...certifications, { name: '', issuer: '', date: '', status: 'Active' }]);
  };

  const removeCertification = (index: number) => {
    onCertificationsChange(certifications.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* Education Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Education & Professional Development</h3>
          <Button variant="outline" size="sm" onClick={addEducation}>
            <Plus className="w-3 h-3 mr-1" />
            Add
          </Button>
        </div>

        {education.map((edu, index) => (
          <Collapsible 
            key={edu.id}
            open={openEdu.has(index)}
            onOpenChange={() => toggleEdu(index)}
          >
            <div className="border rounded-lg">
              <CollapsibleTrigger asChild>
                <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50">
                  <div className="flex items-center gap-2">
                    {openEdu.has(index) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                    <div>
                      <span className="font-medium">{edu.title || 'New Entry'}</span>
                      <span className="text-muted-foreground text-sm ml-2">
                        {edu.institution && `- ${edu.institution}`}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeEducation(index);
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
                      <Label>Type</Label>
                      <Select
                        value={edu.type}
                        onValueChange={(value) => handleEducationChange(index, 'type', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="degree">Degree</SelectItem>
                          <SelectItem value="certificate">Certificate</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="professional_development">Professional Development</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <Select
                        value={edu.status}
                        onValueChange={(value) => handleEducationChange(index, 'status', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Completed">Completed</SelectItem>
                          <SelectItem value="In Progress">In Progress</SelectItem>
                          <SelectItem value="Planned">Planned</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Title</Label>
                      <Input
                        value={edu.title}
                        onChange={(e) => handleEducationChange(index, 'title', e.target.value)}
                        placeholder="e.g., Graduate Certificate Program in National Security Studies"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Institution</Label>
                      <Input
                        value={edu.institution}
                        onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                        placeholder="e.g., U.S. Army War College"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input
                        value={edu.location}
                        onChange={(e) => handleEducationChange(index, 'location', e.target.value)}
                        placeholder="e.g., Carlisle, PA"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Completion Date</Label>
                      <Input
                        value={edu.completionDate}
                        onChange={(e) => handleEducationChange(index, 'completionDate', e.target.value)}
                        placeholder="e.g., 2023 or Expected 2025"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={edu.description}
                      onChange={(e) => handleEducationChange(index, 'description', e.target.value)}
                      placeholder="Brief description of the program and focus areas..."
                      rows={2}
                    />
                  </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        ))}
      </div>

      <Separator />

      {/* Certifications Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Certifications</h3>
          <Button variant="outline" size="sm" onClick={addCertification}>
            <Plus className="w-3 h-3 mr-1" />
            Add
          </Button>
        </div>

        {certifications.map((cert, index) => (
          <div key={index} className="grid grid-cols-12 gap-2 items-end border rounded-lg p-3">
            <div className="col-span-4 space-y-1">
              <Label className="text-xs">Name</Label>
              <Input
                value={cert.name}
                onChange={(e) => handleCertificationChange(index, 'name', e.target.value)}
                placeholder="Certification name"
              />
            </div>
            <div className="col-span-3 space-y-1">
              <Label className="text-xs">Issuer</Label>
              <Input
                value={cert.issuer}
                onChange={(e) => handleCertificationChange(index, 'issuer', e.target.value)}
                placeholder="Issuing organization"
              />
            </div>
            <div className="col-span-2 space-y-1">
              <Label className="text-xs">Date</Label>
              <Input
                value={cert.date}
                onChange={(e) => handleCertificationChange(index, 'date', e.target.value)}
                placeholder="Year"
              />
            </div>
            <div className="col-span-2 space-y-1">
              <Label className="text-xs">Status</Label>
              <Select
                value={cert.status}
                onValueChange={(value) => handleCertificationChange(index, 'status', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Expired">Expired</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeCertification(index)}
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
