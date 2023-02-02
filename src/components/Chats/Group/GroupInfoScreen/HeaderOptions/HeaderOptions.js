import React from 'react'
import { getUserDataVal } from '../../../../../features/userDataSlice';
import Option from '../Participants/Option';



export default function HeaderOptions({ chatData }) {
    const userData = getUserDataVal();
    const userPermissionsMap = chatData.userPermissionsMap;
    console.log(userPermissionsMap, chatData);
    const handleAddUser = (e) => { }
    const handleRemoveUser = (e) => { }
    return (
        <div className={'HeaderOptions component'}> <span>HeaderOptions</span>
            {userPermissionsMap['add-user'] &&
                <Option handleOptionClick={handleAddUser}>
                    <div className='add-user button-34'>
                        {'add user'}
                    </div>
                </Option>
            }
            {userPermissionsMap['delete-group'] &&
                <Option handleOptionClick={handleRemoveUser}>
                    <div className='delete-group button-34 '>
                        {'delete group'}
                    </div>
                </Option>
            }
        </div>
    )
}
