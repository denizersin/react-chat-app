import React from 'react'

export default function UserProfile(props) {
    const { user, children } = props
    console.log(children)
    return (
        <div className={'UserProfile component'}> <span>UserProfile</span>
            <div className="c c1">
                <img src="" alt="" />
            </div>
            <div className="c c2">
                <div className="r r1">
                    {user.displayName}
                </div>
                <div className="r r2">
                    {children}
                </div>
            </div>
        </div>
    )
}
