import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import './popup.css'
import TaskInput from '../components/TaskInput'
import { Task } from '../utils/types'

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const handleAddTask = (taskInput: Task) => {
    const updatedTasks = [...tasks, taskInput]
    setTasks(updatedTasks)
  }
  return (
    <>
      <TaskInput onAdd={handleAddTask} />
      {tasks.map((task) => (
        <>{task.name}</>
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
