import React, { memo } from 'react'

import "../../../../styles/PrivChatScreen.css"
import { getUserDataVal } from '../../../../features/userDataSlice';
import MessagesContainer from '../MessagesContainer';
import PrivMessageForm from './PrivMessageForm';

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