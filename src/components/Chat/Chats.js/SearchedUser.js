import React from 'react'
import { useSelector } from 'react-redux';
import { sendChatRequest } from '../../../services/fb';

export default function SearchedUser({ user2Data }) {


    let userData;
    useSelector(state => {
        userData = state.userData.value
    })
    let hasRequest = userData.sentRequestIds.some(id => id == user2Data.id);
    const handleSendReq = async () => {
        await sendChatRequest(userData, user2Data.id);
    }
    return (
        <div className={'SearchedUser component'}> <span>SearchedUser</span>
            {user2Data.displayName}
            {hasRequest ? 'request sent' :
                <button onClick={handleSendReq}>sent</button>}
        </div>
    )
}
