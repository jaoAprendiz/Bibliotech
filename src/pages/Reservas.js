import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase-config";
import './style/Reservas.css';
import {
  getDocs,
  collection,
  query,
  updateDoc,
  doc,
  where,
  deleteDoc
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Catalogo from "./Catalogo";

function Reservas({ isAuth }) {
  const [reservasList, setReservasList] = useState([]);

    let navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
          navigate("/login");
        }
      }, []);

  useEffect(() => {
    const getReservas = async () => {
      const data = await getDocs(q);
      setReservasList(data.docs.map((doc) =>({...doc.data(), id: doc.id })));
    };
    
      getReservas();
    });
      
  const reservaCollectionRef = collection(db, "reservas");
  

  const cancelarReserva = async (id, idItem) => {
    const reservaDoc = doc(db, "reservas", id);
    await deleteDoc(reservaDoc);

    const catalogDoc = doc(db, "catalogo", id);
    const newFields = { reservado: false };
    await updateDoc(catalogDoc, newFields);
  }

  //queries
  const q = query(reservaCollectionRef, where("idUsuario", "==", (localStorage.getItem("userId"))));

    return <div>
      <h2><center>Suas Reservas</center></h2>
      <br></br>
      <br></br>
      <br></br>
      <table className="tab_reserva" align="center">
        <tr className="tr_reserva">
          <td className="td_reserva" colSpan="2">Livro</td>
          <td className="td_reserva" colSpan="2">Reservado até:</td>
        </tr>
        {reservasList.map((reservas) => {
    return (
        <tr className="tr_reserva">
            <td className="td_reserva"><img src={reservas.imgCapa} alt="resImage-1" width="100" height="150"></img></td>
            <td className="td_reserva">{reservas.nomeItem}</td>
            <td className="td_reserva">{reservas.dataPedido} até {reservas.dataReserva}</td>
            <td className="td_reserva">
              <button 
                className="btn-Cancelar"
                onClick={() => {cancelarReserva(reservas.id, reservas.idItem)}}
              >
                Cancelar
              </button>
            </td>
        </tr>
            );
          })}
    </table>

    <div className='footerReservas'>
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
    </div>;
}

export default Reservas;