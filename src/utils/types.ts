type Task = {
  id: string
  name: string
  timer: Timer
}

type Timer = {
  total: string
  timeStatus: TimerStatus
}

type TimerStatus = 'inProgress' | 'Stopped'
