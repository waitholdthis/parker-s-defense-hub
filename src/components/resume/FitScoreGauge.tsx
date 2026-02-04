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

    // Animate the score from 0 to target
    const duration = 1500; // ms
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

  // Color based on score
  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-green-500 stroke-green-500";
    if (score >= 60) return "text-blue-500 stroke-blue-500";
    if (score >= 45) return "text-yellow-500 stroke-yellow-500";
    return "text-red-500 stroke-red-500";
  };

  const getTrackColor = (score: number) => {
    if (score >= 75) return "stroke-green-100";
    if (score >= 60) return "stroke-blue-100";
    if (score >= 45) return "stroke-yellow-100";
    return "stroke-red-100";
  };

  return (
    <div className={cn("relative flex items-center justify-center", config.container)}>
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        {/* Background track */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          className={cn("transition-colors duration-500", getTrackColor(displayScore))}
          strokeWidth={config.stroke}
        />
        {/* Progress arc */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          className={cn("transition-all duration-500", getScoreColor(displayScore))}
          strokeWidth={config.stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: animated ? "stroke-dashoffset 1.5s ease-out" : "none" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn("font-bold tabular-nums", config.text, getScoreColor(displayScore).split(" ")[0])}>
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
