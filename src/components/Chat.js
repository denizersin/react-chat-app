import React from 'react'
import { useSelector } from 'react-redux'
import ChatForm from './ChatForm'
import MessagesContainer from './MessagesContainer'

export default function Chat({ currChat, setCurrChat }) {

    
    const currChatData = useSelector(state => state.userChats.value[currChat.id])
    return (
        <div className={'Chat component'}> <span>Chat</span>
            {currChatData.messages.length != 0 && <MessagesContainer chatData={currChatData} />}
            <ChatForm currChat={currChat} />
        </div>
    )
}
