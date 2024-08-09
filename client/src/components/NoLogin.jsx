import React from 'react'
import '../index.css'
import { Link } from 'react-router-dom'

const NoLogin = () => {
  return (
    <div className='relative'>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 w-[90%] sm:w-1/2 sm:h-[50vh] sm: column-div p-4 rounded-ss-full'>
              <div className='relative z-20'>
                  <h1 className='text-3xl md:text-5xl font-bold text-center p-4 colorMixBlue hover:scale-105 transition duration-500 ease-in-out z-20'>Welcome to Resume Builder Application</h1>
                  <p className='text-yellow-500 text-md md:text-lg text-start hover:text-orange-300 transition duration-500 ease-in-out '>This Appliction is help to you for build your <span className='text-yellow-500 uppercase mx-2 underline '>first Resume</span> for getting your dream job in this market.</p>
                  <p className='text-yellow-500 text-start'><Link to={'/signup'} className='text-xl text-blue-800 hover:text-blue-600 transition duration-400 ease-in-out cursor-pointer'>Click here!</Link> To get your Resume.</p>
              </div>
      </div>
      <div className='relative z-10'>
      <div className='absolute sm:w-44 sm:h-44 bg-slate-300 top-[25rem] right-0 rounded-se-full'></div>
      <div className='absolute w-40 h-40 bg-blue-400 right-44 top-[18rem] rounded-es-full hidden md:block'></div>
      <div className='absolute sm:w-36 sm:h-36 w-24 h-24 bg-yellow-300 sm:-bottom-36 -bottom-20 sm:z-10 left-0 sm:rounded-full rounded-ss-3xl overflow-visible'></div>
      <div className='absolute sm:w-36 sm:h-36 w-24 h-24  bg-violet-500 -bottom-28 sm:inset-28 inset-10 right-0 rounded-ee-3xl'></div>
      </div>
      </div>
  )
}

export default NoLogin
