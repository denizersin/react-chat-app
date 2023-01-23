import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { dataModel } from '../../../constants';
import { store } from '../../../features/store';
import { sendAMessage } from '../../../services/fb';

export default function MessageForm() {
    const STATES = store.getState();
    let userData = STATES.userData.value;
    let selectedChatId = STATES.selectedChatId.value;
    let chatData = STATES.userChats.value[selectedChatId];

    const [msgInput, setMsgInput] = useState('');

    const handleSendMessage = (e) => {
        sendAMessage(userData, chatData.id, {
            ...dataModel.privMessageData,
            message: msgInput,
            from: userData.id
        })
    }
    return (
        <div className={'MessageForm component'}> <span>MessageForm</span>
            <input type="text" onChange={(e) => setMsgInput(e.target.value)} value={msgInput} />
            <button onClick={handleSendMessage}>send</button>
        </div>
    )
}
