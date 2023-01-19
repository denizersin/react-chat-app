import React from 'react'
import { useSelector } from 'react-redux';
import "../styles/MessageContainer.css"
export default function MessagesContainer({chatData}) {
    const user = useSelector(state => state.user.user);
    const messages = chatData.messages;
    return (
        <div className={'MessagesContainer component'}> <span>MessagesContainer</span>
            {messages.map(msg => {
                const msgOwner = msg.from == user.uid ? user.userData : chatData.user2
                return (<div key={msg.id} className={`msg-container`}>
                    <div className={`msg ${msg.from == user.uid ? "user1" : "user2"}`}>
                        {msgOwner.displayName + " " + msg.message}
                    </div>
                </div>)
            })}
n        </div>
    )
}
