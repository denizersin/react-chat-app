import React from 'react'
import { toast } from 'react-hot-toast';
import { getUserDataVal } from '../../../../features/userDataSlice';
import { removeUserFromGroup, updateRole } from '../../../../services/fb';
import Option from './Option';




export default function ParticipantOptions({ user2, chatData }) {
    
    const userPermissionsMap = chatData.userPermissionsMap
    const participantRole = chatData.rolesMap[user2.id];


    const handleAssignRole = async (e, newRole) => {
        await updateRole(chatData.id, user2, newRole)
        //when dissmiss an admin check wether it is last admin or not

    }
    const handleRemoveUser = async () => {
        await removeUserFromGroup(chatData.id, user2);
    }

    return (
        <div className={'ParticipantOptions component'}> <span>ParticipantOptions</span>
            {
                userPermissionsMap['assign-role'] &&
                (participantRole !== 'admin' ?
                    <Option handleOptionClick={(e) => handleAssignRole(e, 'admin')}>
                        {<div>make admin</div>}
                    </Option>
                    :
                    <Option handleOptionClick={(e) => handleAssignRole(e, 'normal')}>
                        {<div>dismiss as admin</div>}
                    </Option>)
            }
            {
                userPermissionsMap['remove-user'] &&
                <Option handleOptionClick={handleRemoveUser}>
                    {<div>remove user</div>}

                </Option>
            }
            {userPermissionsMap['mute-user'] &&
                <Option>
                    {<div>mute user</div>}

                </Option>
            }

        </div>
    )
}
