import React, {useEffect} from "react";
import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import './style/Esqueci.css';

function ForgotPassword({ isAuth }) {
    // let navigate = useNavigate();

    // useEffect(() => {
    //     if (!isAuth) {
    //       navigate("/login");
    //     }
    //   }, []);

    const [email, setEmail] = useState('');

    const onChange = (e) => setEmail(e.target.value);

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            await sendPasswordResetEmail(auth, email);
            alert('Um email foi enviado para sua conta...');
        } catch (error) {
            alert('Não foi possível enviar o email de reset');
        }
    };

    return (
        <div>
        <form className="main-forget" onSubmit={onSubmit}>
            <div className="center-box-forget">
                    <div className="card-forget">
                        <h1>Esqueceu a Senha?</h1>
                        <div className="linhaforget">
                        </div>
                        <div className="textfield">
                            <label htmlFor="email">E-mail:</label>
                            <input 
                            type="email" 
                            name="email" 
                            placeholder="Digite seu E-mail" 
                            required 
                            onChange={onChange}>
                            </input>
                        </div>
                        <div className="lin2forget">
                        </div>
                        <button class="btn-confirmar">Confirmar</button>
                    
                </div>
        </div>
        </form>

        <div className='footerForgot'>
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
    );
};

export default ForgotPassword;