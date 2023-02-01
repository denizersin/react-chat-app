import { render } from '@testing-library/react';
import React from 'react'
import { useSelector } from 'react-redux'
import { store } from '../../../features/store';
import { getUserDataVal } from '../../../features/userDataSlice';
import { setMessagesSaw } from '../../../services/fb';
import ArrivalStatus from '../../ArrivalStatus';

export default function Message({ msg, chatData, children, isNewUser2Msg }) {
    children = children instanceof Array ? children : [children];
    let userData = getUserDataVal();

    let msgOwner = chatData.participantsMap[msg.from];
    if (msgOwner.id != userData.id && msg.arrivalStatus !== 'saw' && chatData.type !== 'group') {
        console.log('ee',msg)
        setMessagesSaw(chatData.id, [msg]);
    }
    const senTime = new Date(msg.sentTime.seconds * 1000)
    const time = `${senTime.getHours()}:${senTime.getMinutes()}`
    return (
        <div className={`Message component ${msg.from == userData.id ? "user1" : "user2"}`}> <span>Message</span>
            <div className={`msg ${msg.from == userData.id ? "user1" : "user2"}`}>
                <div className="c c1">
                    {isNewUser2Msg && <img src={msgOwner.avatarUrl} alt="" />}
                    {/* {chatData.participantsMap[msg.from]} */}
                </div>
                <div className={`c c2 ${isNewUser2Msg ? 'new-user2-msg' : ''}`}>
                    {isNewUser2Msg && <div className='name'>~{msgOwner.displayName}</div>}
                    {children.map(renderedChild =>
                        renderedChild
                    )}
                    <div className='time-arrival'>
                        {time}
                        {msgOwner.id == userData.id &&
                            <ArrivalStatus arrivalStatus={msg.arrivalStatus} />}
                    </div>

                </div>
            </div>
        </div>

    )

}
