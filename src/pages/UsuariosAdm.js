import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import {
  getDocs,
  collection,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";
import './style/usuariosAdm.css';

function UsuariosAdm({ isAuth, userAdm }) {
    const [novoNome, setNovoNome] = useState("");
    const [novoCurso, setNovoCurso] = useState("");
    const [novaData, setNovaData] = useState("");

    let navigate = useNavigate();

    useEffect(() => {
      if (!isAuth || !userAdm) {
        navigate("/login");
      }
    }, []);

    const [usuariosList, setUsuariosList] = useState([]);
    const usuariosCollectionRef = collection(db, "usuarios");

    useEffect(() => {
      const getUsuarios = async () => {
        const data = await getDocs(usuariosCollectionRef);
        setUsuariosList(data.docs.map((doc) =>({...doc.data(), id: doc.id })));
      };
  
      getUsuarios();
    });

    const deleteUser = async (id) => {
      const userDoc = doc(db, "usuarios", id);
      await deleteDoc(userDoc);
    };

    const updateUser = async (id, nome, curso, dataNascimento) => {
      const userDoc = doc(db, "usuarios", id);
      const newFields = { 
         nome: novoNome,
         curso: novoCurso,
         dataNascimento: novaData,
      };
      await updateDoc(userDoc, newFields);
    }

    return (
        <div>
        <div className='usuariosAdmPage'>
            <h2 className='h2_cli_adm'>Usuários</h2> 
            <br></br>
            <br></br>
<table className="tab_cli_adm" align='center'>
    <tr className="tr_cli_adm">
      <td className="td_cli_adm">Nome</td>
      <td className="td_cli_adm">Email</td>
      <td className="td_cli_adm">Curso</td>
      <td className="td_cli_adm">Data de nascimento</td>
      <td className="td_cli_adm">Ações</td>
    </tr>
    {usuariosList.map((usuarios) => {
    return (
    <tr className="tr_cli_adm">
        <td className="td_cli_adm">
          {usuarios.nome}
          <br></br>
          <input 
            placeholder='Novo nome...'
            onChange={(event) => {
              setNovoNome(event.target.value);
          }}
            ></input>
          </td>
        <td className="td_cli_adm">
          {usuarios.email}
        </td>
        <td className="td_cli_adm">
          {usuarios.curso}
          <br></br>
          <select 
                        name="" 
                        id="" 
                        required
                        onChange={(event) => {
                            setNovoCurso(event.target.value);
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
        </td>
        <td className="td_cli_adm"> 
          {usuarios.dataNascimento}
          <br></br>
          <input 
            placeholder='Novo nome...' 
            type="date"
            onChange={(event) => {
              setNovaData(event.target.value);
          }}
        ></input>
        </td>
        <td className='td_cli_adm'>
        <div className='td_cli_adm_btn'>
            <button
            onClick={() => {updateUser(usuarios.id, usuarios.nome, usuarios.curso, usuarios.dataNascimento)}}>Editar</button>
            <button
            onClick={() => {deleteUser(usuarios.id)}}
            >
              Excluir
            </button>
          </div>
        </td>
    </tr>
    );
  })}
</table>
        </div>
                <div className='footerUsuarioAdm'>
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
}

export default UsuariosAdm;