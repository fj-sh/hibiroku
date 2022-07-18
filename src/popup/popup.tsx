import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './popup.css'
import TaskInput from '../components/TaskInput'
import { Task } from '../lib/types'
import TaskCard from '../components/TaskCard'
import { persistTasksInChromeStorage } from '../lib/tasks'

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const handleAddTask = (taskInput: Task) => {
    const updatedTasks = [...tasks, taskInput]
    persistTasksInChromeStorage(updatedTasks)
    setTasks(updatedTasks)
  }
  useEffect(() => {
    chrome.storage.local.get(['tasks'], (res) => {
      const storedTasks = res.tasks ?? []
      setTasks(storedTasks)
    })
  }, [])
  return (
    <>
      <TaskInput onAdd={handleAddTask} />
      {tasks && tasks.map((task) => <TaskCard task={task} key={task.id} />)}
    </>
  )
}

const app = document.createElement('div')
app.setAttribute('id', 'app')
document.body.appendChild(app)
const container = document.getElementById('app')
const root = createRoot(container!) // createRoot(container!) if you use TypeScript
root.render(<App />)
