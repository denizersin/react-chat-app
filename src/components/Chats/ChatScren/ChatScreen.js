import React from 'react'
import '../../../styles/ChatScreen.css'
export default function ChatScreen({children}) {
    return (
        <div className={'ChatScreen component'}> <span>ChatScreen</span>
            {children}
        </div>
    )
}
