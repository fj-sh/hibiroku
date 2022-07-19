import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './popup.css'
import TaskInput from '../components/TaskInput'
import { Task } from '../lib/types'
import TaskCard from '../components/TaskCard'
import {
  addTaskInChromeStorage,
  deleteTaskInChromeStorage,
  getTasksFromStorage,
} from '../lib/tasks'

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([])

  const updateTasksByStorage = () => {
    chrome.storage.local.get(['tasks'], (res) => {
      const storedTasks = res.tasks ?? []
      setTasks(storedTasks)
    })
  }

  const handleAddTask = async (task: Task) => {
    await addTaskInChromeStorage(task)
    updateTasksByStorage()
  }

  const handleDeleteTask = async (taskId: string) => {
    await deleteTaskInChromeStorage(taskId)
    updateTasksByStorage()
  }

  useEffect(() => {
    updateTasksByStorage()
  }, [])
  return (
    <>
      <TaskInput onAdd={handleAddTask} />
      {tasks.length !== 0 &&
        tasks.map((task, index) => (
          <TaskCard task={task} onDelete={handleDeleteTask} key={index} />
        ))}
    </>
  )
}

const app = document.createElement('div')
app.setAttribute('id', 'app')
document.body.appendChild(app)
const container = document.getElementById('app')
const root = createRoot(container!) // createRoot(container!) if you use TypeScript
root.render(<App />)
