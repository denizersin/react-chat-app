import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Chats from '../components/Chats/Chats';
import PrivChatScreen from '../components/Chats/ChatScreen/PrivChatScreen';
// import Chat from '../components/Chat/Chat';
import ChatRequests from '../components/ChatRequests';
import CreateGroupForm from '../components/Groups/CreateGroupForm';
import GroupChatScreen from '../components/Groups/GroupChatScreen';
import { Groups } from '../components/Groups/Groups';
import UserProfile from '../components/UserProfile';
import { groupChats, groupChatsSelector } from '../features/groupChatsSlice';
import { selectedChatIdSelector } from '../features/selectedChatIdSLice';
import { userChatsSelector } from '../features/userChatsSlice';
import { userDataSelctor } from '../features/userDataSlice';
import { listeners, listenUserData } from '../services/fb';
import { RiUserAddLine } from 'react-icons/ri';
import "../styles/Home.css"
import Notifications from '../components/Notif/Notifications';
import ChatScreen from '../components/ChatScreen/ChatScreen';
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
                {/* <CreateGroupForm /> */}
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
