import { useState } from "react";
import { Target, Sparkles, Loader2, CheckCircle2, AlertCircle, MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FitScoreGauge } from "./FitScoreGauge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface FitAnalysis {
  overallScore: number;
  categoryScores: {
    skills: number;
    experience: number;
    education: number;
  };
  strengths: string[];
  gaps: string[];
  talkingPoints: string[];
  summary: string;
}

export function JobFitAnalyzer() {
  const [isOpen, setIsOpen] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<FitAnalysis | null>(null);

  const handleAnalyze = async () => {
    if (!jobDescription.trim() || jobDescription.length < 10) {
      toast({
        title: "Job description required",
        description: "Please enter at least 10 characters describing the role.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysis(null);

    try {
      const { data, error } = await supabase.functions.invoke("job-fit-analysis", {
        body: { jobDescription },
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setAnalysis(data);
    } catch (err) {
      console.error("Analysis error:", err);
      toast({
        title: "Analysis failed",
        description: err instanceof Error ? err.message : "Failed to analyze job fit. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setJobDescription("");
    setAnalysis(null);
  };

  const getCategoryLabel = (score: number) => {
    if (score >= 75) return "Strong";
    if (score >= 60) return "Good";
    if (score >= 45) return "Partial";
    return "Limited";
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 rounded-full border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-all duration-200"
        >
          <Target className="h-4 w-4" />
          Check Fit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto glass-card border-primary/10">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display">
            <Sparkles className="h-5 w-5 text-accent" />
            Recruiter Fit Score
          </DialogTitle>
          <DialogDescription>
            Paste a job description or role requirements to see how well this candidate matches your needs.
          </DialogDescription>
        </DialogHeader>

        {!analysis ? (
          <div className="space-y-4 mt-4">
            <Textarea
              placeholder="Paste the job description, role requirements, or key qualifications you're looking for..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={8}
              className="resize-none rounded-xl border-primary/10 focus:border-primary/30"
              disabled={isAnalyzing}
            />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                {jobDescription.length} characters
              </span>
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing || jobDescription.length < 10}
                className="bg-gradient-to-r from-primary to-accent text-white border-0 rounded-full hover:opacity-90 transition-opacity"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Target className="h-4 w-4 mr-2" />
                    Analyze Fit
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 mt-4">
            {/* Overall Score */}
            <div className="flex flex-col items-center py-4">
              <FitScoreGauge score={analysis.overallScore} size="lg" label="Match Score" />
              <p className="mt-4 text-center text-muted-foreground max-w-md">
                {analysis.summary}
              </p>
            </div>

            {/* Category Breakdown */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center p-4 glass-card">
                <FitScoreGauge score={analysis.categoryScores.skills} size="sm" />
                <span className="mt-2 text-sm font-medium font-display">Skills</span>
                <span className="text-xs text-muted-foreground">
                  {getCategoryLabel(analysis.categoryScores.skills)}
                </span>
              </div>
              <div className="flex flex-col items-center p-4 glass-card">
                <FitScoreGauge score={analysis.categoryScores.experience} size="sm" />
                <span className="mt-2 text-sm font-medium font-display">Experience</span>
                <span className="text-xs text-muted-foreground">
                  {getCategoryLabel(analysis.categoryScores.experience)}
                </span>
              </div>
              <div className="flex flex-col items-center p-4 glass-card">
                <FitScoreGauge score={analysis.categoryScores.education} size="sm" />
                <span className="mt-2 text-sm font-medium font-display">Education</span>
                <span className="text-xs text-muted-foreground">
                  {getCategoryLabel(analysis.categoryScores.education)}
                </span>
              </div>
            </div>

            {/* Strengths */}
            {analysis.strengths.length > 0 && (
              <div className="space-y-2">
                <h4 className="flex items-center gap-2 font-medium text-proficiency-advanced font-display">
                  <CheckCircle2 className="h-4 w-4" />
                  Strengths for This Role
                </h4>
                <ul className="space-y-1 ml-6">
                  {analysis.strengths.map((strength, i) => (
                    <li key={i} className="text-sm text-muted-foreground list-disc">
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Gaps */}
            {analysis.gaps.length > 0 && (
              <div className="space-y-2">
                <h4 className="flex items-center gap-2 font-medium text-proficiency-foundational font-display">
                  <AlertCircle className="h-4 w-4" />
                  Potential Gaps
                </h4>
                <ul className="space-y-1 ml-6">
                  {analysis.gaps.map((gap, i) => (
                    <li key={i} className="text-sm text-muted-foreground list-disc">
                      {gap}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Talking Points */}
            {analysis.talkingPoints.length > 0 && (
              <div className="space-y-2">
                <h4 className="flex items-center gap-2 font-medium text-accent font-display">
                  <MessageSquare className="h-4 w-4" />
                  Suggested Interview Topics
                </h4>
                <ul className="space-y-1 ml-6">
                  {analysis.talkingPoints.map((point, i) => (
                    <li key={i} className="text-sm text-muted-foreground list-disc">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Reset Button */}
            <div className="flex justify-center pt-4 border-t border-border/50">
              <Button
                variant="outline"
                onClick={handleReset}
                className="rounded-full border-primary/30 hover:border-primary/60 hover:bg-primary/5"
              >
                <X className="h-4 w-4 mr-2" />
                Analyze Another Role
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
