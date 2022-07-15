import React, { useRef } from 'react'

type Props = {
  onAdd: (taskName: string) => void
}

const TaskInput = ({ onAdd }: Props) => {
  const inputEl = useRef<HTMLInputElement>(null)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.key !== 'Enter') return
    console.log('onEnter', inputEl.current.value)
    onAdd(inputEl.current.value)
    inputEl.current.value = ''
  }
  return (
    <div>
      <label>
        Task:
        <input type="text" name="name" onKeyDown={handleKeyDown} ref={inputEl} />
      </label>
    </div>
  )
}

export default TaskInput
