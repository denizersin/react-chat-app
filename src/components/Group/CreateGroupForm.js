import { async } from '@firebase/util';
import React, { useState } from 'react'
import { store } from '../../features/store';
import { createGroupChat, searchUsersByName } from '../../services/fb';
import UserProfile from '../UserProfile';
import SelectProvider from './SelectProvider';

export default function CreateGroupForm() {
    const user = store.getState().userData.value;
    
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

        const groupData = {
            type: 'group',
            participantIds: [user.id, ...selectedUsers.map(u => u.id)],
            admins: [user.id],
            groupName: 'groupName'
        }
        await createGroupChat(groupData);
        resetStates();
    }

    const validataGroupForm = selectedUsers.length != 0 && groupForm.groupName
    return (
        <div className={'CreateGroupForm component'}> <span>CreateGroupForm</span>
            {(<button disabled={!validataGroupForm} onClick={handleCreateNewGroup}>create new group</button>)}
            <div>group definitions(form)
                <label htmlFor="">group name:</label>
                <input type="text"
                    value={groupForm.groupName}
                    onChange={(e) => setGroupForm({ ...groupForm, groupName: e.target.value })} />
            </div>
            <div>
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

        </div>
    )
}
