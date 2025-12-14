import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReviewStep } from "./ProcessingScreen";

interface AgentCardProps {
  step: ReviewStep;
  isActive: boolean;
  isCompleted: boolean;
  isPending: boolean;
  progress: number;
  animationDelay: number;
}

const colorMap: Record<string, string> = {
  "agent-transcribe": "bg-agent-transcribe",
  "agent-behavior": "bg-agent-behavior",
  "agent-accuracy": "bg-agent-accuracy",
  "agent-style": "bg-agent-style",
  "agent-result": "bg-agent-result",
};

const borderColorMap: Record<string, string> = {
  "agent-transcribe": "border-agent-transcribe/30",
  "agent-behavior": "border-agent-behavior/30",
  "agent-accuracy": "border-agent-accuracy/30",
  "agent-style": "border-agent-style/30",
  "agent-result": "border-agent-result/30",
};

const progressColorMap: Record<string, string> = {
  "agent-transcribe": "bg-agent-transcribe/20",
  "agent-behavior": "bg-agent-behavior/20",
  "agent-accuracy": "bg-agent-accuracy/20",
  "agent-style": "bg-agent-style/20",
  "agent-result": "bg-agent-result/20",
};

export function AgentCard({
  step,
  isActive,
  isCompleted,
  isPending,
  progress,
  animationDelay,
}: AgentCardProps) {
  return (
    <div
      className={cn(
        "relative bg-card rounded-xl border overflow-hidden transition-all duration-500",
        isActive && `border-2 ${borderColorMap[step.color]} shadow-card-elevated`,
        isCompleted && "border-success/30 bg-success/5",
        isPending && "opacity-60 border-border"
      )}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Progress background */}
      {isActive && (
        <div
          className={cn("absolute inset-0 transition-all duration-300", progressColorMap[step.color])}
          style={{ width: `${progress}%` }}
        />
      )}

      <div className="relative flex items-center gap-4 p-4">
        {/* Agent avatar */}
        <div
          className={cn(
            "relative flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
            isActive && colorMap[step.color],
            isCompleted && "bg-success",
            isPending && "bg-muted"
          )}
        >
          {isActive && (
            <div className="absolute inset-0 rounded-full animate-pulse-ring opacity-50" 
                 style={{ backgroundColor: 'currentColor' }} />
          )}
          
          {isCompleted ? (
            <Check className="w-6 h-6 text-success-foreground" />
          ) : isActive ? (
            <Loader2 className="w-6 h-6 text-primary-foreground animate-spin" />
          ) : (
            <div className={cn(
              "w-3 h-3 rounded-full",
              isPending ? "bg-muted-foreground/30" : colorMap[step.color]
            )} />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className={cn(
              "font-medium transition-colors duration-300",
              isActive && "text-foreground",
              isCompleted && "text-success",
              isPending && "text-muted-foreground"
            )}>
              {step.title}
            </h3>
            {isActive && (
              <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full font-medium">
                {step.agentName}
              </span>
            )}
          </div>
          <p className={cn(
            "text-sm transition-colors duration-300",
            isCompleted ? "text-success/70" : "text-muted-foreground"
          )}>
            {isCompleted ? "Completed" : step.description}
          </p>
        </div>

        {/* Progress percentage for active step */}
        {isActive && (
          <div className="flex-shrink-0">
            <span className="text-sm font-semibold text-primary">
              {Math.round(progress)}%
            </span>
          </div>
        )}

        {/* Checkmark for completed */}
        {isCompleted && (
          <div className="flex-shrink-0">
            <svg className="w-6 h-6 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M5 13l4 4L19 7" className="animate-check-mark" />
            </svg>
          </div>
        )}
      </div>

      {/* Scanning line effect for active card */}
      {isActive && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute left-0 right-0 h-8 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent animate-scan-line" />
        </div>
      )}
    </div>
  );
}
