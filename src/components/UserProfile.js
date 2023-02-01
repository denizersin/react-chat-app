import React from 'react'
import '../styles/UserProfile.css'
export default function UserProfile(props) {
    let { user, children } = props
    children = children instanceof Array ? children : [children]
    console.log(children)
    return (
        <div className={'UserProfile component'}> <span>UserProfile</span>
            <div className="c c1 img-c">
                <img src={user.avatarUrl} alt="" />
            </div>
            <div className="c c2">
                <div className="r r1 user-name">
                    {user.displayName}
                </div>
                <div className="r r2 children">
                    {children}
                </div>
            </div>
        </div>
    )
}
