import React, { useState } from 'react'
import MessagesContainer from '../Chats/ChatScreen/MessagesContainer'
import GroupChatInfo from './GroupChatInfo';
import GroupInfoScreen from './GroupInfo/GroupInfoScreen'
import GroupMessageForm from './GroupMessageForm'

export default function GroupChatScreen({ chatData }) {

    const [activeEmoji, setActiveEmoji] = useState(false);
    const toggleActiveEmoji = () => {
        setActiveEmoji(prev => !prev)
    }

    return (
        <div className={'GroupChatScreen chat-screen component'}> <span>GroupChatScreen</span>
            <GroupChatInfo chatData={chatData} />
            <MessagesContainer chatData={chatData} activeEmoji={activeEmoji} />
            <GroupMessageForm chatData={chatData} activeEmoji={activeEmoji} toggleActiveEmoji={toggleActiveEmoji} />
            {/* <GroupInfoScreen chatData={chatData} /> */}
        </div>
    )
}
