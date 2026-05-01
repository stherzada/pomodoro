import { zeroLeft } from "./zero-left"

export function secondsToMinutes(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const min = Math.floor((seconds % 3600) / 60)
  const sec = Math.floor(seconds % 60)
  
  if (hours > 0) {
    return `${hours}:${zeroLeft(min)}:${zeroLeft(sec)}` // Not strictly zero-padding hours unless needed, but typical digital clocks do
  }
  
  return `${zeroLeft(min)}:${zeroLeft(sec)}`
}
