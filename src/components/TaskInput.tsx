import React, { useRef } from 'react'
import { randomId } from '../lib/uuid'
import { Task } from '../lib/types'

type Props = {
  onAdd: (taskName: Task) => void
}

const TaskInput = ({ onAdd }: Props) => {
  const inputEl = useRef<HTMLInputElement>(null)

  const handleAddTask = () => {
    const task: Task = {
      id: randomId(),
      name: inputEl.current.value,
      status: 'Stopped',
      totalSeconds: 0,
    }
    onAdd(task)
    inputEl.current.value = ''
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.key !== 'Enter') return
    handleAddTask()
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
        <button onClick={handleAddTask}>Add</button>
      </label>
    </div>
  )
}

export default TaskInput
