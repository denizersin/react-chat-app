import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { dataModel } from '../../../constants';
import { store } from '../../../features/store';
import { getUserDataVal } from '../../../features/userDataSlice';
import { sendAMessage } from '../../../services/fb';
import '../../../styles/MessageForm.css'
import { CiFaceSmile } from 'react-icons/ci'
import { ImAttachment } from 'react-icons/im'
import { BiSticker } from 'react-icons/bi'
import { AiOutlineClose, AiOutlineFileGif, AiOutlineSend } from "react-icons/ai"
import Emojies from '../../Assets/Emojies';
export default function MessageForm({ handleSendMessage, chatData, isSendMsgDisabled, activeEmoji, toggleActiveEmoji }) {

    console.log(activeEmoji, toggleActiveEmoji)
    console.log('s')
    const [msgFormData, setMsgFormData] = useState({
        type: '',
        content: ''
    });

    const handleClick = (e) => {
        handleSendMessage(e, {
            type: 'text',
            message: msgFormData.content
        })
        setMsgFormData({
            type: '',
            content: ''
        })
    }
    const userData = getUserDataVal();

    const onKeyDownInput = (e) => {
        if (e.code == 'Enter') handleClick();
    }
    return (
        <div className={`MessageForm component ${activeEmoji ? 'active' : ''}`}> <span>MessageForm</span>
            <div className={`r r1 assets `}>
                <Emojies setMsgFormData={setMsgFormData} />
            </div>
            
            <div className={`r r2 `}>
                <div onClick={toggleActiveEmoji} className="c c1 close">
                    <AiOutlineClose />
                </div>
                <div onClick={() => { toggleActiveEmoji() }} className="c c2 emoji">
                    <CiFaceSmile />
                </div>
                <div className="c c3 gif">
                    <AiOutlineFileGif />
                </div>
                <div className="c c4 sticker">
                    <BiSticker />
                </div>
                <div className="c c5 attach">
                    <ImAttachment />
                </div>
                <div className="c c6 input">
                    <input onKeyDown={onKeyDownInput}
                        type="text" onChange={(e) => setMsgFormData({ content: e.target.value })} value={msgFormData.content} />

                </div>
                <div className="c c7 send-message">
                    <button disabled={isSendMsgDisabled} onClick={handleClick}>
                        <AiOutlineSend />
                    </button>
                </div>
            </div>
        </div>
    )
}
