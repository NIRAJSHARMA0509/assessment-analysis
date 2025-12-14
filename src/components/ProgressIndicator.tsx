interface ProgressIndicatorProps {
  progress: number;
}

export function ProgressIndicator({ progress }: ProgressIndicatorProps) {
  return (
    <div className="space-y-1.5 sm:space-y-2 animate-fade-in-up delay-100">
      <div className="flex justify-between text-xs sm:text-sm">
        <span className="text-muted-foreground">Overall Progress</span>
        <span className="font-medium text-foreground">{Math.round(progress)}%</span>
      </div>
      <div className="h-2.5 sm:h-3 bg-secondary rounded-full overflow-hidden shadow-inner">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300 ease-out relative overflow-hidden"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 animate-shimmer" />
        </div>
      </div>
    </div>
  );
}
