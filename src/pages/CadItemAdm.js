import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  collection,
  addDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";
import './style/cadItem.css';

function CadItemAdm({ isAuth, userAdm }) {
  const [identItem, setIdentItem] = useState(0);
  const [nomeLivro, setNomeLivro] = useState("");
  const [generoLivro, setGeneroLivro] = useState("");
  const [autorLivro, setAutorLivro] = useState("");
  const [anoLivro, setAnoLivro] = useState(0);
  const [editora, setEditora] = useState("");
  const [edicao, setEdicao] = useState(0);
  const [estado, setEstado] = useState("");
  const [exemplar, setExemplar] = useState(0);
  const [tombo, setTombo] = useState("");
  const [isbn, setIsbn] = useState(0);
  const [linkCapa, setLinkCapa] = useState("");

  const handleCadastrarLivro = async () => {
    try {
        await addDoc(collection(db, "catalogo"), {
          idItem: Number(identItem),
          nome:  nomeLivro,
          generoLiterario: generoLivro,
          autor: autorLivro,
          ano: Number(anoLivro),
          editora,
          edicao: Number(edicao),
          estado,
          exemplar: Number(exemplar),
          tombo,
          isbn: Number(isbn),
          imgCapa: linkCapa,
          reservado: false,
        });
        alert('Livro Cadastrado com Sucesso!');
    } catch (error) {
        console.log(error.message);
    }
};

  let navigate = useNavigate();

  useEffect(() => {
    if (!isAuth || !userAdm) {
      navigate("/login");
    }
  }, []);

    return (
      <div>
        <div className="main-registrar-livro">
        <div className="center-box-registrar-livro">
        <form onSubmit={handleCadastrarLivro}>
          <div className="card-registrar-livro">
          <h3>Cadastre um livro</h3>
          <div className="linhaCatalogarAdm"></div>
          
          <div className="textfieldCatalogarAdm">
            <label htmlFor="numberID_item">Identificação Item:</label>               
            <input 
              type="number" 
              name="numberID_item" 
              id="numberID_item"
              onChange={(event) => {
                setIdentItem(event.target.value);
                }}
              ></input>
          </div>

          <div className="textfieldCatalogarAdm">
            <label htmlFor="bookName">Nome do Livro:</label>               
            <input 
              type="text" 
              name="bookName" 
              id="bookName"
              onChange={(event) => {
                setNomeLivro(event.target.value);
                }}
              ></input>
          </div>

          <div className="textfieldCatalogarAdm">
            <label htmlFor="numberAssunto">Gênero</label>          
            <input 
              type="text" 
              name="numberAssunto" 
              id="numberAssunto"
              onChange={(event) => {
                setGeneroLivro(event.target.value);
              }}
              ></input>
          </div>       

          <div className="textfieldCatalogarAdm">
            <label htmlFor="bookAuthor">Autor:</label>                    
            <input 
              type="text" 
              name="bookAuthor" 
              id="bookAuthor"
              onChange={(event) => {
                setAutorLivro(event.target.value);
              }}
              >
              </input>
          </div>

          <div className="textfieldCatalogarAdm">
            <label htmlFor="bookDate">Ano:</label>                        
            <input 
              type="number" 
              name="bookDate" 
              id="bookdate"
              onChange={(event) => {
                setAnoLivro(event.target.value);
              }}
              ></input>
          </div>
    
          <div className="textfieldCatalogarAdm">
            <label htmlFor="bookPublisher">Editora:</label>               
            <input 
              type="text" 
              name="bookPublisher" 
              id="bookPublisher"
              onChange={(event) => {
                setEditora(event.target.value);
              }}
              ></input>
          </div>
    
          <div className="textfieldCatalogarAdm">
            <label htmlFor="bookEdicao">Edição:</label>                   
            <input 
              type="number" 
              name="bookEdicao" 
              id="bookEdicao"
              onChange={(event) => {
                setEdicao(event.target.value);
              }}
              >
              </input>
          </div> 
          
          <div className="textfieldCatalogarAdm">
            <label htmlFor="bookEstado">Estado:</label>                   
            <input 
              type="text" 
              name="bookEstado" 
              id="bookEstado"
              onChange={(event) => {
                setEstado(event.target.value);
              }}
              ></input>
          </div>
          
          <div className="textfieldCatalogarAdm">
            <label htmlFor="bookExem">Exemplar:</label>                 
            <input 
              type="number" 
              name="bookExem" 
              id="bookExem"
              onChange={(event) => {
                setExemplar(event.target.value);
              }}
              ></input>
            </div>
    
          <div className="textfieldCatalogarAdm"> 
            <label htmlFor="numberTombo">Tombo:</label>
            <input 
              type="text" 
              name="numberTombo" 
              id="numberTombo"
              onChange={(event) => {
                setTombo(event.target.value);
              }}
              >
              </input>
          </div>
          
          <div className="textfieldCatalogarAdm">
            <label htmlFor="numberISBN">ISBN:</label>                     
            <input 
              type="number" 
              name="numberISBN" 
              id="numberISBN"
              onChange={(event) => {
                setIsbn(event.target.value);
              }}
              >
              </input>
          </div>

          <div className="textfieldCatalogarAdm">
            <label htmlFor="bookCover">Insira o link da capa:</label>     
            <input 
              type="text" 
              name="bookCover" 
              id="bookCover"
              onChange={(event) => {
                setLinkCapa(event.target.value);
              }}
            >
            </input>
          </div>

          <div className="linhaCatalogarAdm"></div>
          <button 
            type="submit" 
            name="submit" 
            id="submit" 
            className="btn-registrar-livro"
            >Cadastrar</button>
        </div>
        </form>

    </div>
    </div>
        <div className='footerCadItem'>
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