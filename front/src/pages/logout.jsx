import { setLoggedOut } from '../slices/gameAuthSlice';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogoutClick = () => {
    dispatch(setLoggedOut());
    console.log('Déconnecté avec succès !');
  };

  return (
    <div>
        <form className="logout" onSubmit={handleLogoutClick}>
        <button type="submit">Logout</button>
        </form>
        <Navigate to="/login" />
    </div>
  );
}

export default Logout;