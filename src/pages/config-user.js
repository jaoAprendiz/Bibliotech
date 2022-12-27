import { useRef, useState, useEffect } from "react";
import { useAuth } from "../firebase-config";
import UserPic from "./tools/userPic";
import { Navigate, useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from 'firebase/auth';
import './style/Config.css';
import { 
  getDocs,
  collection,
  addDoc,
  query,
  updateDoc,
  doc,
  where,
  setDoc,
  getDoc,
  onSnapshot,
} from 'firebase/firestore';
import { auth, db } from "../firebase-config";
import { async } from "@firebase/util";


function ConfigUser({ isAuth }) {
    let navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
          navigate("/login");
        }
      }, []);

    const [ loading, setLoading ] = useState(false);
    const currenteUser = useAuth();
    const [usuariosList, setUsuariosList] = useState([]);
    const usuariosCollectionRef = collection(db, "usuarios");
    const q = query(usuariosCollectionRef, where("idUsuario", "==", (localStorage.getItem("userId"))));

    const [novoNome, setNovoNome] = useState("");
    const [novaDataNascimento, setNovaDataNascimento] = useState("");
    const [email, setEmail] = useState('');

    const onChange = (e) => setEmail(e.target.value);

    useEffect(() => {
      const getUsuarios = async () => {
        const data = await getDocs(q);
        setUsuariosList(data.docs.map((doc) =>({...doc.data(), id: doc.id })));
      };
  
      getUsuarios();
    });

    const handleTrocarData = async (id, dataNascimento) => {
      const userDoc = doc(db, "usuarios", id);
      const newFields = { dataNascimento:  novaDataNascimento };
      await updateDoc(userDoc, newFields);
    }
    
    const handleTrocarNome = async (id, nome) => {
      const userDoc = doc(db, "usuarios", id);
      const newFields = { nome: novoNome  };
      await updateDoc(userDoc, newFields);
    }

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
      <div className="mainConfig">
        <div className="center-box">
        <div className="card-config">
          <h1>Configure seu Usuário</h1>
          <br></br>
          {usuariosList.map((usuarios) => {
          return (
          <div>
          <label htmlFor="trocarNome">{usuarios.nome}</label>
          <div className="configTextField">
          <input 
            type="text" 
            placeholder="Digite um novo nome..." 
            id="trocarNome"
            onChange={(event) => {
              setNovoNome(event.target.value);
            }}></input>
          <button
            onClick={() => {handleTrocarNome(usuarios.id, usuarios.nome)}}
          >
            Enviar
          </button>
          </div>
          <br></br>
          
          <label htmlFor="trocarSenha">Deseja trocar sua senha?</label>
          <div className="configTextField">
          <input 
            type="text" 
            placeholder="Digite seu email..." 
            id="trocarSenha"
            onChange={onChange}></input>
          <button
            onClick={onSubmit}>Enviar</button>
          </div>
          <br></br>

          <label htmlFor="trocarDataNascimento">Trocar data de nascimento</label>
          <div className="configTextField">
          <input 
            type="date" 
            id="trocarDataNascimento"
            onChange={(event) => {
              setNovaDataNascimento(event.target.value);
            }}
          ></input>
          <button onClick={() => {handleTrocarData(usuarios.id, usuarios.dataNascimento)}}>Enviar</button>
          </div>
          <br></br>
          </div>
          );
        })}
        <label>Adicionar imagem ao perfil:</label>
        <br></br>
      <div className="setImagemPerfil">
      {currenteUser && 
        <>
          <UserPic className="UserPic"/>
        </>
}
</div>
</div>
</div>
</div>

<div className='footerConfig'>
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

  export default ConfigUser;