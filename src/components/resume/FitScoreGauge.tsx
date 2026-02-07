import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface FitScoreGaugeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  label?: string;
  animated?: boolean;
}

export function FitScoreGauge({
  score,
  size = "md",
  label,
  animated = true
}: FitScoreGaugeProps) {
  const [displayScore, setDisplayScore] = useState(animated ? 0 : score);

  useEffect(() => {
    if (!animated) {
      setDisplayScore(score);
      return;
    }

    const duration = 1500;
    const steps = 60;
    const stepDuration = duration / steps;
    const increment = score / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setDisplayScore(score);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.round(increment * currentStep));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [score, animated]);

  const sizeConfig = {
    sm: { container: "w-20 h-20", stroke: 6, text: "text-xl", label: "text-xs" },
    md: { container: "w-32 h-32", stroke: 8, text: "text-3xl", label: "text-sm" },
    lg: { container: "w-44 h-44", stroke: 10, text: "text-5xl", label: "text-base" },
  };

  const config = sizeConfig[size];
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  const getGradientId = (score: number) => {
    if (score >= 75) return "gaugeGreen";
    if (score >= 60) return "gaugePurple";
    if (score >= 45) return "gaugeAmber";
    return "gaugeRed";
  };

  const getTextColor = (score: number) => {
    if (score >= 75) return "text-proficiency-advanced";
    if (score >= 60) return "text-primary";
    if (score >= 45) return "text-proficiency-foundational";
    return "text-destructive";
  };

  const getTrackOpacity = (score: number) => {
    if (score >= 75) return "stroke-proficiency-advanced/15";
    if (score >= 60) return "stroke-primary/15";
    if (score >= 45) return "stroke-proficiency-foundational/15";
    return "stroke-destructive/15";
  };

  return (
    <div className={cn("relative flex items-center justify-center", config.container)}>
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="gaugeGreen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(162 94% 40%)" />
            <stop offset="100%" stopColor="hsl(142 76% 46%)" />
          </linearGradient>
          <linearGradient id="gaugePurple" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(250 84% 54%)" />
            <stop offset="100%" stopColor="hsl(199 89% 48%)" />
          </linearGradient>
          <linearGradient id="gaugeAmber" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(32 95% 55%)" />
            <stop offset="100%" stopColor="hsl(45 93% 55%)" />
          </linearGradient>
          <linearGradient id="gaugeRed" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(0 84% 60%)" />
            <stop offset="100%" stopColor="hsl(20 90% 55%)" />
          </linearGradient>
          <filter id="gaugeGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Background track */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          className={cn("transition-colors duration-500", getTrackOpacity(displayScore))}
          strokeWidth={config.stroke}
        />
        {/* Progress arc with gradient */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={`url(#${getGradientId(displayScore)})`}
          strokeWidth={config.stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          filter="url(#gaugeGlow)"
          style={{ transition: animated ? "stroke-dashoffset 1.5s ease-out" : "none" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn("font-bold font-display tabular-nums", config.text, getTextColor(displayScore))}>
          {displayScore}
        </span>
        {label && (
          <span className={cn("text-muted-foreground mt-1", config.label)}>
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
