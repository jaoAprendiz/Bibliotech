import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
    collection,
    setDoc,
    doc,
    addDoc,
    Timestamp,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";
import './style/Cadastro.css';

function Register({ setIsAuth }) {

    let navigate = useNavigate();
    const VoltarLogin = () => {
        navigate("/login");
    };

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    // const [tipoUsuario, setTipoUsuario] = useState("");
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    // const [telefone, setTelefone] = useState("0");
    const [curso, setCurso] = useState("");
    const [dataNascimento, setDataNascimento] = useState("")

    const userCollectionRef = collection(db, "usuarios");

    const handleRegister = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            ).then((result) => {
                localStorage.setItem("isAuth", true);
                localStorage.setItem("userId", auth.currentUser.uid);
                setIsAuth(true);
                navigate("/home");
            })
            await setDoc(doc(db, "usuarios", auth.currentUser.uid), {
                idUsuario: auth.currentUser.uid,
                nome,
                email,
                curso,
                dataNascimento,
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    // const createUser = async () => {
    //     await addDoc(userCollectionRef, {nome});  
    // };

    return (
<div className="box">
    <div className="center-box-register">
        <div className="card-register">
            <h1>Cadastro</h1>
        <div className="linha">
        </div>
            {/* <div class="textfield">
                <select 
                name="user" 
                id="user" 
                required
                onChange={(event) => {
                    setTipoUsuario(event.target.value);
                }}>
                    <option disabled selected> Que tipo de usuário você é?</option>
                    <option value="aluno">ALUNO</option>
                    <option value="etec">FUNCIONÁRIOS</option>
                    <option value="responsavel">BIBLIOTECÁRIO</option>
                </select>
            </div> */}

                    <div className="textfield">
                        <label htmlFor="name">Nome:</label>
                        <input 
                        type="text"
                        name="nome"
                        id="nome"
                        placeholder="Digite seu nome"
                        required
                        onChange={(event) => {
                            setNome(event.target.value);
                            }}>
                        </input>
                    </div>

                    <div className="textfield">
                        <label htmlFor="email">E-mail:</label>
                        <input 
                        type="email" 
                        className="email" 
                        id="email" 
                        placeholder="Digite seu e-mail" 
                        required
                        onChange={(event) => {
                            setRegisterEmail(event.target.value);
                            setEmail(event.target.value);
                        }}>
                        </input>
                    </div>
                
                    {/* <div class="textfield">
                        <label for="email">Confirme seu E-mail:</label>
                        <input type="text" name="confirmar email" id="email" placeholder="Confirmar E-mail"></input>
                    </div> */}

                    <div className="textfield">
                        <label htmlFor="senha">Senha:</label>
                        <input 
                        type="password" 
                        name="senha" 
                        id="senha" 
                        placeholder="Digite sua senha" 
                        required
                        onChange={(event) => {
                            setRegisterPassword(event.target.value);
                        }}>
                        </input>
                    </div>

                    {/* <div class="textfield">
                        <label for="telefone">Telefone:</label>
                        <input 
                        type="tel" 
                        name="telefone" 
                        id="telefone" 
                        placeholder="Digite seu telefone" 
                        required
                        onChange={(event) => {
                            setTelefone(event.target.value);
                        }}>
                        </input>
                    </div> */}

                    <div class="cursos">
                        <label for="user">Selecione seu curso: </label>
                        <select 
                        name="user" 
                        id="user" 
                        required
                        onChange={(event) => {
                            setCurso(event.target.value);
                        }}>
                            <option disabled selected> Curso... </option>
                            <option value="M-TEC PI | Administração">M-TEC PI | Administração</option>
                            <option value="M-TEC PI | Desenvolvimento de Sistemas">M-TEC PI | Desenvolvimento de Sistemas</option>
                            <option value="M-TEC PI | Química">M-TEC PI | Química</option>
                            <option value="ETIM Administração">ETIM Administração</option>
                            <option value="ETIM Desenvolvimento de Sistemas">ETIM Desenvolvimento de Sistemas</option>
                            <option value="ETIM Química">ETIM Química</option>
                            <option value="Administração - EAD">Administração - EAD</option>
                            <option value="Recursos Humanos">Recursos Humanos</option>
                            <option value="Secretariado">Secretariado</option>
                            <option value="Logística">Logística</option>
                        </select>
                    </div>

                    <div class="textfield">
                        <label htmlFor="data_nascimento">Data de nascimento:</label>
                        <input 
                            type="date"
                            onChange={(event) => {
                                setDataNascimento(event.target.value);
                            }}>
                            </input>
                        {/* <DatePicker className="data_nascimento" name="data_nascimento" id="data_nascimento" selected={startDate} onChange={(date) => setStartDate(date)} /> */}
                    </div>

                    <button name="submit" id="submit" className="btn-cadastro" onClick={handleRegister}>Cadastrar-se</button>

                    <div className="lin2">
                    </div>

                    <div className="login">
                        <button onClick={VoltarLogin} className="btn-voltar">Já tem uma conta?</button>
                    </div>
            </div>
    </div>

    <div className='footerCad'>
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

export default Register;