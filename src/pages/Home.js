import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Chat from '../components/Chat/Chat';
// import Chat from '../components/Chat/Chat';
import ChatRequests from '../components/ChatRequests';
import CreateGroupForm from '../components/Group/CreateGroupForm';
import { listeners, listenUserData } from '../services/fb';

export default function Home() {

    const userAuth = useSelector(state => state.userAuth);


    if (!userAuth.userAuth) return;
    console.log("rendered HOMe", userAuth)
    return (
        <div className={'Home com`ponent'}> <span>Home</span>
            <ChatRequests />
            <CreateGroupForm />
            <Chat />
        </div>
    )
}

