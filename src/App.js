import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Carousel from './pages/Carousel';
import Home from "./pages/Home";
import Catalogo from './pages/Catalogo';
import Reservas from './pages/Reservas';
import Contato from "./pages/Contato";
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/tools/Profile';
import ConfigUser from './pages/config-user';
import HomeAdm from './pages/HomeAdm';
import CadItemAdm from './pages/CadItemAdm';
import UsuariosAdm from './pages/UsuariosAdm';
import ReservaAdm from './pages/ReservaAdm';
import CatalogarAdm from './pages/CatalogarAdm';
import { auth } from './firebase-config';
import { useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [user, setUser] = useState({});
  const [userAdm, setUserAdm] = useState(localStorage.getItem("userAdm"));

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        console.log(currentUser);
    });

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/";
    });
  };

  const queroLogar = () => {
    window.location.pathname = "/login";
  };

  const voltarInicio = () => {
    window.location.pathname = "/"
  };

  return (
    <Router>
      {!userAdm ? 
      <nav>
          <img 
            src="https://firebasestorage.googleapis.com/v0/b/bibliotech-72ec4.appspot.com/o/system%2FnavBar%2Flogoescrito.png?alt=media&token=16884caa-49b8-4ebb-ae43-dac7f626469d" 
            alt="navbar-logo"
            className="navBarLogo"
            height="148px"
            onClick={voltarInicio}
            >
          
          </img>
        {!isAuth ? null : <Link to="/home"> Home </Link>}
        {!isAuth ? null : <Link to="/catalogo"> Catálogo </Link>}
        {!isAuth ? null : <Link to="/reservas"> Reservas </Link>}
        {!isAuth ? null : <Link to="/contato"> Contato </Link>}
        
        {!isAuth ? null : <Link to="/configuser"><Profile></Profile></Link>}
        {!isAuth ? null : 
         <button 
         onClick={signUserOut}
         className="btn-logout">

          <img 
            src="https://firebasestorage.googleapis.com/v0/b/bibliotech-72ec4.appspot.com/o/system%2FnavBar%2Fsair-alt.png?alt=media&token=d7074096-92fa-4a34-a71b-3405471bf34f" 
            alt="logout-img" 
            width="40vw"
            >
            </img>
          </button>
          }
          
          {!isAuth ?
           <button className="btnNavBarFacaLogin" onClick={queroLogar}>Faça Login</button> : null}
      </nav> 
      : 
      <nav>
        <a href='/'>
          <img 
            src="https://firebasestorage.googleapis.com/v0/b/bibliotech-72ec4.appspot.com/o/system%2FnavBar%2Flogoescrito.png?alt=media&token=16884caa-49b8-4ebb-ae43-dac7f626469d" 
            alt="navbar-logo"
            className="navBarLogo"
            height="150px"
            >
          </img>
        </a>
        <Link to="/homeadm"> Home </Link>
        <Link to="/catalogaradm"> Catálogo </Link>
        <Link to="/reservaadm"> Reservas </Link>
        <Link to="/usuariosadm"> Usuários </Link>
        {!isAuth ? null : <Link to="/configuser"><Profile></Profile></Link>}
        {!isAuth ? null : 
         <button 
         onClick={signUserOut}
         className="btn-logout">

          <img 
            src="https://firebasestorage.googleapis.com/v0/b/bibliotech-72ec4.appspot.com/o/system%2FnavBar%2Fsair-alt.png?alt=media&token=d7074096-92fa-4a34-a71b-3405471bf34f" 
            alt="logout-img" 
            width="40vw"
            >
            </img>
          </button>
          }
      </nav>
      }
      <br></br>
      <Routes>
        <Route path="/" element={<Carousel></Carousel>}></Route>
        <Route path="/home" element={<Home isAuth={isAuth}></Home>}></Route>
        <Route path="/catalogo" element={<Catalogo isAuth={isAuth}></Catalogo>}></Route>
        <Route path="/reservas" element={<Reservas isAuth={isAuth}></Reservas>}></Route>
        <Route path="/contato" element={<Contato isAuth={isAuth}></Contato>}></Route>
        <Route path="/login" element={<Login setIsAuth={setIsAuth} setUserAdm={setUserAdm}></Login>}></Route>
        <Route path="/registrar" element={<Register setIsAuth={setIsAuth}></Register>}></Route>
        <Route path="/forgotpassword" element={<ForgotPassword setIsAuth={setIsAuth}></ForgotPassword>}></Route>
        <Route path="/configuser" element={<ConfigUser isAuth={isAuth}></ConfigUser>}></Route>
        <Route path="/homeadm" element={<HomeAdm isAuth={isAuth} userAdm={userAdm}></HomeAdm>}></Route>
        <Route path="/caditemadm" element={<CadItemAdm isAuth={isAuth} userAdm={userAdm}></CadItemAdm>}></Route>
        <Route path="/usuariosadm" element={<UsuariosAdm isAuth={isAuth} userAdm={userAdm}></UsuariosAdm>}></Route>
        <Route path="/reservaadm" element={<ReservaAdm isAuth={isAuth} userAdm={userAdm}></ReservaAdm>}></Route>
        <Route path="/catalogaradm" element={<CatalogarAdm isAuth={isAuth} userAdm={userAdm}></CatalogarAdm>}></Route>
      </Routes>
    </Router>
  );
}

export default App;