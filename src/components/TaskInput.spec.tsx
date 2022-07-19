import React from 'react'
import renderer from 'react-test-renderer'
import TaskInput from './TaskInput'

describe('TaskInput', () => {
  it('Create snapshot', () => {
    const onAdd = () => {}

    const component = renderer.create(<TaskInput onAdd={onAdd} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
