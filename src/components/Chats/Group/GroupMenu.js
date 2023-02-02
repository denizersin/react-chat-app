import React, { useEffect, useRef } from 'react'
import { useDispatch, } from 'react-redux';
import { lastIndexOf } from '../../../constants';
import { getSelectedChatIdVal, setSelectedChatId } from '../../../features/selectedChatIdSLice';
import { getUserDataVal } from '../../../features/userDataSlice';


const setAnimToUnSawMessages = async (elem) => {
    elem.classList.remove('anim');
    setTimeout(() => {
        elem.classList.add('anim')
    }, 0);
}


export default function GroupMenu({ chatData }) {
    console.log(chatData)
    const userData = getUserDataVal();
    const dispatch = useDispatch();
    const handleSelectGroup = () => {
        dispatch(setSelectedChatId(chatData.id))
    }
    const lasSawMsgId = chatData.lastSawMessagesMap[userData.id]; //null?
    let unSawMessagsNum = 0;
    console.log(chatData)
    lastIndexOf(
        chatData.messages,
        (msg, i) => {
            if (msg.id == lasSawMsgId) return true;
            if (msg.from != userData.id) unSawMessagsNum++;
        }
    )
    const unSawMessagesRef = useRef();
    useEffect(() => {
        if (unSawMessagsNum <= 0) return
        setAnimToUnSawMessages(unSawMessagesRef.current)
    }, [unSawMessagsNum]);

    const isChatSelected = chatData.id === getSelectedChatIdVal()

    return (
        <div onClick={handleSelectGroup} className={`GroupMenu component ${isChatSelected?'active':''}`}> <span>GroupMenu</span>
            <div className="group-name">
                {chatData.groupName}
            </div>
            {/* <div className="last-message">
                {lastMessage?.message || 'say hi'}
            </div> */}

            {unSawMessagsNum > 0 && <div ref={unSawMessagesRef} className="unsawmessages">
                {unSawMessagsNum}
            </div>}
        </div>
    )
}
