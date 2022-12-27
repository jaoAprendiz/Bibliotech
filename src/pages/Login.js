import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "./img/logo.png";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth"; 
import { auth } from "../firebase-config";
import './style/Login.css';

function Login({ setIsAuth, setUserAdm }) {
    let navigate = useNavigate();
    const Registrar = () => {
        navigate("/registrar");
    };
    const Esqueci = () => {
        navigate("/forgotpassword");
    };

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const UserLogin = async () => {
        if(loginEmail === "admin@admin.com" && loginPassword === "admin123") {
            try {
                const user = await signInWithEmailAndPassword(
                    auth,
                    loginEmail,
                    loginPassword
                ).then((result) => {
                    localStorage.setItem("userAdm", true);
                    localStorage.setItem("isAuth", true);
                    localStorage.setItem("userId", auth.currentUser.uid);
                    setIsAuth(true);
                    setUserAdm(true);
                    navigate("/homeadm");
                });
            } catch (error) {
                console.log(error);
                alert('Email ou senha inválidos');
            }
        } else {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            ).then((result) => {
                localStorage.setItem("isAuth", true);
                localStorage.setItem("userId", auth.currentUser.uid);
                setIsAuth(true);
                navigate("/home");
            });
        } catch (error) {
            alert("Email ou senha incorreto");
            console.log(error);
        }
        }
    };

    return (
        <div>
        <div className="main-login">
            <div className="left-login">
                <img src={logo} alt="Logo-Bibliotech"></img>
            </div>
            <div className="right-login">
            <div className="card-login">
                <h1>Login</h1>
                <div className="linha_branca">
                </div>
                {/* <div class="textfield">
                    <label for="user">Entrar como: </label>
                    <select name="user" id="user" required>
                        <option value="aluno">ALUNO</option>
                        <option value="etec">FUNCIONÁRIOS</option>
                        <option value="responsavel">BIBLIOTECÁRIO</option>
                    </select>
                </div> */}
                {/* <div class="textfield">
                    <label for="cod-etec">Código da Etec: </label>
                    <input type="text" name="cod-etec" placeholder="ex: 225"></input>
                </div> */}
                <div className="textfield">
                    <label htmlFor="email">E-mail:</label>
                    <input
                    type="email"
                    name="email"
                    placeholder="Digite seu E-mail"
                    required
                    onChange={(event) => {
                        setLoginEmail(event.target.value);
                    }}>
                    </input>
                </div>
                <div className="textfield">
                    <label htmlFor="senha">Senha:</label>
                    <input 
                    type="password"
                    name="senha"
                    placeholder="Digite sua senha"
                    required
                    onChange={(event) => {
                        setLoginPassword(event.target.value);
                    }}>
                    </input>
                </div>
                <button onClick={UserLogin} className="btn-login">Ingressar</button>
                <div className="esquecido">
                    <button onClick={Esqueci} className="btn-esqueci">Esqueceu sua senha?</button>
                </div>
                
                <div className="lin2login">
                </div>
                <button onClick={Registrar} className="btn-sign">Cadastre-se</button>
            </div>
        </div>
    </div>
    
    <div className='footerLogin'>
    <button className="boina-teste">
      <a href='https://www.instagram.com/bibliotech.rt/' rel="noopener noreferrer" target="_blank">
        <img 
        src='https://firebasestorage.googleapis.com/v0/b/bibliotech-72ec4.appspot.com/o/system%2Finicio%2Finstagram.png?alt=media&token=cacf936c-d6e4-4955-84ff-f5c74f36e155'
        alt="bibliotechLogoQuem"
        width="30vw"
        height="30vh">
        </img>
      </a>
    </button>
    <br></br>
    © Copyright 2022
    </div>
    
    </div>
    )
}

export default Login;