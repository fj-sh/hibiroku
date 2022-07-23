import React from 'react'
import { createRoot } from 'react-dom/client'
import './popup.css'
import SimpleTabs from '../components/SimpleTabs'
import Timer from '../components/Timer'
import Pomodoro from '../components/Pomodoro'

const App = () => {
  return (
    <>
      <SimpleTabs timer={<Timer />} pomodoro={<Pomodoro />} />
    </>
  )
}

const app = document.createElement('div')
app.setAttribute('id', 'app')
document.body.appendChild(app)
const container = document.getElementById('app')
const root = createRoot(container!) // createRoot(container!) if you use TypeScript
root.render(<App />)
