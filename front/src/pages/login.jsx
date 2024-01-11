import { useState } from 'react';
import '../styles/login.scss';
import { usePostLoginMutation } from '../slices/gameApiSlice';
import { setLoggedIn } from '../slices/gameAuthSlice';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Login = ({ redirectTo }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const [newPortLogin] = usePostLoginMutation();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await newPortLogin({ email, password });
            if(!response.error){
                dispatch(setLoggedIn());
                setIsLoggedIn(true);
            } else {
                alert('Email ou mot de passe incorrect');
            }
        } catch (error) {
            alert('Erreur de connexion: Une erreur s\'est produite');
        } finally {
            setIsLoading(false);
        }
    } 

    if (isLoading) {
        return <p>Connexion en cours...</p>;
    }

    if (isLoggedIn) {
        return <Navigate to={redirectTo} />;
    }

    return (
        <div>

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
            
        </div>   
    )  
}

Login.propTypes = {
    redirectTo: PropTypes.string.isRequired,
}

export default Login;