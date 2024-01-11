import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logout from '../components/logout';
import '../styles/Navbar.scss'

const Navbar = () => {

  const isLoggedIn = useSelector((state) => state.gameAuth.isLoggedIn);

  const checkIfIsActive = ({isActive}) => {
    return {
      color : isActive ? 'red' : 'black'
    }  
  }

  return (
    <ul className='navbar'>
      <li>
          <NavLink style={checkIfIsActive} to="/" className='navbarTool'>Home</NavLink>
          {!isLoggedIn ? (
              <NavLink style={checkIfIsActive} to="/login" className='navbarTool'>Login</NavLink> 
            ) : (
              <>
                <NavLink style={checkIfIsActive} to="/dashboard" className='navbarTool'>Dashboard</NavLink>
                <Logout redirectTo='/login'/> 
              </>
            ) 
          }
          <NavLink style={checkIfIsActive} to="/contact" className='navbarTool'>Contact</NavLink> 
      </li>
    </ul>
  );
};
  
  export default Navbar;
  