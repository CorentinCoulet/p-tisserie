import { useState } from 'react';
import '../styles/login.scss';
import { usePostLoginMutation, useGetMeQuery } from '../slices/gameApiSlice';
import { setLoggedIn } from '../slices/gameAuthSlice';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Login = ({ redirectTo }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const dispatch = useDispatch();

    const [newPortLogin] = usePostLoginMutation();
    const { data, isLoading } = useGetMeQuery();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await newPortLogin({ email, password });
            console.log(response);
            if(!response.error){
                dispatch(setLoggedIn());
                setIsLoggedIn(true)
            } else {
                alert('Email ou mot de passe incorrect');
            }
        } catch (error) {
            alert('Erreur de connexion:', error);
        }
    } 

    if (isLoggedIn) {
        return <Navigate to={redirectTo} />;
    }

    return (
        <div>
        {!isLoggedIn  &&
            <form className="login" onSubmit={handleSubmit}>
                <label>
                    Your email
                    <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                />
                </label>
                <br />
                <label>
                    Password
                    <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>   
        }
        {isLoading && isLoggedIn &&
            <div>
                <p>Bienvenue, {data.name}!</p>
                <p>Email: {data.email}</p>
                <p>Status: {data.status}</p>
            </div>
        }
        </div>   
    )  
}

export default Login;