import React, { useEffect, useState } from 'react'
import TaskInput from '../components/TaskInput'
import { Task } from '../lib/types'
import TaskCard from '../components/TaskCard'
import { addTaskInChromeStorage, deleteTaskInChromeStorage, resetAllTasks } from '../lib/tasks'

const Timer = () => {
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

  const handleAllReset = () => {
    resetAllTasks()
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
      <button onClick={handleAllReset}>All Reset</button>
    </>
  )
}

export default Timer
