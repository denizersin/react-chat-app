import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { dataModel } from '../constants';
import { sendAMessage } from '../services/fb';

export default function ChatForm({ currChat }) {
    const [input, setInput] = useState('');
    const userData = useSelector(state => state.user.user.userData)
    const handleSendMessage = (e) => {
        //send message
        sendAMessage(userData, currChat.id, {
            ...dataModel.privMessageData,
            message: input,
            from: userData.id
        })
    }
    return (
        <div className={'ChatForm component'}> <span>ChatForm</span>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={handleSendMessage}>send</button>
        </div>
    )
}
