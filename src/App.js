import { isFocusable } from '@testing-library/user-event/dist/utils'
import React from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { store } from './features/store'
import { checkuserAuth } from './features/userAuthSlice'
import { getUserDataVal } from './features/userDataSlice'
import Auth from './pages/Auth'
import FetchProvider from './pages/FetchProvider'
import Home from './pages/Home'
import MainLayOut from './pages/MainLayOut'
import Register from './pages/Regiester'

store.dispatch(checkuserAuth())


export const App = () => {

  const userAuth = useSelector(state => state.userAuth);

  const { pathName } = useLocation();

  const navigate = useNavigate();
  if (pathName == "/" && userAuth.status == "succeeded" && userAuth.userAuth == null) {
    navigate("/auth")
  }


  return (
    <Routes>
      <Route path='/' element={<MainLayOut />}>
        <Route index={true} element={userAuth.userAuth && <FetchProvider />} />
        <Route path='auth' element={<Auth />} />
        <Route path='register' element={<Register />}></Route>
      </Route>
    </Routes>
  )
}
