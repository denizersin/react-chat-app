import React from 'react'
import { getGroupChatsVal } from '../../../features/groupChatsSlice';
import { getSelectedChatIdVal } from '../../../features/selectedChatIdSLice';
import { getUserDataVal } from '../../../features/userDataSlice'
import HeaderOptions from './HeaderOptions/HeaderOptions';
import Participants from './Participants/Participants';

export default function GroupInfoScreen({ chatData }) {

    const userData = getUserDataVal();
    const userRole = chatData.rolesMap[userData.id];
    return (
        <div className={'GroupInfoScreen component'}> <span>GroupInfoScreen</span>
            {(userRole == 'admin' || userRole == 'moderator') && <HeaderOptions chatData={chatData} />}
            <Participants chatData={chatData} />

        </div>
    )
}
