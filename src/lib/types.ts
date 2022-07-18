export type Task = {
  id: string
  name: string
  status: TimerStatus
  totalSeconds: number
}

export type TimerStatus = 'inProgress' | 'Stopped'
