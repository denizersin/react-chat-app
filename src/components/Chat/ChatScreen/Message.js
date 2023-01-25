import React from 'react'
import { useSelector } from 'react-redux'
import { store } from '../../../features/store';
import { setMessagesSaw } from '../../../services/fb';

export default function Message({ msg, chatData }) {
    let userData;
    useSelector(state => {
        userData = state.userData.value
    })
    let msgOwner = chatData.participantsMap[msg.from];

    if (msgOwner != userData && msg.arrivalStatus != 'saw' && chatData.type !== 'group') {
        setMessagesSaw(chatData.id, [msg]);
    }


    return (
        <div className={`Message component ${msg.from == userData.id ? "user1" : "user2"}`}>
            <div className={`msg ${msg.from == userData.id ? "user1" : "user2"}`}>
                {msgOwner.displayName + " " + msg.message}
                {'   status:'}
                {
                    msg.arrivalStatus == 'sending' && 'sending'
                }
                {
                    msg.arrivalStatus == 'sent' && 'sent'
                }
                {
                    msg.arrivalStatus == 'recieved' && 'recieved'
                }
                {
                    msg.arrivalStatus == 'saw' && 'saw'
                }
            </div>

        </div>

    )
}
