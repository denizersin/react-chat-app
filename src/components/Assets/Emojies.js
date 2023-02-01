import React from 'react'
const emojiesArr = `😀 😃 😄 😁 😆 😅 😂 🤣 🥲 🥹 ☺️ 😊 😇 🙂 🙃 😉 😌 😍 🥰 😘 😗 😙 😚 😋 😛 😝 😜 🤪 🤨 🧐 🤓 😎 🥸 🤩 🥳 😏 😒 😞 😔 😟 😕 🙁 ☹️ 😣 😖 😫 😩 🥺 😢 😭 😮‍💨 😤 😠 😡 🤬 🤯 😳 🥵 🥶 😱 😨 😰 😥 😓 🫣 🤗 🫡 🤔 🫢 🤭 🤫 🤥 😶 😶‍🌫️ 😐 😑 😬 🫠 🙄 😯 😦 😧 😮 😲 🥱 😴 🤤 😪 😵 😵‍💫 🫥 🤐 🥴 🤢 🤮 🤧 😷 🤒 🤕 🤑 🤠 😈 👿 👹 👺 🤡 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾`
    .split(' ');
console.log(emojiesArr)
export default function Emojies({ setMsgFormData }) {

    console.log(emojiesArr)
  


    const handleClickEmoji = (e, emo) => {
        setMsgFormData(prev => ({
            content: prev.content + emo
        }))
    }
    return (
        <div className={'Emojies component'}> <span>Emojies</span>
            {emojiesArr.map(emo => (
                <div onClick={(e) => handleClickEmoji(e, emo)} className='emoji'>
                    {emo}
                </div>
            ))}
        </div>
    )
}
