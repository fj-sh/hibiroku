import React, { useEffect, useState } from 'react'
import { Task, TimerStatus } from '../lib/types'
import { secondsToHms } from '../lib/timer'
import { getTaskFromStorage, resetTimer, toggleTaskStatus } from '../lib/tasks'

type Props = {
  task: Task
}

const TaskCard = ({ task }: Props) => {
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

  return (
    <>
      {task.name}
      <button onClick={(event) => handleToggleStatus(event, task)}>
        {status === 'inProgress' ? <>Stop</> : <>Start</>}
      </button>
      {secondsToHms(seconds)}
      <button onClick={(event) => handleResetTimer(event, task)}>Reset</button>
      <br />
    </>
  )
}

export default TaskCard
