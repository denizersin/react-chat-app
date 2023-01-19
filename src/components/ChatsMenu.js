import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { store } from '../features/store';
import { updateChatsDataValue } from '../features/userChatsSlice';
import { getUserChats, lisetnUserChats } from '../services/fb';
import ChatLink from './ChatLink';





export default function ChatsMenu({ setCurrChat }) {
    console.log('chats menu rendered')

    const user = useSelector(state => state.user.user);
    const userData = useSelector(state => state.user.user.userData);
    const chatsData = useSelector(state => state.userChats.value);
    async function setInitialChatsData() {
        const newData = await getUserChats(user.userData)
        store.dispatch(updateChatsDataValue(newData))
        lisetnUserChats(user.userData)
    }
    useEffect(() => {
        setInitialChatsData();
    }, []);

    if (chatsData == null) return;
    //!!!

    const chats = Object.values(chatsData);
    const groupChats = chats.filter(chatData => chatData.type == "group")
    const privateChats = chats.filter(chatData => chatData.type == "private")

    const onClickMenu = (e, chatData) => {
        setCurrChat(chatData);
        //! list chat
    }
    return (
        <div className={'ChatsMenu component'}> <span>ChatsMenu</span>
            {privateChats.map(chatData => {
                return (<ChatLink key={chatData.id} chatData={chatData} onClickMenu={onClickMenu} />)
            })}
        </div>
    )
}
