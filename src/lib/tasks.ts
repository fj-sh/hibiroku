import { Task, TimerStatus } from './types'

export const getTasksFromStorage = async (): Promise<Task[]> => {
  const res = await chrome.storage.local.get(['tasks'])
  return res.tasks as Task[]
}

export const getTaskFromStorage = async (taskId: string) => {
  const tasksFromStorage = await getTasksFromStorage()
  if (tasksFromStorage.length === 0) return undefined
  return tasksFromStorage.filter((task) => task.id === taskId)[0]
}

export const persistTasksInChromeStorage = (tasks: Task[]) => {
  chrome.storage.local.set(
    {
      tasks: tasks,
    },
    () => {
      console.log('Saved task to Chrome local storage:', tasks)
    }
  )
}

export const toggleTaskStatus = async (taskId: string): Promise<TimerStatus> => {
  const task = await getTaskFromStorage(taskId)
  const updatedStatus: TimerStatus = task.status === 'inProgress' ? 'Stopped' : 'inProgress'
  const updatedTask = {
    ...task,
    status: updatedStatus,
  }
  updateTaskInChromeStorage(updatedTask)
  return updatedStatus
}

export const addTaskInChromeStorage = async (task: Task) => {
  const tasks = await getTasksFromStorage()
  const updatedTasks = [...tasks, task]
  persistTasksInChromeStorage(updatedTasks)
}

export const updateTaskInChromeStorage = (task: Task) => {
  chrome.storage.local.get(['tasks'], (res) => {
    const storedTasks: Task[] = res.tasks ?? []
    if (storedTasks.length === 0) return
    const updatedTasks = storedTasks.map((storedTask) => {
      if (storedTask.id === task.id) {
        return task
      }
      return storedTask
    })
    persistTasksInChromeStorage(updatedTasks)
  })
}

export const deleteTaskInChromeStorage = (taskId: string) => {}

export const addOneSecondToTasksInProgress = () => {
  chrome.storage.local.get(['tasks'], (res) => {
    const storedTasks: Task[] = res.tasks ?? []
    if (storedTasks.length === 0) return
    const updatedTasks = storedTasks.map((storedTask) => {
      if (!('status' in storedTask)) return
      if (storedTask.status === 'inProgress') {
        return { ...storedTask, totalSeconds: storedTask.totalSeconds + 1 }
      } else {
        return storedTask
      }
    })
    persistTasksInChromeStorage(updatedTasks)
  })
}

export const resetTimer = async (taskId: string) => {
  const task = await getTaskFromStorage(taskId)
  task.totalSeconds = 0
  updateTaskInChromeStorage(task)
  return task
}