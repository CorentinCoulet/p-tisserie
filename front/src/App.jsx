import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/home';
import Play from './pages/play';
import Contact from './pages/contact';
import Login from './pages/login';
import Logout from './pages/logout';
import Navbar from './pages/Navbar';
import NotFound from './pages/NotFound';

function App() {

  const isLoggedIn = useSelector((state) => state.gameAuth.isLoggedIn);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/play' element={isLoggedIn ? <Play /> : <Navigate to="/login" />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login redirectTo="/logout" />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
