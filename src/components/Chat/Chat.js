import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { store } from '../../features/store';
import { updateChatsDataValue } from '../../features/userChatsSlice';
import { getUserChats, lisetnUserChats, listenerUnsbs, listenUserData } from '../../services/fb';
import ChatsMenu from './Chats.js/ChatsMenu';
import ChatScreen from './ChatScreen/ChatScreen';

export default function Chat() {

    console.log('chat rendered')
    let userChats = useSelector(state => state.userChats.value);
    console.log('userChats', userChats);
    const userData = useSelector(state => state.userData.value);
    const selectedChatId = useSelector(state => state.selectedChatId.value);
    const fetchUserChats = async () => {
        const data = await getUserChats(userData);
        store.dispatch(updateChatsDataValue(data))
    }
    let len = userChats === null ? 0 : Object.keys(userChats).length;
    useEffect(() => {
        if (userChats == null) {
            console.log('2')
            fetchUserChats()
        }

    }, [userChats]);

    useEffect(() => {
        lisetnUserChats(userData)
    }, [len]);

    useEffect(() => {
        if (userData !== null && listenerUnsbs.userData === null) {
            listenUserData(userData)
        }
    }, [userData]);

    if (userChats === null) {
        console.log('userCHats==null')
        return (<>
            {console.log('asd')}
        </>)
    }
    console.log('chat last')
    return (
        <div className={'Chat component'}> <span>Chat</span>
{   userChats!==null? (            <div>
                <ChatsMenu />
                {selectedChatId && <ChatScreen />}
                {console.log('chat vdom')}
            </div>):console.log('nulll')}

        </div>
    )
}


