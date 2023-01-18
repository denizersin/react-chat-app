import { Timestamp } from "firebase/firestore"

export const privMessageData = {
    from: null,//*
    type: null,//* message , reply, image , sticker..
    message: null,
    sentTime: new Date(),//*
    recievedTime: null,//* //time
    sawTime: null,//*      //time
    images: [],
    sticker: null,
    replyId: null
}

const userData = {
    email: null,
    id: null,
    avatarUrl: "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png",
    displayName: null,
    chatIds: [],
    friendIds: [],
    blockedUserIds: [],
    sentRequestIds: [],
    recievedRequestIds: []
}
export const dataModel = {
    privMessageData, userData
}



export function getMergedId(id1, id2) {
    return id1 > id2 ? id1 + id2 : id2 + id1
}

export function objToMap(obj) {
    const map = new Map();
    Object.entries(obj).forEach(([key, value], i) => {
        map.set(key, value);
    })
    console.log(map)
}


console.log(objToMap({ 1: {}, 2: 3 }))