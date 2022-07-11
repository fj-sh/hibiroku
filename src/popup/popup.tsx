import React  from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  return <div>popup</div>
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
