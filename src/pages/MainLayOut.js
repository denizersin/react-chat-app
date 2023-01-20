import React, { startTransition } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import LoadingModal from '../components/LoadingModal'
import IsLoadingSlice from '../features/isLoadingSlice'
import { store } from '../features/store'
import { logOut } from '../features/userSlice'
import Deneme from './Deneme'

export default function MainLayOut() {
    const navigate = useNavigate();
    return (
        <div className={'MainLayOut component'}> <span>MainLayOut</span>
            <nav>
                <button onClick={() => {
                    store.dispatch(logOut())
                }}>logout</button>
                <button onClick={() => {navigate('/auth') }}>login </button>
                <button onClick={() => {navigate('/register') }}>register </button>

            </nav>

            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <Outlet />
            <LoadingModal />
        </div>
    )
}