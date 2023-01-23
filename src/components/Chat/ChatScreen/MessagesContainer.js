import React, { memo } from 'react'
import { useSelector } from 'react-redux';
import Message from './Message';
import "../../../styles/MessageContainer.css"
function MessagesContainer({ selectedChatMsgLem }) {
    let selectedChatId;
    useSelector(state => {
        selectedChatId = state.selectedChatId.value
    });
    let chatsData;
    useSelector(state => { chatsData = Object.values(state.userChats.value) });
    const selectedChatData = chatsData.find(chatData => chatData.id == selectedChatId)
    const renderedMessages = selectedChatData.messages.map(msg => {
        return (<Message key={msg.id} msg={msg} chatData={selectedChatData} />)
    })
    return (
        <div className={'MessagesContainer component'}> <span>MessagesContainer</span>
            {renderedMessages}
        </div>
    )
}

export default MessagesContainer