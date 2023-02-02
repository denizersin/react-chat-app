import React, { useEffect, useRef } from 'react'
import { BiTime } from "react-icons/bi"
import { BsCheck2, BsCheck2All } from "react-icons/bs"
const setAnim = (elem) => {
    elem.classList.remove('anim')
    setTimeout(() => {
        elem.classList.add('anim')
    }, 0);
}

export default function ArrivalStatus({ arrivalStatus }) {
    console.log(arrivalStatus, 'qweqwe')
    const arrivRef = useRef();
    useEffect(() => {
        setAnim(arrivRef.current);
    }, [arrivalStatus]);
    return (
        <div ref={arrivRef} className={`ArrivalStatus component ${arrivalStatus == 'saw' ? 'saw' : ''}`}> <span>ArrivalStatus</span>
            {arrivalStatus == 'sending' && <BiTime />}
            {arrivalStatus == 'sent' && <BsCheck2 />}
            {arrivalStatus == 'recieved' && <BsCheck2All />}
            {arrivalStatus == 'saw' && <BsCheck2All />}
        </div>
    )
}
