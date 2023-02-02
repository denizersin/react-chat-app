import React, { useEffect, useRef } from 'react'
import { setOpenAnim1 } from '../../../..';
import { getUserDataVal } from '../../../../features/userDataSlice';
import HeaderOptions from './HeaderOptions/HeaderOptions';
import Participants from './Participants/Participants';

import "../../../../styles/GroupInfoScreen.css"

export default function GroupInfoScreen({ chatData, activeGroupIfo }) {

    const userData = getUserDataVal();
    const userRole = chatData.rolesMap[userData.id];
    const containerRef = useRef();
    useEffect(() => {

        if (activeGroupIfo) setOpenAnim1(containerRef.current);
    }, [activeGroupIfo]);
    return (
        <div className={'GroupInfoScreen component'}
            ref={containerRef}> <span>GroupInfoScreen</span>
            <div className="name">
                {chatData.groupName}
            </div>
            {(userRole == 'admin' || userRole == 'moderator') && <HeaderOptions chatData={chatData} />}
            <Participants chatData={chatData} />
        </div>
    )
}
