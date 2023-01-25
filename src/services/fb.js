import { initializeApp } from "firebase/app";
import { arrayRemove, arrayUnion, deleteDoc, deleteField, documentId, FieldPath, FieldValue, Firestore, getDoc, getDocFromCache, getDocs, getFirestore, increment, limit, limitToLast, onSnapshot, orderBy, query, setDoc, startAt, Timestamp, where } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import toast from "react-hot-toast";
import { dataModel, getMergedId, privMessageData } from "../constants";
import { store } from "../features/store";
import { addNewChatToUserChats, updateAMessageById, updateChatDataById, updateChatsDataValue, updateMessagesById } from "../features/userChatsSlice";
import { updateUserData } from "../features/userDataSlice";

export let hello = "asd";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries   

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDSU-3hOnMBe3WT01B2tWTNcyaz6TyKCvw",
    authDomain: "cath-in.firebaseapp.com",
    projectId: "cath-in",
    storageBucket: "cath-in.appspot.com",
    messagingSenderId: "466220203723",
    appId: "1:466220203723:web:fdf61fa8b70a164f92e54e",
    measurementId: "G-DKD5MZ1J08",
    databaseURL: "https://cath-in-default-rtdb.firebaseio.com/",

};

const resetTime = (obj) => {
    if (obj.sentTime !== null) {
        obj.sentTime = 1;
    }
    if (obj.sawTime !== null) {
        obj.sentTime = 1;
    }
    if (obj.recievedTime !== null) {
        obj.sentTime = 1;
    }
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export const firebase = { app, db, auth }

const canCreateNewChat = () => {
    if (store.getState().userData.value.chatIds.length >= 4) {
        toast.error(`you have reached the maximum number you can have`)
        return false;
    }
    return true;
}

export const createPrivChat = async (user, user2Id) => {
    if (!canCreateNewChat()) return;
    const chatId = getMergedId(user.id, user2Id);
    await setDoc(doc(db, "userChats", chatId), {
        id: chatId,
        type: "private",
        participantIds: [user.id, user2Id],
    });

    await updateDoc(doc(db, "users", user.id), {
        chatIds: arrayUnion(chatId)
    })

    await updateDoc(doc(db, "users", user2Id), {
        chatIds: arrayUnion(chatId)
    })

}



export const createGroupChat = async (groupData) => {
    if (!canCreateNewChat()) return;
    const groupChatDocRef = doc(collection(db, "userChats"));
    const groupChatId = groupChatDocRef.id;
    await setDoc(groupChatDocRef, {
        id: groupChatId,
        ...groupData
    });
    const { participantIds } = groupData
    const promises = participantIds.map(userId => {
        return updateDoc(doc(db, "users", userId), {
            chatIds: arrayUnion(groupChatId)
        })
    })
    try {
        await Promise.all(promises)
        toast.success('grup basariyla olusturuldu')
    } catch (error) {
        toast.error(error)
    }
}

export const sendAMessage = async (user, chatId, messageData) => {
    const newDocRef = doc(collection(db, "userChats", chatId, "messages"));
    const newMessageId = newDocRef.id;
    try {
        await setDoc(
            newDocRef,
            {
                ...dataModel.privMessageData,
                ...messageData,
                id: newMessageId, //set its id initiallay
            }
        )
        updateArrivalStatus(chatId, newMessageId, 'sent');
        return true;
    }
    catch (e) {
        return false
    }
}

async function updateArrivalStatus(chatId, msgId, status) {
    const msgRef = doc(db, 'userChats', chatId, 'messages', msgId)
    updateDoc(msgRef, {
        arrivalStatus: status
    })

}

export async function getUsers(userIds) {
    const q = query(
        collection(db, "users"),
        where(documentId(), "in",
            userIds
        ),
    );
    const users = await getDocsWithQuery(q);
    return users;
}

export const getUserChats = async (user) => {
    const { chatIds } = user;
    if (chatIds.length == 0) return {}
    const q = query(
        collection(db, "userChats"),
        where(documentId(), "in",
            chatIds
        ),
    );
    const chatsData = await getDocsWithQuery(q);
    //! generate userChatsData[chatId]=chatData;
    const userChatsdata = {};

    const promises3 = chatsData.map(chatData => {
        userChatsdata[chatData.id] = chatData
        chatData.participantsMap = {}

        if (chatData.type == 'group') {
            return chatData.participantIds.map(uid =>
            (getDocData('users', uid)
                .then(userDoc => {
                    chatData.participantsMap[uid] = userDoc
                })))
        }
        if (chatData.type == 'private') {
            let user2Id = getUser2(user, chatData.participantIds)
            return getDocData("users", user2Id).then(userData => {
                userChatsdata[chatData.id].user2 = userData;
                userChatsdata[chatData.id].participantsMap[user2Id] = userData;
                userChatsdata[chatData.id].participantsMap[user.id] = user;
            })
        }

    })

    await Promise.all(promises3.flat());


    //set nested collection (messages)
    const promises = chatsData.map(async (data) => {
        const unSawMessages = await getUnSawMessages(data);
        data.messages = unSawMessages;
        data.gotMsgNum = unSawMessages.length;
        let unSawMessagesNum = unSawMessages.length
        // if (unSawMessagesNum > 5) {
        //     return;
        // }
        unSawMessagesNum = 50;
        return getNewMessage(data, unSawMessagesNum).then(dataArr => {
            data.messages = dataArr
            data.gotMsgNum = dataArr.length;
        })
    })
    try {
        await Promise.all(promises);
        chatsData.forEach(chatData => {
            const unRecievedMessages = chatData.messages.filter(msg => msg.from !== user.id && (msg.recievedTime === null));
            unRecievedMessages.forEach(msgData => updateArrivalStatus(chatData.id, msgData.id, 'recieved'))
        })
    }
    catch (e) {

        console.log(e)
    }
    return userChatsdata
}



export async function setMessagesRecieved(chatId, messages) {
    const userId = store.getState().userData.value.id;
    messages = messages.filter(msg => msg.from !== userId && (msg.recievedTime == null));
    const promises = messages.map(async (msg) => {
        const msgref = doc(db, "userChats", chatId, "messages", msg.id);
        await updateDoc(msgref, {
            recievedTime: Timestamp.now(),
        });
    })
    try {
        await Promise.all(promises);
        messages.forEach(msg => updateArrivalStatus(chatId, msg.id, 'recieved'));
        return true
    }
    catch (e) {
        console.log(e)
        return false;
    }
}
export async function setMessagesSaw(chatId, messages) {
    messages = messages.filter(msg => (msg.sawTime == null));
    const promises = messages.map(async (msg) => {
        const msgref = doc(db, "userChats", chatId, "messages", msg.id);
        await updateDoc(msgref, {
            sawTime: Timestamp.now(),
        });
    })

    try {
        await Promise.all(promises);
        messages.forEach(msg => updateArrivalStatus(chatId, msg.id, 'saw'));
        return true
    } catch (e) {
        console.log(e)
        return false;
    }
}




export const sendChatRequest = async (user, user2Id) => {
    try {

        const ref = doc(db, 'users', user.id);
        await setDoc(ref,
            {
                "sentRequestIds": arrayUnion(user2Id)
            },
            { merge: true }
        );
        const ref2 = doc(db, 'users', user2Id);
        await setDoc(ref2,
            {
                "recievedRequestIds": arrayUnion(user.id)
            },
            { merge: true }
        );
        toast.success("basariyla istek atildi")
        return true;
    }
    catch (e) {
        console.error(e)
        return false;
    }
}

export const respondChatRequest = async (user, user2Id, isApprove) => {
    try {
        const ref = doc(db, 'users', user.id);
        await updateDoc(ref,
            {
                "recievedRequestIds": arrayRemove(user2Id)
            },
        );
        const ref2 = doc(db, 'users', user2Id);
        await updateDoc(ref2,
            {
                "sentRequestIds": arrayRemove(user.id)
            },
        );
        if (!isApprove) return;
        await createPrivChat(user, user2Id);
        return true;
    }
    catch {
        return false;
    }

}
export const cancelChatRequest = async (user, user2Id) => {
    try {
        const ref = doc(db, 'users', user.id);
        await updateDoc(ref,
            {
                "sentRequestIds": arrayRemove(user2Id)
            },
        );
        const ref2 = doc(db, 'users', user2Id);
        await updateDoc(ref2,
            {
                "recievedRequestIds": arrayRemove(user.id)
            },
        );
        return true;
    }
    catch {
        return false;
    }
}







export const listenerUnsbs = {
    userChats: [],
    userData: null,
}


export const listenUserData = (user) => {
    console.log('listen userData')
    const unsub = onSnapshot(doc(db, "users", user.id), (doc) => {
        const currentUserData = doc.data();
        const currentChatIds = currentUserData.chatIds;
        const prevChatIds = store.getState().userData.value.chatIds;
        console.log('listener!!')

        const createdChatIds = currentChatIds.filter(cId => !prevChatIds.some(pId => pId === cId))
        console.log(createdChatIds, 'createdChatIds')
        if (createdChatIds.length != 0) {
            getNewUserChats(user, createdChatIds)
        }
        store.dispatch(updateUserData(currentUserData))
    });
    listenerUnsbs.userData = unsub;
}
let messagesListenerCounter = 0;
export const lisetnUserChats = (user, userChatsData) => {

    listenerUnsbs.userChats.forEach(unsb => unsb())
    listenerUnsbs.userChats = [];

    const { chatIds } = user;

    chatIds.forEach(chatId => {
        console.log('added listener to', chatId)
        const q3 = query(collection(db, "userChats", chatId, "messages"));
        const unsubscribe = onSnapshot(q3, (snapshot) => {
            snapshot.docChanges().forEach(async (change) => {
                if (change.type === "added") {
                    const debug = store.getState().userChats.value[chatId].messages
                        .some(msg => msg.id == change.doc.data().id);
                    let debug2 = Timestamp.now().seconds - change.doc.data().sentTime.seconds > 2000
                    if (debug || debug2) return;
                    const prevChatsData = store.getState().userChats.value
                    if (!prevChatsData) return
                    const prevChatData = prevChatsData[chatId];
                    const newData = await getNewMessage(prevChatData, 1)
                    setMessagesRecieved(chatId, newData);
                    store.dispatch(updateMessagesById({
                        id: chatId,
                        data: newData
                    }))
                    console.log('added')

                }
                if (change.type === "modified") {
                    console.log('modified')
                    const data = change.doc.data();
                    store.dispatch(updateAMessageById({ chatId, id: data.id, data }))
                }
            });
        });
        listenerUnsbs.userChats.push(unsubscribe);
    })
}


export const getNewUserChats = async (userData, createdChatIds) => {
    const promises = createdChatIds.map(async (chatId) => {
        const chatData = await getDocData('userChats', chatId);
        const user2Id = getUser2(userData, chatData.participantIds);
        const messages = await getAllDocsData('userChats', chatId, 'messages');
        const user2 = await getDocData('users', user2Id);
        messages.forEach(msgData => resetTime(msgData));
        chatData.messages = messages;
        chatData.user2 = user2;
        chatData.gotMsgNum = 0;
        store.dispatch(addNewChatToUserChats(chatData));
    })
    await Promise.all(promises)

}



export async function getUnSawMessages(chatData) {
    const user = store.getState().userData;

    const q = query(
        collection(db, "userChats", chatData.id, "messages"),
        where("arrivalStatus", "!=", "saw")
    );
    const data = await getDocsWithQuery(q);
    data.filter(msg => msg.from != user.id);
    data.sort((a, b) => a.sentTime - b.sentTime);
    return data;
}

async function getNewMessage(chatData, increment) {
    const nextLimit = chatData.messages.length + increment;
    const q = query(
        collection(db, "userChats", chatData.id, "messages"),
        orderBy("sentTime", "asc"), limit(nextLimit),
    );
    const data = await getDocsWithQuery(q);
    return data;
}






export const searchUsersByName = async (user, userName) => {
    const q = query(collection(db, "users"), where(`displayName`, ">=", userName), orderBy("displayName"), where(`displayName`, "<=", userName + 'z'));
    let findedUsers = await getDocsWithQuery(q);
    // findedUsers = findedUsers.filter(findedUser => findedUser.id != user.id);
    return findedUsers;
    // return resultArr;
}



async function getNestedData(...args) {  //! yapilabilir..


}

//!utils

function getUser2(user, participantIds) {
    return participantIds.find(u => u != user.id);
}
async function getAllDocsData(...args) {
    const querySnapshot = await getDocs(collection(db, ...args));
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push(doc.data());
        data.at(-1).id = doc.id;
    });
    return data;
}


//!get with query
async function getDocsWithQuery(q) {
    // const q = query(collection(db, "posts"), where(`tag.${category}`, "==", true));
    const querySnapshot = await getDocs(q);
    const postsData = [];
    querySnapshot.forEach((doc) => {
        postsData.push(doc.data());
        postsData.at(-1).id = doc.id;
    });
    return postsData;
}



//!get just one doc 

export async function getDocData(...args) {
    const docRef = doc(db, ...args);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {

        return docSnap.data();

    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}

async function getDocDataField(...args) {
    const sliceIndex = args.findIndex(arg => arg == "/");
    if (sliceIndex < 0) return;
    const refArgs = args.slice(0, sliceIndex);
    const keyArgs = args.slice(sliceIndex + 1, args.length)
    // return;
    let data = await getDocData(...refArgs);


    for (let i = 0; i < keyArgs.length; i++) {
        if (data[keyArgs[i]] === undefined) {
            console.log('there is no such a field')
            return null;
        }
        data = data[keyArgs[i]];
    }
    return data;
}
