import React, { useState } from 'react'
import UserProfile from '../../../../UserProfile';
import ParticipantOptions from './ParticipantOptions';

export default function Participants({ chatData }) {
    const participantsMap = Object.values(chatData.participantsMap);
    
    return (
        <div className={'Participants component'}> <span>Participants</span>
            {participantsMap.map(user => (
                <div className='user' key={user.id}>
                    <UserProfile user={user} >
                        <div>{chatData.rolesMap[user.id]}</div>
                    </UserProfile>
                    {/* {isActive && user.id != userData.id && < ParticipantOptions user2={user} chatData={chatData} />} */}
                    < ParticipantOptions user2={user} chatData={chatData} />
                </div>
            ))}
        </div>
    )
}
