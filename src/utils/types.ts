export type Task = {
  id: string
  name: string
  timer: Timer
}

type Timer = {
  totalSeconds: number
  timeStatus: TimerStatus
}

type TimerStatus = 'inProgress' | 'Stopped'
