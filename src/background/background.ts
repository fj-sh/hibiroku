import { addOneSecondToTasksInProgress } from '../lib/tasks'

export const ALARM_NAME = 'hibiroku'

chrome.alarms.create(ALARM_NAME, {
  // periodInMinutes: 1 / 60,
  periodInMinutes: 1 / 60,
})

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name !== ALARM_NAME) return
  addOneSecondToTasksInProgress()
})
