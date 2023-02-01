import React from 'react'
import '../../styles/GroupChatInfo.css'
export default function GroupChatInfo({ chatData }) {

    const handleOpenGroupInfo = (e) => {

    }
    const participants = Object.values(chatData.participantsMap);
    const max = 6; //index so 7
    return (

        <div onClick={handleOpenGroupInfo} className={'GroupChatInfo component'}> <span>GroupChatInfo</span>
            <div className="group-name">{chatData.groupName}</div>
            <div className="avatars">
                {participants.map((user, i) => {
                    if (i > max) return null;
                    const isLast = max == i && participants.length - 1 > max
                    return (
                        <div className={`avatar avatar${i} ${i == max ? 'last' : ''}`}>
                            <img src={user.avatarUrl} alt="" />
                            {isLast && <div className='more'>
                                {`+${(participants.length - i - 1)}`}
                            </div>}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
