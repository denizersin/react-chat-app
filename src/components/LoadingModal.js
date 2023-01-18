import React from 'react'
import { useSelector } from 'react-redux'
import "../styles/LoadingModal.css"
export default function LoadingModal() {
    const isLoading = useSelector(state => state.isLoading.value)
    if (!isLoading) return;
    return (
        <div className={'LoadingModal '}>
            YUKLENIYOR
        </div>
    )
}
