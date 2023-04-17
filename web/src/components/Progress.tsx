interface ProgressProps {
  progress: number,
}

export function Progress({ progress }: ProgressProps) {
  return (
    <div className="w-full h-4 rounded-3xl bg-zinc-700 mt-4">
      <div
        role="progressbar"
        aria-label="Progresso de hábitos neste dia"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-4 bg-violet-600 rounded-3xl transition-all"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}