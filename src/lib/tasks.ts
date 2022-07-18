import { Task } from './types'

export const persistTasksInChromeStorage = (tasks: Task[]) => {
  chrome.storage.local.set(
    {
      tasks: tasks,
    },
    () => {
      console.log('[persistTasksInChromeStorage] Stored Tasks: ', tasks)
    }
  )
}

export const toggleTaskStatus = (task: Task): Task => {
  return {
    ...task,
    status: task.status === 'inProgress' ? 'Stopped' : 'inProgress',
  }
}

export const updateTaskInChromeStorage = (task: Task) => {
  chrome.storage.local.get(['tasks'], (res) => {
    const storedTasks: Task[] = res.tasks ?? []
    if (storedTasks === undefined) return
    const updatedTasks = storedTasks.map((storedTask) => {
      if (storedTask.id === task.id) {
        return task
      }
      return storedTask
    })
    persistTasksInChromeStorage(updatedTasks)
  })
}

export const addOneSecondToTasksInProgress = () => {
  chrome.storage.local.get(['tasks'], (res) => {
    const storedTasks: Task[] = res.tasks
    if (storedTasks === undefined) return
    const updatedTasks = storedTasks.map((storedTask) => {
      if (storedTask.status === 'inProgress') {
        return { ...storedTask, totalSeconds: storedTask.totalSeconds + 1 }
      }
    })
    persistTasksInChromeStorage(updatedTasks)
  })
}
