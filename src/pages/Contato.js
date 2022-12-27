import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import emailjs from '@emailjs/browser';
import { useNavigate } from "react-router-dom";
import './style/Contato.css';
import imagemContato from './img/Literature-rafiki.png';

function Contato ({ isAuth }){

    let navigate = useNavigate();

    useEffect(() => {
      if (!isAuth) {
        navigate("/login");
      }
    }, []);

    const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('service_tkzqecy', 'template_sps43aa', form.current, 'Ezq99PqpDyZJbdw_g')
        .then((result) => {
            
            alert('Mensagem enviada com sucesso!');
        }, (error) => {
            alert(error.message);
      });
        e.target.reset()
    };
  

    return (
        <div>
        <div className="contatoPage">
            <div className="left-contato">
                <h1>Entre em contato com a nossa equipe!</h1>
                <img 
                    src={imagemContato} 
                    alt="" className="left-contato-image"
                    width="35vw"></img>
            </div>
        <div className="right-contato">
        <form className="formContato" ref={form} onSubmit={sendEmail}>
            <h1>Formulário de Contato ☎</h1>

            <div className="contatoLinha"></div>
            
            <div className="contatoTextField">
            <label>Nome</label>
            <input
                type="text"
                name="name"
                placeholder="nome..."
            >
            </input>
            </div>

            <div className="contatoTextField">
            <label>Email</label>
            <input 
                type="email"
                name="email"
                placeholder="email..."
                >
                </input>
            </div>

            <div className="contatoTextField">
            <label>Mensagem</label>
            <textarea 
                name="message"
                placeholder="mensagem..."
                >

                </textarea>
            </div>

            <button
            type="submit"
            value="Send"
            className="btn-contato"
            >
                Enviar
            </button>
        </form>
        </div>
    </div>
    <div className='footerContato'>
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

export default Contato;