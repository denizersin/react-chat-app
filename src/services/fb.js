import { initializeApp } from "firebase/app";
import { arrayRemove, arrayUnion, deleteDoc, deleteField, documentId, FieldPath, FieldValue, Firestore, getDoc, getDocFromCache, getDocs, getFirestore, increment, limit, limitToLast, onSnapshot, orderBy, query, setDoc, startAt, Timestamp, where } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import toast from "react-hot-toast";
import { dataModel, getMergedId, privMessageData } from "../constants";
import { register, updateUserData } from "../features/userSlice";
import { store } from "../features/store";
import { updateChatDataById, updateMessagesById } from "../features/userChatsSlice";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export const firebase = { app, db, auth }



export const createPrivChat = async (user, user2Id) => {
    const chatId = getMergedId(user.id, user2Id);
    await setDoc(doc(db, "userChats", chatId), {
        id: chatId,
        type: "private",
        participants: [user.id, user2Id],
        [user.id]: 0,
        [user2Id]: 0,
    });

    await updateDoc(doc(db, "users", user.id), {
        chatIds: arrayUnion(chatId)
    })

    await updateDoc(doc(db, "users", user2Id), {
        chatIds: arrayUnion(chatId)
    })

}

export const sendAMessage = async (user, chatId, messageData) => {
    const newDocRef = doc(collection(db, "userChats", chatId, "messages"));
    await setDoc(
        newDocRef,
        {
            ...dataModel.privMessageData,
            ...messageData,
            id: newDocRef.id, //set its id initiallay
        }
    )
    const ref = doc(db, 'userChats', chatId);
    await setDoc(ref,
        {
            [user.id]: increment(1)
        },
        { merge: true }
    );
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
    const q = query(
        collection(db, "userChats"),
        where(documentId(), "in",
            chatIds
        ),
    );
    const chatsData = await getDocsWithQuery(q);
    //! generate userChatsData[chatId]=chatData;
    const userChatsdata = {};

    const promises3 = chatsData.map(data => {
        let user2Id = getUser2(user, data.participants)
        userChatsdata[data.id] = data
        return getDocData("users", user2Id).then(userData => {
            userChatsdata[data.id].user2 = userData;
        })
    })

    await Promise.all(promises3);


    //set nested collection (messages)
    const promises = chatsData.map((data) => {
        data.messages = [];
        let user2Id = getUser2(user, data.participants)
        let unSawMessagesNum = data[user2Id];
        unSawMessagesNum = unSawMessagesNum < 50 ? 50 : unSawMessagesNum
        return getNewMessage(data, unSawMessagesNum).then(dataArr => {
            data.messages = dataArr
            data.gotMsgNum = dataArr.length;
        })
    })

    await Promise.all(promises);


    //set recieved as loggin first time!
    const promises2 = chatsData.map(chatData => {
        return chatData.messages.filter(msg => msg.from !== user.id && msg.recievedTime === null)
            .map(msg => setMsgRecieved(chatData.id, msg.id))
    })
    return userChatsdata
}


export async function setMsgRecieved(chatId, msgId) {
    const msgref = doc(db, "userChats", chatId, "messages", msgId);
    await updateDoc(msgref, {
        recievedTime: Timestamp.now()
    });
}

export async function setMsgSaw(chatId, msgId) {
    const msgref = doc(db, "userChats", chatId, "messages", msgId);
    await updateDoc(msgref, {
        sawTime: Timestamp.now()
    });
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
    }
    catch (e) {
        console.error(e)
    }
}

export const respondChatRequest = async (user, user2Id, isApprove) => {
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
    return;
}







export const listeners = {
    userChatsUnsb: [],
    currChatUnsb: null,
    listenUserData: null,
}


export const listenUserData = (user) => {
    const unsub = onSnapshot(doc(db, "users", user.id), (doc) => {
        const currentData = doc.data();
        console.log(currentData, "-----")
        console.log(currentData.recievedRequestIds.length);
        store.dispatch(updateUserData(currentData))
    });
    listeners.listenUserData = unsub;
}

export const lisetnUserChats = (user, userChatsData) => {
    // listeners.userChatsUnsb.forEach(unsb => unsb())

    const { chatIds } = user;
    const now = new Date().getTime();
    chatIds.forEach(chatId => {
        const q = query(
            collection(db, "userChats", chatId, "messages"),
            orderBy("sentTime"), startAt(now), limit(1)
        );


        const q2 = query(
            collection(db, "userChats", chatId, "messages"),
        );
        const unsubscribe2 = onSnapshot(q2, async (querySnapshot) => {
            const newData = await getNewMessage(store.getState().userChats.value[chatId], 1)
            store.dispatch(updateMessagesById({
                id: chatId,
                data: newData
            }))
        });

        listeners.userChatsUnsb.push(unsubscribe2);
    })
}





const readMessages = async (user, chatData) => {
    const messagesWillSaw = chatData.messages.filter(msg => msg.from !== user.id && msg.sawTime == null)
    const promises = messagesWillSaw.map(msg => {
        return setMsgSaw(chatData.id, msg.id);
    })

    await Promise.all(promises);

    const chatDoc = doc(db, "userChats", chatData.id);
    const user2Id = getUser2(user, chatData.participants);
    await updateDoc(chatDoc, {
        [user2Id]: 0
    })
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

//as scroll sideEffect
async function getMoreMessages(chatData) {
    const nextLimit = chatData.length + 50;
    const q = query(
        collection(db, "userChats", chatData.id, "messages"),
        orderBy("sentTime", "asc"), limit(nextLimit)
    );
    const data = await getDocsWithQuery(q);

    return data;
}




async function test() {

    //orderBy kullanirken hata aldim. index olayi nedir?? google gecmise bak
    // const ref = collection(db, "userChats", "Sp1jmKweg1TzUcJ8IxQ9Ay1JPo72982CUWtIc1S10TVAmJDj2FCMDno1", "messages");

    // const q = query(
    //     collection(db, "userChats","Sp1jmKweg1TzUcJ8IxQ9Ay1JPo72982CUWtIc1S10TVAmJDj2FCMDno1","messages"),where("from","==","Sp1jmKweg1TzUcJ8IxQ9Ay1JPo72"),
    // )



}

test()

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

function getUser2(user, participants) {
    return participants.find(u => u != user.id);
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
