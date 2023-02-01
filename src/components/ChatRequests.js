import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUsers, respondChatRequest } from '../services/fb';
import UserProfile from './UserProfile';
import "../styles/ChatRequests.css"
import { setOpenAnim1 } from '..';
import { AiOutlineArrowLeft } from 'react-icons/ai';




export default function ChatRequests({ isActive, setIsActive }) {
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
    console.log('chat requests RENDERED')

    const handleApproveReq = async (e, user2, isApprove) => {
        await respondChatRequest(userData, user2.id, isApprove)

    }

    const containerRef = useRef();
    useEffect(() => {
        if (isActive == true) {
            setOpenAnim1(containerRef.current)
        }

    }, [isActive]);

    return (
        <div ref={containerRef} className={'ChatRequests component ' + `${isActive ? 'active' : ''}`}> <span>ChatRequests</span>
            {requests.map(rUser => {
                return (
                    <UserProfile user={rUser}>
                        <div className='user-request' key={rUser.id}>
                            <button onClick={(e) => handleApproveReq(e, rUser, true)}>approve</button>
                            <button onClick={(e) => handleApproveReq(e, rUser, false)}>reject</button>
                        </div>
                    </UserProfile>

                )
            })}
            <div onClick={() => setIsActive(prev => !prev)} className="close">
                <AiOutlineArrowLeft />
            </div>
        </div>
    )
}
