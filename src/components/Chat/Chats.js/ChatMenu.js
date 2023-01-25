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
            {chatData.type == 'private' ?
                (chatData.user2.displayName) :
                (chatData.groupName)
            }
            {
                lastMessage ?
                    (`  ${chatData.participantsMap[lastMessage.from].displayName} ` + ": " + lastMessage.message)
                    :
                    ('say hi')
            }
        </div>
    )
}
