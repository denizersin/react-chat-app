import React from 'react'
import { dataModel, getGroupArrivalMaps } from '../../../../constants';
import { getUserDataVal } from '../../../../features/userDataSlice';
import { sendGroupMessage } from '../../../../services/fb';
import MessageForm from '../MessageForm';

export default function GroupMessageForm({ chatData, activeEmoji, toggleActiveEmoji }) {
    const userData = getUserDataVal();
    const handleSendGroupMessage = (e, msgData) => {
        //async
        sendGroupMessage(
            chatData.id,
            {
                ...dataModel.groupMessageData,
                ...msgData,
                from: userData.id,
                ...getGroupArrivalMaps(chatData.participantIds)
            })
    }
    const isSendMsgDisabled = false && !chatData.userPermissionsMap['send-Message']
    return (
        <div className={'GroupMessageForm MessageForm component'}> <span>GroupChatForm</span>
            <MessageForm handleSendMessage={handleSendGroupMessage} chatData={chatData} isSendMsgDisabled={isSendMsgDisabled}
                activeEmoji={activeEmoji} toggleActiveEmoji={toggleActiveEmoji} />
        </div>
    )
}
