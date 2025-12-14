import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { AgentCard } from "./AgentCard";
import { ProcessingHeader } from "./ProcessingHeader";
import { ProgressIndicator } from "./ProgressIndicator";

export interface ReviewStep {
  id: string;
  title: string;
  description: string;
  agentName: string;
  duration: number; // in seconds
  color: string;
}

const reviewSteps: ReviewStep[] = [
  {
    id: "transcribe",
    title: "Transcribing Video",
    description: "Converting your speech to text for detailed analysis",
    agentName: "Transcription Agent",
    duration: 45,
    color: "agent-transcribe",
  },
  {
    id: "behavior",
    title: "Analyzing Communication",
    description: "Evaluating tone, clarity, and presentation style",
    agentName: "Behavior Analyst",
    duration: 50,
    color: "agent-behavior",
  },
  {
    id: "accuracy",
    title: "Verifying Content Accuracy",
    description: "Cross-referencing information for correctness",
    agentName: "Accuracy Checker",
    duration: 55,
    color: "agent-accuracy",
  },
  {
    id: "style",
    title: "Assessing Teaching Style",
    description: "Measuring engagement and pedagogical approach",
    agentName: "Teaching Evaluator",
    duration: 40,
    color: "agent-style",
  },
  {
    id: "result",
    title: "Generating Results",
    description: "Compiling comprehensive assessment report",
    agentName: "Report Generator",
    duration: 30,
    color: "agent-result",
  },
];

export function ProcessingScreen() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [totalElapsed, setTotalElapsed] = useState(0);

  const totalDuration = reviewSteps.reduce((sum, step) => sum + step.duration, 0);
  const currentStep = reviewSteps[currentStepIndex];

  useEffect(() => {
    if (currentStepIndex >= reviewSteps.length) return;

    const step = reviewSteps[currentStepIndex];
    const interval = 100; // Update every 100ms
    const increment = (100 / step.duration) * (interval / 1000);

    const timer = setInterval(() => {
      setStepProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setCompletedSteps((prev) => [...prev, step.id]);
          setTimeout(() => {
            setCurrentStepIndex((prev) => prev + 1);
            setStepProgress(0);
          }, 500);
          return 100;
        }
        return next;
      });

      setTotalElapsed((prev) => prev + interval / 1000);
    }, interval);

    return () => clearInterval(timer);
  }, [currentStepIndex]);

  const overallProgress = Math.min(
    ((completedSteps.length / reviewSteps.length) * 100) +
      (stepProgress / reviewSteps.length),
    100
  );

  const remainingTime = Math.max(0, totalDuration - totalElapsed);
  const remainingMinutes = Math.floor(remainingTime / 60);
  const remainingSeconds = Math.floor(remainingTime % 60);

  const isComplete = completedSteps.length === reviewSteps.length;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl space-y-8">
        <ProcessingHeader 
          isComplete={isComplete}
          remainingMinutes={remainingMinutes}
          remainingSeconds={remainingSeconds}
        />

        <ProgressIndicator progress={overallProgress} />

        <div className="space-y-4">
          {reviewSteps.map((step, index) => {
            const isActive = index === currentStepIndex && !isComplete;
            const isCompleted = completedSteps.includes(step.id);
            const isPending = index > currentStepIndex;

            return (
              <AgentCard
                key={step.id}
                step={step}
                isActive={isActive}
                isCompleted={isCompleted}
                isPending={isPending}
                progress={isActive ? stepProgress : isCompleted ? 100 : 0}
                animationDelay={index * 100}
              />
            );
          })}
        </div>

        {!isComplete && (
          <p className="text-center text-sm text-muted-foreground animate-fade-in-up">
            Please don't close this window. Your assessment is being carefully reviewed.
          </p>
        )}

        {isComplete && (
          <div className="text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-success/10 text-success px-6 py-3 rounded-full">
              <Check className="w-5 h-5" />
              <span className="font-medium">Assessment Complete!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
