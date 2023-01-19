import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { getMergedId } from '../constants';
import { searchUsersByName, sendChatRequest } from '../services/fb';

export default function SearchUser() {
    console.log('search user rendered')
    const user = useSelector(state => state.user.user)
    const [finded, setFinded] = useState([]);
    const [inputVal, setInputVal] = useState('');
    const handleSearch = async (e) => {
        setFinded(await searchUsersByName(user.userData, inputVal))
    }

    const handleSendReq = async (e, user2) => {
        await sendChatRequest(user.userData, user2.id);
        setFinded(await searchUsersByName(user.userData, inputVal))
        //set user data!!
    }

    return (
        <div className={'SearchUser component'}> <span>SearchUser</span>
            <input type="text" value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
            <button onClick={handleSearch}>search</button>
            {finded.map(findedUser => {
                const mergedId = getMergedId(user.uid, findedUser.id);
                const hasChat = user.userData.chatIds.includes(mergedId);
                const hasRequest = user.userData.sentRequestIds.includes(findedUser.id);
                return (
                    <div key={findedUser.id} >
                        {findedUser.displayName}
                        {hasChat && "you have a chat"}
                        {hasRequest && "request sent" || <button onClick={(e) => { handleSendReq(e, findedUser) }}>sent chat request</button>}
                    </div>
                )
            }
            )}
        </div>
    )
} 
