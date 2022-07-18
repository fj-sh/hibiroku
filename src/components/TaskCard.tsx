import React, { useEffect, useState } from 'react'
import { Task, TimerStatus } from '../lib/types'
import { secondsToHms } from '../lib/timer'
import { getTaskFromStorage, toggleTaskStatus } from '../lib/tasks'

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

  const handleToggleStatus = (event: any, task: Task) => {
    toggleTaskStatus(task.id).then((updatedStatus) => {
      setStatus(updatedStatus)
    })
  }

  return (
    <>
      {task.name}
      <button onClick={(event) => handleToggleStatus(event, task)}>
        {status === 'inProgress' ? <>Stop</> : <>Start</>}
      </button>
      {secondsToHms(seconds)}
      <br />
    </>
  )
}

export default TaskCard
