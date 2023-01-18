import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { dataModel } from '../constants';
import { sendAMessage } from '../services/fb';

export default function ChatForm({ currChat }) {
    const [input, setInput] = useState('');
    const user = useSelector(state => state.user.user)
    const handleSendMessage = (e) => {
        //send message
        sendAMessage(user, currChat.id, {
            ...dataModel.privMessageData,
            message: input,
            from: user.id
        })
    }
    return (
        <div className={'ChatForm component'}> <span>ChatForm</span>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={handleSendMessage}>send</button>
        </div>
    )
}
