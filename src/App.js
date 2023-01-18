import { isFocusable } from '@testing-library/user-event/dist/utils'
import React from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { store } from './features/store'
import { checkUser } from './features/userSlice'
import Auth from './pages/Auth'
import Home from './pages/Home'
import MainLayOut from './pages/MainLayOut'
import Register from './pages/Regiester'

store.dispatch(checkUser())


export const App = () => {

  const user = useSelector(state => state.user);

  const { pathName } = useLocation();

  const navigate=useNavigate();

  if (pathName == "/" && user.status == "succeeded"&&user.user==null) {
    navigate("/auth")
  }

  return (
    <Routes>
      <Route path='/' element={<MainLayOut />}>
        <Route index={true} element={<Home />} />
        <Route path='auth' element={<Auth />} />
        <Route path='register' element={<Register />}></Route>
      </Route>
    </Routes>
  )
}
