import React, { useState } from 'react'
import { getUserDataVal } from '../../../../features/userDataSlice';
import ParticipantOptions from './ParticipantOptions';

export default function Participants({ chatData }) {
    const participantsMap = Object.values(chatData.participantsMap);
    const userData = getUserDataVal();
    const [isActive, setIsActive] = useState(true);
    return (
        <div className={'Participants component'}> <span>Participants</span>
            {participantsMap.map(user => (
                <div key={user.id}>
                    {user.displayName}
                    <div>optionsIcon</div>
                    {isActive && user.id != userData.id && < ParticipantOptions user2={user} chatData={chatData} />}
                </div>
            ))}
        </div>
    )
}
