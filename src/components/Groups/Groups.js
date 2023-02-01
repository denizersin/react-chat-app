import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getGroupChatsVal, groupChatsSelector, updateGroupChatsData } from '../../features/groupChatsSlice';
import { store } from '../../features/store';
import { getUserDataVal } from '../../features/userDataSlice';
import { getGroupChats, listenUserGroupChats, listenUserGroupChatsData } from '../../services/fb';
import GroupMenu from './GroupMenu';
import "../../styles/Groups.css"
import CreateGroupForm from './CreateGroupForm';
export const Groups = () => {
    const groupChatsData = Object.values(getGroupChatsVal());
    const userData = getUserDataVal();
    const [isActive, setIsActive] = useState(false);
    useEffect(() => {
        listenUserGroupChats(userData)
        listenUserGroupChatsData(userData);
    }, [groupChatsData.length]);

    console.log(getGroupChatsVal())
const toggleCreateGroup = () => {
        setIsActive(prev => !prev);
    }

    return (
        <div className={'Groups component'}> <span>Groups</span>
            <div className="header">
                Chatrooms
                <button onClick={toggleCreateGroup} className='create-group'>+</button>
                {isActive && <CreateGroupForm toggleCreateGroup={toggleCreateGroup}/>}
            </div>
            <div className='group-menu'>
                {groupChatsData.map(chatData => (
                    <GroupMenu key={chatData.id} chatData={chatData} />
                ))}
            </div>
        </div>
    )
}
