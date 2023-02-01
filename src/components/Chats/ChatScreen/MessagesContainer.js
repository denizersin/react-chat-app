import React, { memo } from 'react'
import Message from './Message';
import { getUserDataVal } from '../../../features/userDataSlice';
import { updateLastISawMsg } from '../../../services/fb';
import { lastIndexOf } from '../../../constants';
import Text from '../../Message/Text';
import Images from '../../Message/Images';
import '../../../styles/MessagesContainer.css'




function MessagesContainer({ chatData, activeEmoji }) {
    const userData = getUserDataVal();
    console.log(chatData);
    if (chatData.type == 'group') {
        let lastISawId = chatData.lastSawMessagesMap[userData.id]
        const lastOtherMsgIndex = lastIndexOf(
            chatData.messages,
            (msg) => msg.from != userData.id
        )
        const lastOtherMsg = chatData.messages[lastOtherMsgIndex]
        if (lastOtherMsgIndex != -1 && lastOtherMsg.id != lastISawId) {
            updateLastISawMsg(userData, chatData.id, lastOtherMsg.id);
        }
    }

    let messages = chatData.allMessages || chatData.messages;
    messages = [...messages].reverse();
    console.log(messages)
    //!group=>allMessages(+activite)

    const renderedMessages = messages.map((msg, i) => {
        //!work on this
        let isNewUser2Msg =
            (messages[i].type != 'activite' &&
                (messages[i].from !== userData.id) &&
                (messages[i + 1]?.from === undefined || (messages[i + 1].from === userData.id)))
        return (
            <>
                {msg.type == 'text' &&
                    <Message key={msg.id} msg={msg} chatData={chatData} isNewUser2Msg={isNewUser2Msg} >
                        <Text msg={msg} chatData={chatData} />
                    </Message>}
                {msg.type == 'image' &&
                    <Message key={msg.id} msg={msg} chatData={chatData} isNewUser2Msg={isNewUser2Msg}>
                        <Images key={msg.id} imagesUrl={msg.imagesUrl} chatData={chatData} />
                    </Message>}
                {msg.type == 'activite' && <div className='activite'><span>{msg.text}</span></div>}

            </>
        )

    })

    return (
        <div className={`MessagesContainer component ${activeEmoji ? 'active' : ''}`}> <span>MessagesContainer</span>
            {renderedMessages}
        </div>
    )
}

export default (MessagesContainer);