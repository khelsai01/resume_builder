import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import ResumeForm from '../components/ResumeForm'
import ResumeEditForm from '../pages/ResumeEdit'

const AllRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/resume' element={<ResumeForm />} />
      <Route path='/resume/:id' element={<ResumeEditForm />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />

    </Routes>
  )
}

export default AllRouter
