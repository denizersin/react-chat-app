import React from 'react'
import { dataModel } from '../../../constants';
import { getUserDataVal } from '../../../features/userDataSlice'
import { sendAMessage } from '../../../services/fb';
import MessageForm from './MessageForm'

export default function PrivMessageForm({ chatData }) {
    const userData = getUserDataVal();
    const handleSendPrivMessage = (e, msgData) => {
        //async
        sendAMessage(chatData.id, {
            ...dataModel.privMessageData,
            ...msgData,
            from: userData.id
        })
    }
    return (
        <div className={'PrivMessageForm MessageForm component'}> <span>PrivMessageForm</span>
            <MessageForm handleSendMessage={handleSendPrivMessage} />
        </div>
    )
}
