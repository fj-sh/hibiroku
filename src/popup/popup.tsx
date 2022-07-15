import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import './popup.css'
import TaskInput from '../components/TaskInput'

const App = () => {
  const [tasks, setTasks] = useState<string[]>([])
  const handleAddTask = (taskInput: string) => {
    const updatedTasks = [...tasks, taskInput]
    setTasks(updatedTasks)
  }
  return (
    <>
      <TaskInput onAdd={handleAddTask} />
      {tasks.map((task) => (
        <>{task}</>
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
