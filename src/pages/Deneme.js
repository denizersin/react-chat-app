import React from 'react'
import { useSelector } from 'react-redux'

export default function Deneme() {
    const userData = useSelector(state => state.user.user.userData);
    alert('ASD')
    return (
        <div className={'Deneme component'}> <span>Deneme</span>

        </div>
    )
}
