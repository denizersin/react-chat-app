import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUsers, respondChatRequest } from '../services/fb';

export default function ChatRequests() {
    const userData = useSelector(state => state.userData.value);
    
    const [requests, setRequests] = useState([]);
    const getUser = async () => {
        if (userData.recievedRequestIds.length == 0) {
            setRequests([]);
            return
        }
        const data = await getUsers(userData.recievedRequestIds);
        console.log(userData.recievedRequestIds)
        setRequests([...data]);
    }
    useEffect(() => {
        console.log('============')
        getUser();
    }, [userData]);
    console.log(userData)
    console.log('chat requests RENDERED')

    const handleApproveReq = async (e, user2, isApprove) => {
        await respondChatRequest(userData, user2.id, isApprove)

    }
    return (
        <div className={'ChatRequests component'}> <span>ChatRequests</span>
            {requests.map(rUser => {
                return (
                    <div key={rUser.id}>
                        {rUser.displayName}
                        <button onClick={(e) => handleApproveReq(e, rUser, true)}>approve</button>
                        <button onClick={(e) => handleApproveReq(e, rUser, false)}>reject</button>
                    </div>)
            })}
        </div>
    )
}
