import { useMemo } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { transformSkillsToRadarData, RadarDataPoint } from "@/utils/skillsChartUtils";

interface SkillCategory {
  name: string;
  skills: Array<{
    name: string;
    proficiency: string;
    years?: number;
  }>;
}

interface SkillsRadarChartProps {
  categories: SkillCategory[];
}

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload as RadarDataPoint;

  return (
    <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
      <p className="font-semibold text-foreground mb-2">{data.category}</p>
      <p className="text-sm text-muted-foreground mb-2">
        Average: <span className="text-foreground font-medium">{data.value.toFixed(2)}</span> / 3
      </p>
      <div className="text-xs space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-proficiency-advanced" />
          <span className="text-muted-foreground">Advanced:</span>
          <span className="text-foreground">{data.breakdown.advanced}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-proficiency-working" />
          <span className="text-muted-foreground">Working:</span>
          <span className="text-foreground">{data.breakdown.working}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-proficiency-foundational" />
          <span className="text-muted-foreground">Foundational:</span>
          <span className="text-foreground">{data.breakdown.foundational}</span>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border">
        {data.skillCount} skills in category
      </p>
    </div>
  );
}

export function SkillsRadarChart({ categories }: SkillsRadarChartProps) {
  const radarData = useMemo(
    () => transformSkillsToRadarData(categories),
    [categories]
  );

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-8">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          Skills Proficiency Overview
        </h3>
        <p className="text-sm text-muted-foreground">
          Average proficiency across all domains (hover for details)
        </p>
      </div>

      <div className="w-full h-[350px] md:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            cx="50%"
            cy="50%"
            outerRadius="70%"
            data={radarData}
          >
            <PolarGrid
              stroke="hsl(var(--border))"
              strokeOpacity={0.5}
            />
            <PolarAngleAxis
              dataKey="category"
              tick={{
                fill: "hsl(var(--muted-foreground))",
                fontSize: 11,
              }}
              tickLine={false}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 3]}
              tick={{
                fill: "hsl(var(--muted-foreground))",
                fontSize: 10,
              }}
              tickCount={4}
              axisLine={false}
            />
            <Radar
              name="Proficiency"
              dataKey="value"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.3}
              strokeWidth={2}
              dot={{
                r: 4,
                fill: "hsl(var(--primary))",
                strokeWidth: 0,
              }}
              activeDot={{
                r: 6,
                fill: "hsl(var(--primary))",
                stroke: "hsl(var(--background))",
                strokeWidth: 2,
              }}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center gap-6 mt-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-proficiency-advanced" />
          <span>Advanced (3)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-proficiency-working" />
          <span>Working (2)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-proficiency-foundational" />
          <span>Foundational (1)</span>
        </div>
      </div>
    </div>
  );
}
