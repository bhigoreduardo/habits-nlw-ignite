export function generateProgressPercent(completed: number, amount: number) {
  return amount > 0 ? Math.round(completed / amount * 100) : 0
}