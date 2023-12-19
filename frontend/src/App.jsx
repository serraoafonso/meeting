import React, { useState, useContext } from 'react'
import {Navigate, createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom'
import Home from './components/home/Home'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import Navbar from './components/navbar/Navbar'
import Profile from './components/profile/Profile'
import Premium from './components/premium/Premium'
import DarkMode from '../src/assets/imgs/night-mode.png'
import LightMode from '../src/assets/imgs/brightness.png'
import { DarkModeContext } from './context/darkModeContext'
import './App.css'
import { UserContext } from './context/userContext'

let teste = true;

const Layout = () =>{

const { darkMode } = useContext(DarkModeContext);


  return(
    <main className='body' style={{backgroundColor: darkMode ?  "#222" : "#f2f2f2", color: darkMode? "#f2f2f2" : "#222"}}>
      <div className="menu">
        <Navbar/>
      </div>
      <div className="main">
        <Outlet/>
      </div>
    </main>
  )
}

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);//para resolver o erro so meter dentro da funcao o useContext
  return user ? children : <Navigate to="/login" />;
};
const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute><Layout/></ProtectedRoute>,
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
