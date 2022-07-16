export const secondsToHms = (totalSeconds: number) => {
  const hour = Math.floor(totalSeconds / 3600)
  const minute = Math.floor((totalSeconds % 3600) / 60)
  const seconds = Math.floor((totalSeconds % 3600) % 60)

  const hourDisplay = hour > 0 ? String(hour).padStart(2, '0') : '00'
  const minuteDisplay = minute > 0 ? String(minute).padStart(2, '0') : '00'
  const secondsDisplay = seconds > 0 ? String(seconds).padStart(2, '0') : '00'
  return `${hourDisplay}:${minuteDisplay}:${secondsDisplay}`
}
