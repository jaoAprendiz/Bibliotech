import React, { useState, useEffect } from "react";
import './style/reservaAdm.css';
import {
  getDocs,
  collection,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { useNavigate } from "react-router-dom";

function ReservaAdm({ isAuth, userAdm }){
  let navigate = useNavigate();

  useEffect(() => {
    if (!isAuth || !userAdm) {
      navigate("/login");
    }
  }, []);

  const [reservasList, setReservasList] = useState([]);
  const reservasCollectionRef = collection(db, "reservas");

  useEffect(() => {
    const getReservas = async () => {
      const data = await getDocs(reservasCollectionRef);
      setReservasList(data.docs.map((doc) =>({...doc.data(), id: doc.id })));
    };

    getReservas();
  });

  const deleteReserva = async (id, idItem) => {
    const itemDoc = doc(db, "reservas", id);
    await deleteDoc(itemDoc);

    const catalogDoc = doc(db, "catalogo", id);
    const newFields = { reservado: false };
    await updateDoc(catalogDoc, newFields);
  }

  const [novaData, setNovaData] = useState("");

  const handleNovaData = async (id, dataReserva) => {
    const reservasDoc = doc(db, "reservas", id);
    const newFields = { dataReserva: novaData };
    await updateDoc(reservasDoc, newFields);
  }
  
  return (
    <div>
  <div className='reservaPageAdm'>
  <h2 className='h2_res_adm'>Reservas</h2>
  <div className="btnReservaAdm">
  </div>
<br></br>
  <table className="tab_res_adm" align='center'>
    <tr className="tr_res_adm">
      <td className="td_res_adm">Livro</td>
      <td className="td_res_adm">Cliente</td>
      <td className="td_res_adm">Devolvido</td>
      <td className="td_res_adm">Reservado até:</td>
      <td className='td_res_adm'>Ações</td>
    </tr>
    {reservasList.map((reservas) => {
    return (
    <tr className="tr_res_adm">
        <td className="td_res_adm">{reservas.nomeItem}</td>
        <td className="td_res_adm">{reservas.nomeCliente}</td>
        <td className="td_res_adm"> 
          <button
           onClick={() => {deleteReserva(reservas.id, reservas.idItem)}}
           >
            Sim!</button>
        </td> 
        <td className="td_res_adm"> 
          {reservas.dataReserva}
          <br></br>
          <input 
            type="date" 
            className="alterarDataReserva" 
            name="alterarDataReserva" 
            id="alterarDataReserva"
            onChange={(event) => {
              setNovaData(event.target.value);
            }}></input>
          </td>
        <td className='td_res_adm'>
        <div className="td_res_adm_btn">
            <button
            onClick={() => {handleNovaData(reservas.id, reservas.dataReserva)}}>Editar</button>
            <button
            onClick={() => {deleteReserva(reservas.id, reservas.idItem)}}
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
        <div className='footerReservaAdm'>
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
export default ReservaAdm;