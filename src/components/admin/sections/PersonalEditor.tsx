import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PersonalData {
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
}

interface PersonalEditorProps {
  data: PersonalData;
  onChange: (data: PersonalData) => void;
}

export function PersonalEditor({ data, onChange }: PersonalEditorProps) {
  const handleChange = (field: keyof PersonalData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          value={data.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Enter your name"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="title">Professional Title</Label>
        <Input
          id="title"
          value={data.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="e.g., Senior CBRN Warrant Officer"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="organization">Organization</Label>
        <Input
          id="organization"
          value={data.organization}
          onChange={(e) => handleChange('organization', e.target.value)}
          placeholder="e.g., 18th Airborne Corps"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={data.location}
          onChange={(e) => handleChange('location', e.target.value)}
          placeholder="e.g., Fort Liberty, NC"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={data.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="your.email@example.com"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          type="tel"
          value={data.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="(555) 123-4567"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="linkedin">LinkedIn URL</Label>
        <Input
          id="linkedin"
          value={data.linkedin}
          onChange={(e) => handleChange('linkedin', e.target.value)}
          placeholder="https://www.linkedin.com/in/..."
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="clearance">Security Clearance</Label>
        <Input
          id="clearance"
          value={data.clearance}
          onChange={(e) => handleChange('clearance', e.target.value)}
          placeholder="e.g., Top Secret/SCI"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="availability">Availability</Label>
        <Input
          id="availability"
          value={data.availability}
          onChange={(e) => handleChange('availability', e.target.value)}
          placeholder="e.g., Available for opportunities"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="travel">Travel Willingness</Label>
        <Input
          id="travel"
          value={data.travelWillingness}
          onChange={(e) => handleChange('travelWillingness', e.target.value)}
          placeholder="e.g., Willing to travel up to 50%"
        />
      </div>
    </div>
  );
}
