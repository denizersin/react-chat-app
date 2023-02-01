import React, { useEffect } from 'react'
import { getUserChatsVal, updateChatsDataValue } from '../../features/userChatsSlice';
import { getUserDataVal } from '../../features/userDataSlice';
import { getUserChats, lisetnUserChats, listenerUnsbs, listenUserData } from '../../services/fb';
import ChatsMenu from './Chats/ChatsMenu';

export default function Chats() {

    console.log('chat rendered')
    const userData = getUserDataVal();
    let userChats = getUserChatsVal();
    console.log('userChats', userChats);

    let len = userChats === null ? 0 : Object.keys(userChats).length;

    useEffect(() => {
        if (userChats == null) return;
        lisetnUserChats(userData)
    }, [len]);


    console.log('chat last')
    return (
        <div className={'Chats component'}> <span>Chats</span>
            <ChatsMenu />
        </div>
    )
}


