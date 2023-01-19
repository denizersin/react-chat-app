import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Chat from '../components/Chat';
import ChatLink from '../components/ChatLink';
import ChatRequests from '../components/ChatRequests';
import ChatsMenu from '../components/ChatsMenu';
import SearchUser from '../components/SearchUser';
import { listeners, listenUserData } from '../services/fb';
import { ak } from '../services/fbAuth';

export default function Home() {

    const user = useSelector(state => state.user);
    const [currChat, setCurrChat] = useState(null);
    useEffect(() => {
        if (user.user != null && listeners.listenUserData === null) {
            console.log(user)
            listenUserData(user.user.userData)
        }
    }, [user]);
    if (!user.user) return;
    console.log("rendered HOMe")
    return (
        <div className={'Home com`ponent'}> <span>Home</span>
            <SearchUser />
            <ChatRequests />
            <ChatsMenu setCurrChat={setCurrChat} />
            {currChat && <Chat currChat={currChat} setCurrChat={setCurrChat} />}
        </div>
    )
}
