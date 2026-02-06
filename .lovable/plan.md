
# Skills Radar Chart Implementation Plan

## Overview
Add an interactive radar chart (also known as a spider chart or polar chart) to the Skills section that visualizes proficiency levels across all 11 skill categories at a glance. This creates a visual "fingerprint" of capabilities, helping recruiters immediately understand where strengths and balanced expertise lie.

## Data Structure Analysis
Your resume has 11 skill categories with multiple skills per category. The radar chart will:
- Use one data point per category (calculated from the skills within that category)
- Show average proficiency level for each domain
- Map proficiency levels to numeric values: Advanced = 3, Working = 2, Foundational = 1
- Display the resulting score (out of 3) for each domain

## Technical Approach

### Chart Type: Recharts Radar
- **Library**: Recharts is already installed and configured
- **Chart Component**: `RadarChart` with `Radar`, `PolarGrid`, `PolarAngleAxis`, `PolarRadiusAxis`, `Legend`, `Tooltip`
- **Data Format**: Array of objects with `category` name and `value` (average proficiency)

### Implementation Strategy

1. **Data Transformation Utility**
   - Create a function to transform skills data into radar chart format
   - Calculate average proficiency for each category (Advanced=3, Working=2, Foundational=1)
   - Return array of `{name: string, value: number}`

2. **New Component: SkillsRadarChart**
   - Location: `src/components/resume/SkillsRadarChart.tsx`
   - Props: `categories` array from resume data
   - Uses `ChartContainer` and Recharts `RadarChart`
   - Responsive sizing with proper styling
   - Custom tooltip showing category name and proficiency breakdown

3. **Integration into Skills Section**
   - Add radar chart above the category tabs and search (prominent placement)
   - Display with a brief description: "Skills proficiency across all domains"
   - Include a max-width container (lg:max-w-2xl) to prevent oversizing on desktop

### Color Scheme
- Use existing proficiency colors from CSS variables:
  - Advanced: `hsl(142 76% 36%)` - Green
  - Working: `hsl(217 91% 60%)` - Blue
  - Foundational: `hsl(38 92% 50%)` - Orange
- Single color for radar fill (primary color with opacity for depth)

### Responsive Behavior
- Mobile: Full-width container with appropriate scaling
- Tablet/Desktop: Centered with max-width constraint
- Maintains aspect ratio and readability at all breakpoints

## Files to Create

| File | Purpose |
|------|---------|
| `src/components/resume/SkillsRadarChart.tsx` | Main radar chart component |
| `src/utils/skillsChartUtils.ts` | Data transformation utility |

## Files to Modify

| File | Change |
|------|--------|
| `src/components/resume/Skills.tsx` | Import and render SkillsRadarChart above current content |
| `src/components/resume/index.ts` | Export SkillsRadarChart if needed |

## Component Details

### SkillsRadarChart.tsx Structure
```text
- Takes: skills.categories array as prop
- Transforms data using utility function
- Renders ChartContainer with:
  - ResponsiveContainer (width 100%, height 300-400px)
  - RadarChart with data
  - PolarGrid (subtle styling to match theme)
  - PolarAngleAxis (category names)
  - PolarRadiusAxis (0-3 scale)
  - Radar (one series showing proficiency)
  - Legend (bottom, shows axis label)
  - Tooltip (custom, shows category + detailed breakdown)
```

### Data Transformation Example
Input:
```
{
  name: "CWMD & Counterproliferation",
  skills: [
    { name: "CWMD Strategy & Policy", proficiency: "Advanced" },
    { name: "Counterproliferation Operations", proficiency: "Advanced" },
    { name: "WMD Threat Analysis", proficiency: "Advanced" },
    { name: "Nonproliferation Programs", proficiency: "Working" }
  ]
}
```

Output:
```
{ name: "CWMD & Counterproliferation", value: 2.75 }
```

## Visual Design

### Layout Flow
1. Skills section header and description (existing)
2. **NEW: Radar Chart** (prominent visual)
3. Skills Search bar (existing)
4. Category Tabs and skill cards (existing)
5. Skills Index (existing)

### Styling
- Card-style container with border and padding (consistent with existing cards)
- Light background in light mode, dark background in dark mode
- Subtle shadows for depth
- Animation: Fade-in on scroll or on component mount
- Tooltip on hover showing more detail

## User Experience

### What Recruiters See
1. **At a glance**: Visual representation of expertise across all 11 domains
2. **Instant pattern recognition**: Can see which domains are strengths (outer ring) vs. developing areas (inner)
3. **Proficiency balance**: Immediately understand breadth vs. depth of expertise
4. **Interactive details**: Hovering over chart points shows the exact skills and count in that category

## Implementation Order

1. Create utility function to transform skills data
2. Build SkillsRadarChart component with Recharts
3. Integrate into Skills.tsx with proper placement
4. Test responsiveness and theming (light/dark mode)
5. Verify chart is accessible and readable

## Why This Works

| Aspect | Benefit |
|--------|---------|
| **Visual Impact** | Instantly communicates expertise distribution without text |
| **Professional** | Commonly used in resume/portfolio contexts, looks modern |
| **Data Accurate** | Based on actual skill data, no guessing |
| **Responsive** | Works on mobile, tablet, desktop |
| **Themed** | Respects light/dark mode and existing color scheme |
| **Accessible** | Includes labels, legend, and tooltip for all data |

