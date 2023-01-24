import React from 'react'
import { useDispatch } from 'react-redux'
import { setSelectedChatId } from '../../../features/selectedChatIdSLice'
import { store } from '../../../features/store'

export default function ChatMenu({ chatData }) {
    const user = store.getState().userData.value;
    const dispatch = useDispatch();
    const handleClickMenu = (e) => {
        console.log('asd', chatData)
        dispatch(setSelectedChatId(chatData.id))
    }
    const lastMessage = chatData.messages.at(-1);
    return (
        <div onClick={handleClickMenu} className={'ChatMenu component'}> <span>ChatMenu</span>
            {chatData.user2.displayName+'  '}
            {
                lastMessage ?
                    (`${lastMessage.from == user.id ?user.displayName : chatData.user2.displayName} ` + ": " + lastMessage.message) :
                    ('say hi')
            }
        </div>
    )
}
