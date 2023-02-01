import React from 'react'
import { getUserDataVal } from '../../features/userDataSlice';
import { setMessagesSaw } from '../../services/fb';

export default function Text({ msg, chatData }) {
    return (
        <div className={'Text component'}> <span>Text</span>
            {msg.message}
        </div>
    )
}
