interface Skill {
  name: string;
  proficiency: string;
  years?: number;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface RadarDataPoint {
  category: string;
  value: number;
  fullMark: number;
  skillCount: number;
  breakdown: {
    advanced: number;
    working: number;
    foundational: number;
  };
}

const proficiencyValues: Record<string, number> = {
  Advanced: 3,
  Working: 2,
  Foundational: 1,
};

export function transformSkillsToRadarData(categories: SkillCategory[]): RadarDataPoint[] {
  return categories.map((category) => {
    const breakdown = {
      advanced: 0,
      working: 0,
      foundational: 0,
    };

    let totalValue = 0;
    category.skills.forEach((skill) => {
      const proficiency = skill.proficiency as keyof typeof proficiencyValues;
      const value = proficiencyValues[proficiency] || 1;
      totalValue += value;

      if (proficiency === "Advanced") breakdown.advanced++;
      else if (proficiency === "Working") breakdown.working++;
      else breakdown.foundational++;
    });

    const averageValue = category.skills.length > 0 
      ? totalValue / category.skills.length 
      : 0;

    // Shorten long category names for better display
    const shortName = shortenCategoryName(category.name);

    return {
      category: shortName,
      value: Math.round(averageValue * 100) / 100,
      fullMark: 3,
      skillCount: category.skills.length,
      breakdown,
    };
  });
}

function shortenCategoryName(name: string): string {
  const shortNames: Record<string, string> = {
    "CWMD & Counterproliferation": "CWMD",
    "CBRN Defense & Operations": "CBRN Defense",
    "Incident & Emergency Management": "Emergency Mgmt",
    "Military Operations & Planning": "Military Ops",
    "Intelligence & Analysis": "Intelligence",
    "Leadership & Coordination": "Leadership",
    "Training & Doctrine Development": "Training",
    "Communication & Stakeholder Engagement": "Communication",
    "Technical & Scientific Literacy": "Technical",
    "Strategic Planning & Policy": "Strategy",
    "Organizational & Administrative": "Admin",
  };

  return shortNames[name] || name;
}
