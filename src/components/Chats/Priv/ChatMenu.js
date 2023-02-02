import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { getSelectedChatIdVal, setSelectedChatId } from '../../../features/selectedChatIdSLice'
import { store } from '../../../features/store'
import UserProfile from '../../UserProfile';
const setUnSawAnim = (elem) => {
    elem.classList.remove('anim');
    setTimeout(() => {
        elem.classList.add('anim');
    }, 0);
}
export default function ChatMenu({ chatData }) {
    const userData = store.getState().userData.value;
    const dispatch = useDispatch();
    const handleClickMenu = (e) => {
        console.log('asd', getSelectedChatIdVal(), chatData)
        dispatch(setSelectedChatId(chatData.id))
    }
    const lastMessage = chatData.messages.at(-1);

    const iseSelected = chatData.id === getSelectedChatIdVal();
    let unSawMessagesNum;
    if (iseSelected) {
        unSawMessagesNum = 0
    }
    else {
        unSawMessagesNum = chatData.messages.filter(msg => {
            if (msg.from != userData.id)
                console.log(msg.arrivalStatus)
            return (msg.from != userData.id
                && msg.arrivalStatus != 'saw')
        }

        )
            .length
    }



    const renderedLastMessage = lastMessage ?
        (`  ${chatData.participantsMap[lastMessage.from].displayName} ` + ": " + lastMessage.message)
        :
        ('say hi')

    const senTime = lastMessage && new Date(lastMessage.sentTime.seconds * 1000)
    const time = senTime && `${senTime.getHours()}:${senTime.getMinutes()}`

    const unSawRef = useRef();

    useEffect(() => {
        if (unSawMessagesNum <= 0) return;
        setUnSawAnim(unSawRef.current);
    }, [unSawMessagesNum]);
    return (
        <div onClick={handleClickMenu} className={`ChatMenu component ${iseSelected ? 'active' : ''}`}> <span>ChatMenu</span>
            <UserProfile user={chatData.user2}>
                <div className="last-message">
                    <div className="msg">
                        {renderedLastMessage}
                    </div>
                    <div className="time">
                        {time}
                        {/* {lastMessage?.sentTime} */}
                    </div>
                </div>
            </UserProfile>

            {
                unSawMessagesNum > 0 &&
                <div className="unsaw-num" ref={unSawRef}>
                    {unSawMessagesNum}
                </div>
            }

        </div>
    )
}
