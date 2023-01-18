import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { getMergedId } from '../constants';
import { searchUsersByName, sendChatRequest } from '../services/fb';

export default function SearchUser() {
    const user = useSelector(state => state.user.user)
    const [finded, setFinded] = useState([]);
    const [inputVal, setInputVal] = useState('');
    const handleSearch = async (e) => {
        setFinded(await searchUsersByName(user, inputVal))
    }

    const handleSendReq = async (e, user2) => {
        console.log(user,user2)
        await sendChatRequest(user, user2.id);
        setFinded(await searchUsersByName(user, inputVal))
        //set user data!!
    }

    return (
        <div className={'SearchUser component'}> <span>SearchUser</span>
            <input type="text" value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
            <button onClick={handleSearch}>search</button>
            {finded.map(findedUser => {
                const mergedId = getMergedId(user.id, findedUser.id);
                const hasChat = user.chatIds.includes(mergedId);
                const hasRequest = user.sentRequestIds.includes(findedUser.id);
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
