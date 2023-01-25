import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { searchUsersByName } from '../../../services/fb';
import RequestProvider from '../../RequestProvider';
import UserProfile from '../../UserProfile';
import ChatMenu from './ChatMenu';

export default function ChatsMenu() {
    console.log('chatsMenu')
    let userChatsData;
    useSelector(state => { userChatsData = state.userChats.value })
    userChatsData = Object.values(userChatsData);
    let userData;
    useSelector(state => {
        userData = state.userData.value
    });
    const [searchedUserVal, setSearchedUserVal] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    let menuResult = [];
    const fetchUser = async () => {
        const searchResultUser = await searchUsersByName(userData, searchedUserVal);
        menuResult = searchResultUser.map(user => {
            const finded = userChatsData.find(chatData => chatData.user2.id == user.id)
            if (finded) return finded;
            return user
        })
        setSearchResult(menuResult);
    }
    if (!searchedUserVal && searchResult) {
        setSearchResult(null);
    }
    if (searchResult) {
        menuResult = searchResult;
    }
    if (searchResult == null) {
        menuResult = userChatsData
    }

    const renderedChatMenus = menuResult.map(resultData => {
        const isAChat = resultData.hasOwnProperty("type")
        console.log(resultData,'()*(*')
        return (
            <React.Fragment key={resultData.id}>
                {isAChat ?
                    (<ChatMenu key={resultData.id} chatData={resultData} />)
                    :
                    (<UserProfile user={resultData}>
                        <RequestProvider user={resultData} />
                    </UserProfile>
                    )
                }
            </React.Fragment>
        )
    }
    )
    const handleSearch = (e) => {
        fetchUser();
    }


    return (
        <div className={'ChatsMenu component'}> <span>ChatsMenu</span>
            <div>
                <input type="text" onChange={(e) => setSearchedUserVal(e.target.value)} value={searchedUserVal} />
                <button onClick={handleSearch}>search</button>
            </div>
            <div className="chat-menus">
                {renderedChatMenus}
            </div>
        </div>
    )
}
