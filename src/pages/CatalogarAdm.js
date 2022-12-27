import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
    getDocs,
    collection,
    deleteDoc,
    updateDoc,
    doc,
  } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import './style/catalogar.css';

function CadItemAdm({ isAuth, userAdm }) {
    let navigate = useNavigate();

    useEffect(() => {
        if (!isAuth || !userAdm) {
          navigate("/login");
        }
      }, []);

    const CadItemAdm = () => {
        navigate("/caditemadm");
    };

    const [catalogoList, setCatalogoList] = useState([]);
    const catalogoCollectionRef = collection(db, "catalogo");

    useEffect(() => {
        const getCatalogo = async () => {
          const data = await getDocs(catalogoCollectionRef);
          setCatalogoList(data.docs.map((doc) =>({...doc.data(), id: doc.id })));
        };
    
        getCatalogo();
      });

      const deleteItem = async (id) => {
        const itemDoc = doc(db, "catalogo", id);
        await deleteDoc(itemDoc);

        const catalogDoc = doc(db, "catalogo", id);
        const newFields = { reservado: false };
        await updateDoc(catalogDoc, newFields);
      };

      const [NovoIdentItem, setIdentItem] = useState(0);
      const [nomeLivro, setNomeLivro] = useState("");
      const [generoLivro, setGeneroLivro] = useState("");
      const [autorLivro, setAutorLivro] = useState("");
      const [anoLivro, setAnoLivro] = useState(0);
      const [novaEditora, setEditora] = useState("");
      const [novaEdicao, setEdicao] = useState(0);
      const [novoEstado, setEstado] = useState("");
      const [novoExemplar, setExemplar] = useState(0);
      const [novoTombo, setTombo] = useState("");
      const [novoIsbn, setIsbn] = useState("");
      const [linkCapa, setLinkCapa] = useState("");

      const handleEdit = async (id, idItem, nome, generoLiterario, autor, ano, editora, edicao, estado, exemplar, tombo, isbn, imgCapa) => {
        const catalogoDoc = doc(db, "catalogo", id);
        const newFields = {
          identItem: Number(NovoIdentItem),
          nome:  nomeLivro,
          generoLiterario: generoLivro,
          autor: autorLivro,
          ano: Number(anoLivro),
          editora: novaEditora,
          edicao: Number(novaEdicao),
          estado: novoEstado,
          exemplar: Number(novoExemplar),
          tombo: (novoTombo),
          isbn: Number(novoIsbn),
          imgCapa: linkCapa, 
          };
        await updateDoc(catalogoDoc, newFields);
      }

    return (
        <div>
        <div className="mainCatalogoAdm">
             <h2 className='h2_cd_adm'> Itens Catalogados </h2>
             <br></br>
        <div className="btnCatalogoAdm">     
            <button className="btn-maisreserva-cd-adm" onClick={CadItemAdm}> Cadastrar novo item</button>
            {/* <button className="btn-maisreserva-cd-adm"> Excluir item selecionado </button> */}
        </div>
        <br></br>
        <table className="tab_cd_adm" align='center'>
            <tr className="tr_cd_adm">
                <td className="td_cd_adm">Identificação Item</td>
                <td className="td_cd_adm">Nome</td>
                <td className="td_cd_adm">Gênero</td>
                <td className="td_cd_adm">Autor</td>
                <td className="td_cd_adm">Ano</td>
                <td className="td_cd_adm">Editora</td>
                <td className="td_cd_adm">Edição</td>
                <td className="td_cd_adm">Estado</td>
                <td className="td_cd_adm">Exemplar</td>
                <td className="td_cd_adm">Tombo</td>
                <td className="td_cd_adm">ISBN</td>
                <td className="td_cd_adm">Capa</td>
                <td className='td_cd_adm'>Ações</td>
            </tr>
            {catalogoList.map((catalogo) => {
            return (
            <tr className="tr_cd_adm">
                <td className="td_cd_adm">
                    {catalogo.idItem}
                    <br></br>
                    <input
                      type="number"
                      placeholder='Novo ID...'
                      onChange={(event) => {
                        setIdentItem(event.target.value);
                      }}
                      ></input>
                </td>
                <td className="td_cd_adm"> 
                {catalogo.nome}
                <br></br>
                <input 
                  placeholder='Novo nome...'
                  onChange={(event) => {
                    setNomeLivro(event.target.value);
                  }}></input>
                </td>
                <td className="td_cd_adm">
                {catalogo.generoLiterario}
                <br></br>
                <input 
                  placeholder='Novo genero...'
                  onChange={(event) => {
                    setGeneroLivro(event.target.value);
                  }}
                  ></input>
                </td>
                <td className="td_cd_adm"> 
                {catalogo.autor}
                <br></br>
                <input 
                  placeholder='Novo autor...'
                  onChange={(event) => {
                    setAutorLivro(event.target.value);
                  }}
                ></input>
                </td>
                <td className="td_cd_adm"> 
                {catalogo.ano}
                <br></br>
                <input
                type="number"
                  placeholder='Novo ano...'
                  onChange={(event) => {
                    setAnoLivro(event.target.value);
                  }}
                ></input>
                </td>
                <td className="td_cd_adm"> 
                {catalogo.editora}
                <br></br>
                <input 
                  placeholder='Nova editora...'
                  onChange={(event) => {
                    setEditora(event.target.value);
                  }}
                ></input>
                </td>
                <td className="td_cd_adm"> 
                {catalogo.edicao}
                <br></br>
                <input 
                type="number"
                  placeholder='Nova edição...'
                  onChange={(event) => {
                    setEdicao(event.target.value);
                  }}
                ></input>
                </td>
                <td className="td_cd_adm"> 
                {catalogo.estado}
                <br></br>
                <input 
                  placeholder='Novo estado...'
                  onChange={(event) => {
                    setEstado(event.target.value);
                  }}
                  ></input>
                </td>
                <td className="td_cd_adm"> 
                {catalogo.exemplar}
                <br></br>
                <input 
                type="number"
                  placeholder='Novo exemplar...'
                  onChange={(event) => {
                    setExemplar(event.target.value);
                  }}
                ></input>
                </td>
                <td className="td_cd_adm"> 
                {catalogo.tombo}
                <br></br>
                <input 
                  placeholder='Novo tombo...'
                  onChange={(event) => {
                    setTombo(event.target.value);
                  }}></input>
                </td>
                <td className="td_cd_adm"> 
                {catalogo.isbn}
                <br></br>
                <input 
                  placeholder='Novo ISBN...'
                  onChange={(event) => {
                    setIsbn(event.target.value);
                  }}
                ></input>
                </td>
                <td className="td_cd_adm">
                <br></br>
                <input 
                  placeholder='Novo link...'
                  onChange={(event) => {
                    setLinkCapa(event.target.value);
                  }}
                ></input>
                </td>
                <td className='td_cd_adm'>
                    <div className='td_cd_adm_btn'>
                        <button
                        onClick={() => {deleteItem(catalogo.id)}}>Excluir</button>
                        <button
                        onClick={() => {handleEdit(catalogo.id, catalogo.idItem, catalogo.nome, catalogo.generoLiterario, catalogo.autor, catalogo.ano, catalogo.editora, catalogo.edicao, catalogo.estado, catalogo.exemplar, catalogo.tombo, catalogo.isbn, catalogo.imgCapa)}}>Editar</button>
                    </div>
                </td>
            </tr>
                );
            })}
        </table>
    </div>
    <div className='footerCatalogoAdm'>
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

export default CadItemAdm;