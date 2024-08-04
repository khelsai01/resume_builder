import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ResumeForm from './components/ResumeForm'
import Navbar from './routes/Navbar'
import AllRouter from './routes/AllRouter'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <AllRouter />
      {/* <ResumeForm /> */}
    </>
  )
}

export default App
