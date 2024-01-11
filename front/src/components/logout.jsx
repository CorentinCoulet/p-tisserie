import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { setLoggedOut } from '../slices/gameAuthSlice';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useGetLogoutMutation } from '../slices/gameApiSlice';
import '../styles/logout.scss'

const Logout = ({ redirectTo }) => {

    const [logout, isSuccess] = useGetLogoutMutation();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedOut, setIsLoggedOut] = useState(false);
    const dispatch = useDispatch();

    const handleLogoutClick = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await logout();
            if(isSuccess){
               dispatch(setLoggedOut());
               setIsLoggedOut(true);
            } 
        }
        catch {
            alert('Erreur de connexion: Une erreur s\'est produite');
        }
        finally {
            setIsLoading(false);  
        }
    };

    if (isLoading) {
        return <p>Déconnexion en cours...</p>;
    }

    if (isLoggedOut) {
        return <Navigate to={redirectTo} />;
    }

    return (
        <form className="logout" onSubmit={handleLogoutClick}>
            <button type="submit">Logout</button>
        </form> 
    )   
}

Logout.propTypes = {
    redirectTo: PropTypes.string.isRequired,
}

export default Logout;