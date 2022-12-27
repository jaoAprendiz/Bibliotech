import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './style/HomeAdm.css';



function HomeAdm({ isAuth, userAdm }) {
  let navigate = useNavigate();

  useEffect(() => {
    if (!isAuth || !userAdm) {
      navigate("/login");
    }
  }, []);

  // useEffect(() => {
  //     if (!userAdm) {
  //       navigate("/login");
  //     }
  //   }, []);

  return (
  <div className="homepageGeralAdm">
    <div className="homePageAdm">
      <div className="linhaMenuAdm"></div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <h1>Seja Bem-Vindo Administrador(a)</h1>
        <br></br>
        <h2 className="h2_homeAdm" align="center">Horários de funcionamento</h2>
        <table className="homeTabAdm" align="center">
          <tr className="homeTrAdm">
            <td className="homeTdAdm">Segunda-feira:</td>
            <td className="homeTdAdm">10:00 às 14:00</td>
            <td className="homeTdAdm">18:00 às 21:00</td>
          </tr>
          <tr className="homeTr">
            <td className="homeTdAdm">Terça-feira:</td>
            <td className="homeTdAdm">08:00 às 13:00</td>
            <td className="homeTdAdm">-------------------</td>
          </tr>
          <tr className="homeTr">
            <td className="homeTdAdm">Quarta-feira:</td>
            <td className="homeTdAdm">12:00 às 18:00</td>
            <td className="homeTdAdm">20:00 às 22:00</td>
          </tr>
          <tr className="homeTr">
            <td className="homeTdAdm">Quinta-feira:</td>
            <td className="homeTdAdm">-------------------</td>
            <td className="homeTdAdm">19:00 às 21:00</td>
          </tr>
          <tr className="homeTr">
            <td className="homeTdAdm">Sexta-feira:</td>
            <td className="homeTdAdm">10:00 às 17:00</td>
            <td className="homeTdAdm">20:00 às 22:00</td>
          </tr>
        </table>
        <div className='footerHomeAdm'>
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
      </div>
    )
}

export default HomeAdm;