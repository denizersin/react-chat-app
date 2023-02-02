import React, { useDebugValue, useState } from 'react'

export default function SelectProvider({ user, selectedUserState }) {
    const { selectedUsers, setSelectedUsers } = selectedUserState
    const isUserSelected = selectedUsers.some(u => u.id === user.id);
    const [selected, setSelected] = useState(isUserSelected);

    const handleToggleSelect = (e) => {
        const isSelect = !isUserSelected
        if (isSelect) {
            setSelectedUsers([...selectedUsers, user])
            setSelected(true);
        }
        else {
            setSelectedUsers(selectedUsers.filter(u => u.id !== user.id))
            setSelected(false);
        }
    }

    return (
        <div className={'SelectProvider component'}> <span>SelectProvider</span>
            {isUserSelected ?
                (
                    <div onClick={handleToggleSelect}>Selected X?</div>
                )
                :
                (
                    <div onClick={handleToggleSelect}>SELECT</div>
                )}
        </div>
    )
}
