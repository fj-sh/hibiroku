import React, { useRef } from 'react'
import { randomId } from '../lib/uuid'
import { Task } from '../lib/types'
import './TaskInput.css'

type Props = {
  onAdd: (taskName: Task) => void
}

const TaskInput = ({ onAdd }: Props) => {
  const inputEl = useRef<HTMLInputElement>(null)

  const handleAddTask = () => {
    if (inputEl.current.value === '') return
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
    <div className="TaskInput_container">
      <label>
        <input
          data-testid="TaskInput-input"
          type="text"
          name="taskName"
          placeholder="Enter your task"
          className="TaskInput_input"
          onKeyDown={handleKeyDown}
          ref={inputEl}
        />
        <button onClick={handleAddTask} className="TaskInput_button_add">
          Add
        </button>
      </label>
    </div>
  )
}

export default TaskInput
