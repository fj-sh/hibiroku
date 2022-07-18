import React, { useEffect, useState } from 'react'
import { Task, TimerStatus } from '../lib/types'
import { secondsToHms } from '../lib/timer'
import { toggleTaskStatus, updateTaskInChromeStorage } from '../lib/tasks'

type Props = {
  task: Task
}

const TaskCard = ({ task }: Props) => {
  const [seconds, setSeconds] = useState<number>(0)
  const [startTime, setStartTime] = useState<number>(0)
  const [stopTime, setStopTime] = useState<number>(0)
  const [inProgressTime, setInProgressTime] = useState<number>(0)
  const [timeStatus, setTimerStatus] = useState<TimerStatus>('Stopped')
  let timer = undefined
  const updateSeconds = () => {
    timer = setInterval(() => {
      chrome.storage.local.get('timer', (res) => {
        setInProgressTime(res.timer)
      })
      let updatedSecond = 0
      if (timeStatus === 'inProgress') {
        updatedSecond = seconds + (inProgressTime - startTime)
        setSeconds((seconds) => updatedSecond)
      } else if (timeStatus === 'Stopped') {
        updatedSecond = seconds + (inProgressTime - startTime)
      }
    }, 1000)
  }

  useEffect(() => {
    updateSeconds()
    return () => clearInterval(timer)
  }, [inProgressTime])

  const handleToggleStatus = (event: any, task: Task) => {
    const updatedTask = toggleTaskStatus(task)
    updateTaskInChromeStorage(updatedTask)
  }

  return (
    <>
      {task.name}
      <button onClick={(event) => handleToggleStatus(event, task)}>
        {timeStatus === 'inProgress' ? <>Stop</> : <>Start</>}
      </button>
      {secondsToHms(seconds)}
      <br />
    </>
  )
}

export default TaskCard
