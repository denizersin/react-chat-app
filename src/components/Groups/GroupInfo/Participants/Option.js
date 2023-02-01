import React from 'react'
import "../../../../styles/Option.css"
export default function Option({ handleOptionClick, children }) {
    console.log(children, 'asd')
    children = children instanceof Array ? children : [children];
    return (
        <div onClick={handleOptionClick} className={'Option component'}> <span>Option</span>
            {children[0]}
        </div>
    )
}
