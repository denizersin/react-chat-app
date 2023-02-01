import { Timestamp } from "firebase/firestore"


export const privMessageData = {
    from: null,//*
    type: null,//* message , reply, image , sticker..
    message: null,
    sentTime: Timestamp.now(),//*
    recievedTime: null,//* //time
    sawTime: null,//*      //time
    replyId: null,
    arrivalStatus: 'sending',
    type: 'message'
}
export const privImageMsgData = {
    ...privMessageData,
    type: 'image',
    imagesUrl: []
}

export const getGroupArrivalMaps = (participantIds = []) => {
    const map = {}
    participantIds.forEach(uid => map[uid] = null)
    return {
        recievedTimesMap: {
            ...map
        },
        sawTimesMap: {
            ...map

        },
    }
}

export const createParticipantIdsMap = (participantIds, value) => {
    const map = {}
    participantIds.forEach(uid => map[uid] = value)
    return map;
}

const permissionsMap = {
    admin: {
        ['add-user']: true,
        ['delete-group']: true,
        ['remove-user']: true,
        ['assign-role']: true,
        ['mute-user']: true,
        ['change-group-profile']: true,
        [`change-group-description`]: true,
        ['send-message']: true
    },
    moderator: {
        ['add-user']: true,
        ['remove-user']: true,
        ['mute-user']: true,
        ['change-group-profile']: true,
        [`change-group-description`]: true,
        ['send-message']: true
    },
    normal: {
        ['change-group-profile']: true,
        [`change-group-description`]: true,
        ['send-message']: true
    }
}
export const getUserPermissionsMap = (role) => {
    return { ...permissionsMap[role] };
}
export const groupMessageData = {
    from: null,//*
    type: null,//* message , reply, image , sticker..
    message: null,
    sentTime: Timestamp.now(),//*
    images: [],
    sticker: null,
    replyId: null,
    arrivalStatus: 'sent',
}
const userData = {
    email: null,
    id: null,
    avatarUrl: "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png",
    displayName: null,
    chatIds: [],
    groupChatIds: [],
    friendIds: [],
    blockedUserIds: [],
    sentRequestIds: [],
    recievedRequestIds: []
}
export const dataModel = {
    privMessageData, userData, groupMessageData
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



export function lastIndexOf(arr, callback) {
    for (let i = arr.length - 1; i >= 0; i--) {
        console.log('qweqwe')
        if (callback(arr[i], i)) {
            return i
        }
    }
    return -1;
}
