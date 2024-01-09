import { useState } from 'react';
import '../styles/login.scss';
import { usePostLoginMutation } from '../slices/gameApiSlice';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [newPortLogin] = usePostLoginMutation();

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
            const responseData = response.data;
            if(responseData.id != isNaN){
                setIsLoggedIn(true);
            }
        } catch (error) {
            console.error('Erreur de connexion:', error);
        }
    } 
    

    const handleLogoutClick = () => {
        setIsLoggedIn(false);
        console.log('Déconnecté avec succès !');
    };

    return (
        <div>
        {isLoggedIn === false &&
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
        {isLoggedIn === true &&
            <div>
                Bienvenue sur le Back Office !
                <form className="login" onSubmit={handleLogoutClick}>
                   <button type="submit">Logout</button> 
                </form>
            </div>
        }
        </div>   
    )  
}

export default Login;