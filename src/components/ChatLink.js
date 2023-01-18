import React from 'react'
import { useSelector } from 'react-redux'

export default function ChatLink({ chatData, onClickMenu }) {
    console.log(chatData)
    const user2 = chatData.user2;
    return (
        <div className={'ChatLink component'} onClick={(e) => onClickMenu(e, chatData)}> <span>ChatLink</span>
            {user2.displayName}
            {" last message: " + (chatData.messages.at(-1)?.message !== undefined || " ")}
        </div >
    )
}
