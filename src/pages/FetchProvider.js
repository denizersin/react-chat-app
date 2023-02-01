import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { getGroupChatsVal, updateGroupChatsData } from '../features/groupChatsSlice';
import { store } from '../features/store';
import { getUserChatsVal, updateChatsDataValue } from '../features/userChatsSlice';
import { getUserDataVal } from '../features/userDataSlice'
import { getGroupChats, getUserChats } from '../services/fb';
import Home from './Home';

export default function FetchProvider() {

    const userData = getUserDataVal();
    const userCHats = getUserChatsVal();
    const groupChats = getGroupChatsVal();
    console.log(userData,'qwe')
    const [dummy, setDummy] = useState(false);
    const fetchData = async () => {
        const fetchedUserChats = await getUserChats(userData);
        const fetchedGroupChats = await getGroupChats(userData);
        store.dispatch(updateChatsDataValue(fetchedUserChats));
        store.dispatch(updateGroupChatsData(fetchedGroupChats));
        setDummy(!dummy);
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className={'FetchProvider component'}> <span>FetchProvider</span>
            {userData && userCHats && groupChats && <Home />}
        </div>
    )
}
