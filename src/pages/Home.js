import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import UserProfile from '../components/UserProfile';
import {  groupChatsSelector } from '../features/groupChatsSlice';
import { userChatsSelector } from '../features/userChatsSlice';
import { userDataSelctor } from '../features/userDataSlice';
import "../styles/Home.css"
import Notifications from '../components/Notif/Notifications';
import PrivChatScreen from '../components/Chats/ChatScren/Priv/PrivChatScreen';
import Chats from '../components/Chats/Priv/Chats';
import GroupChatScreen from '../components/Chats/ChatScren/Group/GroupChatScreen';
import { Groups } from '../components/Chats/Group/Groups';
import ChatScreen from "../components/Chats/ChatScren/ChatScreen"
import { listenUserData } from '../services/fb';
export default function Home() {
    console.log('HOME')
    const userAuth = useSelector(state => state.userAuth);
    const userData = useSelector(userDataSelctor);
    const userChats = useSelector(userChatsSelector);
    const groupCHats = useSelector(groupChatsSelector);
    const selectedChatId = useSelector(state => state.selectedChatId.value);


    const selectedChatData = userChats[selectedChatId] || groupCHats[selectedChatId]

    useEffect(() => {
        listenUserData(userData);
    }, []);

    return (
        <div className={'Home component'}> <span>Home</span>

            <div className='left'>
                <UserProfile user={userData}>
                    <Notifications />
                </UserProfile>
                <Groups />
                <Chats />
            </div>
            <div className="right">
                <ChatScreen>
                    {selectedChatId && ((selectedChatData.type == 'private')
                        ?
                        (<PrivChatScreen chatData={selectedChatData} />)
                        :
                        (<GroupChatScreen chatData={selectedChatData} />))}
                </ChatScreen>

            </div>



        </div>
    )
}
