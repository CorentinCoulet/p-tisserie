import { NavLink } from 'react-router-dom';
import '../styles/Navbar.scss'

const Navbar = () => {

    const checkIfIsActive = ({isActive}) => {
      return {
        color : isActive ? 'red' : 'black'
      }  
    }

    return (
      <ul className='navbar'>
        <li>
           <NavLink style={checkIfIsActive} to="/" className='navbarTool'>Home</NavLink>
           <NavLink style={checkIfIsActive} to="/login" className='navbarTool'>Login</NavLink> 
           <NavLink style={checkIfIsActive} to="/contact" className='navbarTool'>Contact</NavLink> 
        </li>
      </ul>
    );
  };
  
  export default Navbar;
  