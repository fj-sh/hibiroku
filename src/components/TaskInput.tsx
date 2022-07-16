import React, { useRef } from 'react'
import { randomId } from '../utils/uuid'
import { Task } from '../utils/types'

type Props = {
  onAdd: (taskName: Task) => void
}

const TaskInput = ({ onAdd }: Props) => {
  const inputEl = useRef<HTMLInputElement>(null)
  const addTask = () => {
    const task: Task = {
      id: randomId(),
      name: inputEl.current.value,
      timer: {
        totalSeconds: 0,
        timeStatus: 'inProgress',
      },
    }
    onAdd(task)
    inputEl.current.value = ''
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.key !== 'Enter') return
    addTask()
  }

  const handleAddButtonClick = () => {
    addTask()
  }

  return (
    <div>
      <label>
        Register a Task:
        <input
          type="text"
          name="taskName"
          placeholder="Input your task"
          onKeyDown={handleKeyDown}
          ref={inputEl}
        />
        <button onClick={handleAddButtonClick}>Add</button>
      </label>
    </div>
  )
}

export default TaskInput
