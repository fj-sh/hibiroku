import React from 'react'
import { createRoot } from 'react-dom/client'
import './popup.css'
import SimpleTabs from '../components/SimpleTabs'
import Timer from '../components/Timer'

const App = () => {
  return (
    <>
      <SimpleTabs timerChildren={<Timer />} />
    </>
  )
}

const app = document.createElement('div')
app.setAttribute('id', 'app')
document.body.appendChild(app)
const container = document.getElementById('app')
const root = createRoot(container!) // createRoot(container!) if you use TypeScript
root.render(<App />)
