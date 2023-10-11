import React from 'react'
import TaskFrom from '../components/TaskForm'
import Logout from '../components/Logout'
import Login from './Login'

export default function Home() {
  const getToken = localStorage.getItem('Token')
  
  return (
    <div>
      {
        getToken ? <>
          <Logout></Logout>
          <TaskFrom></TaskFrom>
        </> : <Login />
      }

    </div>
  )
}
