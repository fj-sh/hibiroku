import { addOneSecondToTasksInProgress } from '../lib/tasks'

export const ALARM_NAME = 'hibiroku'

chrome.alarms.create(ALARM_NAME, {
  periodInMinutes: 1 / 60,
})

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name !== ALARM_NAME) return
  addOneSecondToTasksInProgress()
  chrome.storage.local.get(['timer'], (res) => {
    const timer = res.timer + 1
    chrome.storage.local.set({
      timer,
    })
  })
})

chrome.storage.local.get(['timer'], (res) => {
  chrome.storage.local.set({
    timer: 'timer' in res ? res.timer : 0,
  })
})
