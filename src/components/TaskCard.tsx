import React, { useEffect, useState } from 'react'
import { Task, TimerStatus } from '../lib/types'
import { secondsToHms } from '../lib/timer'
import { getTaskFromStorage, resetTimer, toggleTaskStatus } from '../lib/tasks'
import './TaskCard.css'

type Props = {
  task: Task
  onDelete: (taskId: string) => void
}

const TaskCard = ({ task, onDelete }: Props) => {
  const [seconds, setSeconds] = useState<number>(0)
  const [status, setStatus] = useState<TimerStatus>('Stopped')
  let timer = undefined
  const updateSeconds = () => {
    timer = setInterval(async () => {
      const storedTask = await getTaskFromStorage(task.id)
      setSeconds(storedTask.totalSeconds)
    }, 1000)
  }

  useEffect(() => {
    updateSeconds()
    return () => clearInterval(timer)
  }, [])

  const handleToggleStatus = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    task: Task
  ) => {
    toggleTaskStatus(task.id).then((updatedStatus) => {
      setStatus(updatedStatus)
    })
  }

  const handleResetTimer = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, task: Task) => {
    resetTimer(task.id).then((task) => {
      setSeconds(task.totalSeconds)
    })
  }

  const handleDeleteTask = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    taskId: string
  ) => {
    onDelete(taskId)
  }

  return (
    <div className="TaskCard_container">
      <label className="TaskCard_task_status">
        {status === 'inProgress' ? (
          <div className="TaskCard_task_status_inProgress">In Progress</div>
        ) : (
          <div className="TaskCard_task_status_pending">Pending</div>
        )}
      </label>
      <div className="TaskCard_task_name_seconds_wrapper">
        <h2 className="TaskCard_task_name">{task.name}</h2>
        <time className="TaskCard_task_seconds">{secondsToHms(seconds)}</time>
      </div>

      <div className="TaskCard_button_wrapper">
        <button onClick={(event) => handleToggleStatus(event, task)}>
          {status === 'inProgress' ? <>Stop</> : <>Start</>}
        </button>

        <button onClick={(event) => handleResetTimer(event, task)}>Reset</button>
        <button onClick={(event) => handleDeleteTask(event, task.id)}>Delete</button>
      </div>
    </div>
  )
}

export default TaskCard
