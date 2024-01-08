import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Play from './pages/play';
import Contact from './pages/contact';
import Login from './pages/login';
import Navbar from './pages/Navbar';
import NotFound from './pages/NotFound';

function App() {

  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/play' element={<Play />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
