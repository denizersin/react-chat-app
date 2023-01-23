import React from 'react'
import { useDispatch } from 'react-redux'
import { setSelectedChatId } from '../../../features/selectedChatIdSLice'
import { store } from '../../../features/store'

export default function ChatMenu({ chatData }) {
    const dispatch=useDispatch();
    const handleClickMenu = (e) => {
        console.log('asd',chatData)
        dispatch(setSelectedChatId(chatData.id))
    }
    return (
        <div onClick={handleClickMenu} className={'ChatMenu component'}> <span>ChatMenu</span>
            {chatData.user2.displayName}
        </div>
    )
}
