import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUsers, respondChatRequest } from '../services/fb';

export default function ChatRequests() {
    const user = useSelector(state => state.user.user);
    const [requests, setRequests] = useState([]);
    const getUser = async () => {
        setRequests(await getUsers(user.recievedRequestIds));
    }

    useEffect(() => {
        getUser();
    }, [user]);


    const handleApproveReq = async (e, user2, isApprove) => {
        await respondChatRequest(user, user2.id, isApprove)
        //set User!
    }
    return (
        <div className={'ChatRequests component'}> <span>ChatRequests</span>
            {requests.map(rUser => {
                return (
                    <div>
                        {rUser.displayName}
                        <button onClick={(e) => handleApproveReq(e, rUser, true)}>approve</button>
                        <button onClick={(e) => handleApproveReq(e, rUser, false)}>reject</button>
                    </div>)
            })}
        </div>
    )
}
