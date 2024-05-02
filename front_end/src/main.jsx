import React from 'react'
import ReactDOM from 'react-dom/client'
import { useState, useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { UserProvider} from './UserProvder.jsx'
import App from './App.jsx'
import Scoreboard from './pages/Scoreboard.jsx'
import Signup from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/leaderboard',
    element: <Scoreboard />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/login',
    element: <Login />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>,
)
