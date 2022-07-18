import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './popup.css'
import TaskInput from '../components/TaskInput'
import { Task } from '../lib/types'
import TaskCard from '../components/TaskCard'
import { getTasksFromStorage, persistTasksInChromeStorage } from '../lib/tasks'

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([])

  const updateTasksByStorage = () => {
    chrome.storage.local.get(['tasks'], (res) => {
      const storedTasks = res.tasks ?? []
      setTasks(storedTasks)
    })
  }

  const handleAddTask = (taskInput: Task) => {
    const updatedTasks = [...tasks, taskInput]
    persistTasksInChromeStorage(updatedTasks)
    updateTasksByStorage()
  }

  useEffect(() => {
    const getTasks = async () => {
      return await getTasksFromStorage()
    }

    const storedTasks = getTasks()
    console.log('useEffect', storedTasks)
  }, [])
  return (
    <>
      <TaskInput onAdd={handleAddTask} />
      {tasks.length !== 0 && tasks.map((task, index) => <TaskCard task={task} key={index} />)}
    </>
  )
}

const app = document.createElement('div')
app.setAttribute('id', 'app')
document.body.appendChild(app)
const container = document.getElementById('app')
const root = createRoot(container!) // createRoot(container!) if you use TypeScript
root.render(<App />)
