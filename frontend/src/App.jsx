import React, { useState, useContext } from 'react'
import {Navigate, createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom'
import Home from './components/home/Home'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import Navbar from './components/navbar/Navbar'
import Profile from './components/profile/Profile'
import Premium from './components/premium/Premium'
import './App.css'

const Layout = () =>{
  return(
    <main className='body'>
      <div className="menu">
        <Navbar/>
      </div>
      <div className="main">
        <Outlet/>
      </div>
    </main>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        path: 'profile/:username',
        element: <Profile/>
      },{
        path: '/',
        element: <Home/>
      }
    ]
  },
  {
    path: '/register',
    element: <Register/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/premium',
    element: <Premium/>
  }
])

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>
  )
}

export default App
