import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { cancelChatRequest, sendChatRequest } from '../services/fb';

export default function RequestProvider({ user }) {
    let mainUser;
    useSelector(state => { mainUser = state.userData.value });

    const [hasRequest, setHasRequest] = useState(
        mainUser.sentRequestIds.includes(user.id)
    );

    const handleSentRequest = async (e) => {
        const result = await sendChatRequest(mainUser, user.id);
        if (result) setHasRequest(true);
    }
    const handleCancleRequest = async (e) => {
        const result = await cancelChatRequest(mainUser, user.id);
        if (result) setHasRequest(false);
    }
    return (
        <div className={'RequestProvider component'}> <span>RequestProvider</span>
            {hasRequest ?
                (<button onClick={handleCancleRequest}>request sent cancel?(unset)</button>)
                :
                (<button onClick={handleSentRequest}>sent request</button>)}
        </div>
    )
}
