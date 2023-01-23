import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import MessageForm from './MessageForm';
import MessagesContainer from './MessagesContainer';

export default function ChatScreen() {
    let userChatsData;
    useSelector(state => {
        userChatsData = Object.values(state.userChats.value)
    });
    const selectedChatId = useSelector(state => state.selectedChatId.value);
    const selectedChatData = userChatsData.find(chatData => chatData.id == selectedChatId)
    const selectedMessagesLen = selectedChatData && selectedChatData.messages.length;
    return (
        <div className={'ChatScreen component'}> <span>ChatScreen</span>
            <MessagesContainer selectedMessagesLen={selectedMessagesLen} />
            <MessageForm />
        </div>
    )
}