import React, { useState } from 'react'
import { RiUserAddLine } from 'react-icons/ri'
import { getUserDataVal } from '../../features/userDataSlice';
import ChatRequests from '../ChatRequests';
import '../../styles/Notifications.css'
export default function Notifications() {
    const [isActive, setIsActive] = useState(false);
    const userData = getUserDataVal();
    const handleToggleRequests = () => {
        setIsActive(!isActive);
    }
    const requestNum = userData.recievedRequestIds.length;
    return (
        <div className={'Notifications component '}> <span>Notifications</span>
            <div className="requests" onClick={handleToggleRequests}>
                <RiUserAddLine size={25} />
                {requestNum !== 0 &&
                    <div className="request-num">
                        {requestNum}
                    </div>}

                {<ChatRequests isActive={isActive} setIsActive={setIsActive} />}
            </div>
        </div>
    )
}
