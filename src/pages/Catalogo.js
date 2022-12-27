import React, { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  query,
  updateDoc,
  doc,
  where,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";
import './style/catalogo.css';

function Catalogo({ isAuth }) {

  const [catalogoList, setCatalogoList] = useState([]);
  const catalogoCollectionRef = collection(db, "catalogo");

  useEffect(() => {
    const getCatalogo = async () => {
      const data = await getDocs(q);
      setCatalogoList(data.docs.map((doc) =>({...doc.data(), id: doc.id })));
    };

    getCatalogo();
  });

  const handleReserva = async (id, reservado, nome, imgCapa) => {
    try {
    const userDoc = doc(db, "catalogo", id);
    const newFields = { reservado: true };
    await updateDoc(userDoc, newFields);

    await setDoc(doc(db, "reservas", id), {
      nomeCliente: auth.currentUser.email,
      nomeItem: nome,
      dataPedido: "07/12/2022",
      dataReserva: "12/12/2022",
      imgCapa: imgCapa,
      idUsuario: auth.currentUser.uid,
      devolvido: false,
  });
  alert('Reserva realizada com sucesso!')
  } catch (error) {
    alert('Não foi possível realizar sua reserva!')
  }
  };

  //queries
  const q = query(catalogoCollectionRef, where("reservado", "==", false));

    return ( 
      <div>
  <div className="catalogoPage">

  {catalogoList.map((catalogo) => {
    return (
    <div className="outLineCatalogo">
    <div className="catalogo">
      <div className="catalogoHeader">
        <div className="title">
          <h1> {catalogo.nome} </h1>
          <h3>@{catalogo.autor}</h3>
        </div>
      </div>
      <img src={catalogo.imgCapa} alt="capaLivro" width="30%"></img>
      <div className="catalogoTextContainer"></div>
      <button
        className="btnCatalogoReservar"
        onClick={() => {
          handleReserva(catalogo.id, catalogo.reservado, catalogo.nome, catalogo.imgCapa)
        }}
        >
          Reservar
      </button>
      
    </div>
    </div>
    );
  })}
          <br></br>
        <br></br>
  </div>

  <div className='footerCatalogo'>
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

export default Catalogo;