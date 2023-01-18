import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Chat from '../components/Chat';
import ChatRequests from '../components/ChatRequests';
import ChatsMenu from '../components/ChatsMenu';
import SearchUser from '../components/SearchUser';

export default function Home() {

    const user = useSelector(state => state.user.user);
    const [currChat, setCurrChat] = useState(null);
    if (!user) return;

    return (
        <div className={'Home component'}> <span>Home</span>
            <SearchUser />
            <ChatRequests />
            <ChatsMenu setCurrChat={setCurrChat} />
            {currChat && <Chat currChat={currChat} setCurrChat={setCurrChat} />}
        </div>
    )
}
