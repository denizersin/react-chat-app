import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { dataModel } from '../../../constants';
import { getSelectedChatIdVal } from '../../../features/selectedChatIdSLice';
import { getUserChatsVal } from '../../../features/userChatsSlice';
import { getUserDataVal } from '../../../features/userDataSlice';
import { sendAMessage } from '../../../services/fb';
import MessageForm from './MessageForm';
import MessagesContainer from './MessagesContainer';
import PrivMessageForm from './PrivMessageForm';

import "../../../styles/PrivChatScreen.css"

export default function PrivChatScreen({ chatData }) {
    const userData = getUserDataVal();

    return (
        <div className={'PrivChatScreen chat-screen component'}> <span>PrivChatScreen</span>
            <PrivChatInfo chatData={chatData} userData={userData} />
            <MessagesContainer chatData={chatData} />
            <PrivMessageForm chatData={chatData} />
        </div>
    )
}

const PrivChatInfo = ({ userData, chatData }) => {
    const user2 = chatData.user2;
    return (
        <div className='PrivChatInfo  component '> <span>PrivChatInfo</span>
            <div className="c c1">
                <img src={userData.avatarUrl} alt="" />
                <img src={user2.avatarUrl} alt="" />
            </div>
            <div className="c c2">
                <div>{userData.displayName}</div>
                <div>~</div>
                <div>{user2.displayName}</div>
            </div>
        </div>
    )
}