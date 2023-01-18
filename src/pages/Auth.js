import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { store } from '../features/store';
import { logIn } from '../features/userSlice';

export default function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const isValidate = email && password && password.length >= 8;

    const user = useSelector(state => state.user.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    });
    const handleLogin = (e) => {
        e.preventDefault();
        store.dispatch(logIn({ email, password }))
    }
    return (
        <div className={'Auth component'}> <span>Auth</span>
            <form action="">
                <input type="email" value={email} placeholder="email" onChange={(e) => { setEmail(e.target.value) }} />
                <input type="password" placeholder="password" onChange={(e) => { setPassword(e.target.value) }} />
                <button onClick={handleLogin} disabled={!isValidate}>login</button>
            </form>
        </div>
    )
}
