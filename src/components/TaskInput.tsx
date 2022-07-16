import React, { useRef } from 'react'
import { randomId } from '../utils/uuid'
import { Task } from '../utils/types'

type Props = {
  onAdd: (taskName: Task) => void
}

const TaskInput = ({ onAdd }: Props) => {
  const inputEl = useRef<HTMLInputElement>(null)
  const addTask = (taskName: string) => {
    const task: Task = {
      id: randomId(),
      name: inputEl.current.value,
      timer: {
        totalSeconds: 0,
        timeStatus: 'inProgress',
      },
    }
    onAdd(task)
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.key !== 'Enter') return
    addTask(inputEl.current.value)
    inputEl.current.value = ''
  }
  return (
    <div>
      <label>
        Task:
        <input
          type="text"
          name="name"
          placeholder="Input your task"
          onKeyDown={handleKeyDown}
          ref={inputEl}
        />
      </label>
    </div>
  )
}

export default TaskInput
