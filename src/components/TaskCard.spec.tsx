import React from 'react'
import renderer from 'react-test-renderer'
import TaskCard from './TaskCard'
import { Task } from '../lib/types'

describe('TaskCard', () => {
  it('Create snapshot', () => {
    const task: Task = {
      id: 'aaa',
      name: 'task',
      status: 'Stopped',
      totalSeconds: 1,
    }
    const onDelete = () => {}

    const component = renderer.create(<TaskCard task={task} onDelete={onDelete} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
