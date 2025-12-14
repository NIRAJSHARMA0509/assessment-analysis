import { Bot, Clock } from "lucide-react";

interface ProcessingHeaderProps {
  isComplete: boolean;
  remainingMinutes: number;
  remainingSeconds: number;
}

export function ProcessingHeader({ isComplete, remainingMinutes, remainingSeconds }: ProcessingHeaderProps) {
  return (
    <div className="text-center space-y-4 animate-fade-in-up">
      {/* Animated logo/icon */}
      <div className="relative inline-flex items-center justify-center">
        <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse-ring" />
        <div className="relative w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-glow-primary">
          <Bot className="w-10 h-10 text-primary-foreground animate-float" />
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold text-foreground">
          {isComplete ? "Review Complete!" : "Reviewing Your Assessment"}
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          {isComplete
            ? "Your video assessment has been fully analyzed by our AI agents."
            : "Our AI agents are carefully analyzing your video assessment. This typically takes 3-5 minutes."}
        </p>
      </div>

      {!isComplete && (
        <div className="inline-flex items-center gap-2 bg-card px-4 py-2 rounded-full border border-border shadow-card-elevated">
          <Clock className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">
            Estimated time remaining:{" "}
            <span className="text-primary">
              {remainingMinutes}:{remainingSeconds.toString().padStart(2, "0")}
            </span>
          </span>
        </div>
      )}
    </div>
  );
}
