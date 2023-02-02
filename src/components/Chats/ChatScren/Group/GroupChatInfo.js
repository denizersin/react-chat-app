import React, { useEffect, useState } from 'react'
import GroupInfoScreen from '../../Group/GroupInfoScreen/GroupInfoScreen';
import '../../../../styles/GroupChatInfo.css'
import { getSelectedChatIdVal } from '../../../../features/selectedChatIdSLice';

export default function GroupChatInfo({ chatData }) {
    const selectedId = getSelectedChatIdVal();
    const [activeGroupIfo, setActiveGroupIfo] = useState(false);
    const toggleActiveGroupInfo = (e) => {
        setActiveGroupIfo(prev => !prev);
    }
    useEffect(() => {
        setActiveGroupIfo(false);
    }, [selectedId]);
    const participants = Object.values(chatData.participantsMap);
    const max = 6; //index so 7
    return (

        <div onClick={toggleActiveGroupInfo} className={'GroupChatInfo component'}> <span>GroupChatInfo</span>
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
            {activeGroupIfo && <GroupInfoScreen activeGroupIfo={activeGroupIfo} chatData={chatData} />}
        </div>
    )
}
