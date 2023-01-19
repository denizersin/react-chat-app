import React from 'react'
import { useSelector } from 'react-redux'

export default function ChatLink({ chatData, onClickMenu }) {
    console.log(chatData)
    let userData;
    useSelector(state => {
        userData = state.user.user.userData
    })
    const user2 = chatData.user2;
    const lastMessage = chatData.messages.at(-1);
    const msgOwner = lastMessage ? (lastMessage.from == user2.id ? user2 : userData) : null
    const unSawMessagesNum = chatData[user2.id];
    return (
        <div className={'ChatLink component'} onClick={(e) => onClickMenu(e, chatData)}> <span>ChatLink</span>
            {user2.displayName}
            {" last message: " + (lastMessage ? (msgOwner.displayName + ":" + lastMessage.message) : (" "))}
            {"unsawNUm: " + unSawMessagesNum && unSawMessagesNum}
        </div >
    )
}
