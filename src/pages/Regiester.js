import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { store } from '../features/store';
import { register } from '../features/userSlice';



export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setdisplayName] = useState('');
    const [avatarUrl, setavatarUrl] = useState('');
    const isValidate = email && password && password.length >= 8 && displayName.length > 0

    const handleRegister = (e) => {
        e.preventDefault();
        store.dispatch(register({ email, password, displayName, avatarUrl }));
    }


    const user = useSelector(state => state.user.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate('/');
    },);
    return (
        <div className={'Login component'}> <span>Login</span>
            <form action="">
                <input type="text" value={displayName} placeholder="user-name" onChange={(e) => { setdisplayName(e.target.value) }} />
                <input type="text" value={avatarUrl} placeholder="avatar-link(optional)" onChange={(e) => { setavatarUrl(e.target.value) }} />
                <input type="email" value={email} placeholder="email" onChange={(e) => { setEmail(e.target.value) }} />
                <input type="password" placeholder="password" onChange={(e) => { setPassword(e.target.value) }} />
                <button onClick={handleRegister} disabled={!isValidate}>register</button>
            </form>
        </div>
    )
}
