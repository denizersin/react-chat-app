import React from 'react'

export default function Images({ imagesUrl, chatData }) {

    return (
        <div className={'Images component'}> <span>Image</span>
            {imagesUrl.map((url, i) => {
                if (i > 4) return null;
                if (i == 4) {
                    return (
                        // +++
                        <img key={i} src={url} alt="" />
                    )
                }
                return (
                    <img key={i} src={url} alt="" />

                )
            })}
        </div>
    )
}
