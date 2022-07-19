import React from 'react'
import TaskInput from './TaskInput'
import { act } from 'react-dom/test-utils'
import { createRoot, Root } from 'react-dom/client'

// describe('[Snapshot Test]TaskInput.tsx', () => {
//   it('Create snapshot', () => {
//     const onAdd = () => {}
//
//     const component = renderer.create(<TaskInput onAdd={onAdd} />)
//     const tree = component.toJSON()
//     expect(tree).toMatchSnapshot()
//   })
// })

describe('[DOM Test]TaskInput.tsx', () => {
  let root: Root = null
  let container = null
  beforeEach(() => {
    // https://ja.reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html
    globalThis.IS_REACT_ACT_ENVIRONMENT = true
    const app = document.createElement('div')
    app.setAttribute('id', 'root')
    document.body.appendChild(app)
    container = document.getElementById('root')
    root = createRoot(container!)
  })
  afterEach(() => {
    root.unmount()
  })
  it('renders TaskInput.tsx', () => {
    act(() => {
      const onAdd = jest.fn()
      root.render(<TaskInput onAdd={onAdd} />)
    })
    expect(container.querySelector("[data-testid='TaskInput-input']")).toBeTruthy()
  })
})
