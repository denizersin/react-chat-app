import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { setOpenAnim1 } from '../../../..';
import { createParticipantIdsMap } from '../../../../constants';
import { getUserDataVal } from '../../../../features/userDataSlice';
import { createGroupChat, searchUsersByName } from '../../../../services/fb';
import UserProfile from '../../../UserProfile';
import SelectProvider from './SelectProvider';


import "../../../../styles/CreateGroupForm.css"
export default function CreateGroupForm({ isActive, toggleCreateGroup }) {
    const userData = getUserDataVal();

    const [searchedVal, setSearchedVal] = useState('');
    const [groupForm, setGroupForm] = useState({ groupName: '' });
    const [selectedUsers, setSelectedUsers] = useState([]);
    const selectedUserState = {
        selectedUsers, setSelectedUsers
    }

    const [searchUserResult, setSearchUserResult] = useState([]);


    const resetStates = () => {
        setSearchedVal('');
        setSelectedUsers([])
        setSearchUserResult([])
        setGroupForm({ groupName: "" })
    }

    const handleSearchUser = async (e) => {
        const result = await searchUsersByName({}, searchedVal)
        setSearchUserResult(result);
    }
    if (searchUserResult.length != 0 && searchedVal == "") {
        setSearchUserResult([]);
    }

    const handleCreateNewGroup = async (e) => {
        const participantIds = [userData.id, ...selectedUsers.map(u => u.id)]
        const groupData = {
            type: 'group',
            participantIds: participantIds,
            admins: [userData.id],
            groupName: groupForm.groupName,
            lastSawMessagesMap: createParticipantIdsMap(participantIds, null),
            rolesMap: {
                ...createParticipantIdsMap(participantIds, 'normal'),
                [userData.id]: 'admin'
            },
        }
        await createGroupChat(groupData, userData);
        resetStates();
        toggleCreateGroup();
    }
    const containerRef = useRef();
    useEffect(() => {
        if (isActive == true) {
            setOpenAnim1(containerRef.current);
        }
    }, [isActive]);
    const validataGroupForm = selectedUsers.length != 0 && groupForm.groupName
    return (
        <div className={'CreateGroupForm component'}
            ref={containerRef}
        > <span>CreateGroupForm</span>
            <div className="create">
                {(<button disabled={!validataGroupForm} onClick={handleCreateNewGroup}>create new group</button>)}
            </div>
            <div className='form'>
                <label htmlFor="">group name:</label>
                <input type="text"
                    value={groupForm.groupName}
                    onChange={(e) => setGroupForm({ ...groupForm, groupName: e.target.value })} />
            </div>
            <div className='selected-users'>
                {selectedUsers.map(user => (
                    <UserProfile key={user.id} user={user}>
                        <SelectProvider user={user} selectedUserState={selectedUserState} />
                    </UserProfile>
                ))}
            </div>
            <div>
                <input type="text" value={searchedVal} onChange={(e) => setSearchedVal(e.target.value)} />
                <button onClick={handleSearchUser}>search users</button>
            </div>

            <div>
                {searchUserResult.map(user => (
                    <UserProfile key={user.id} user={user}>
                        <SelectProvider user={user} selectedUserState={selectedUserState} />
                    </UserProfile>
                ))}
            </div>



            <div onClick={toggleCreateGroup} className="close">
                <AiOutlineArrowLeft />
            </div>
        </div>
    )
}
