import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './style/Home.css';

function Home({ isAuth }) {
  let navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  return (
  <div className="homepageGeral">
    <div className="homePage">
      <div className="linhaMenu"></div>
        <br></br>
        <h2 className="h2_home" align="center">Horários de funcionamento</h2>
        <table className="homeTab" align="center">
          <tr className="homeTr">
            <td className="homeTd">Segunda-feira:</td>
            <td className="homeTd">10:00 às 14:00</td>
            <td className="homeTd">18:00 às 21:00</td>
          </tr>
          <tr className="homeTr">
            <td className="homeTd">Terça-feira:</td>
            <td className="homeTd">08:00 às 13:00</td>
            <td className="homeTd">-------------------</td>
          </tr>
          <tr className="homeTr">
            <td className="homeTd">Quarta-feira:</td>
            <td className="homeTd">12:00 às 18:00</td>
            <td className="homeTd">20:00 às 22:00</td>
          </tr>
          <tr className="homeTr">
            <td className="homeTd">Quinta-feira:</td>
            <td className="homeTd">-------------------</td>
            <td className="homeTd">19:00 às 21:00</td>
          </tr>
          <tr className="homeTr">
            <td className="homeTd">Sexta-feira:</td>
            <td className="homeTd">10:00 às 17:00</td>
            <td className="homeTd">20:00 às 22:00</td>
          </tr>
        </table>
        <br></br>
        <br></br>
        <h2 className="h2_home" align="center">Acesse o Catálogo</h2>
        <div class="scrollmenu" align="center">
          <a className="aHome" href="/catalogo"><img src="https://m.media-amazon.com/images/I/81taSo-m23L.jpg" alt="livro21" height="250" width="180"></img></a>
          <a className="aHome"href="/catalogo"><img src="https://m.media-amazon.com/images/I/51Gai1xusDL.jpg" alt="livro22" height="250" width="180"></img></a>
          <a className="aHome"href="/catalogo"><img src="https://m.media-amazon.com/images/I/51hmrNfUzyL._SX353_BO1,204,203,200_.jpg" alt="livro23" height="250" width="180"></img></a>
          <a className="aHome"href="/catalogo"><img src="https://m.media-amazon.com/images/I/61b-4EC4TjL.jpg" alt="livro24" height="250" width="180"></img></a>
          <a className="aHome"href="/catalogo"><img src="https://m.media-amazon.com/images/I/41jMU9e3NIL._SX374_BO1,204,203,200_.jpg" alt="livro25" height="250" width="180"></img></a>
        </div>
        <div className='footerHome'>
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

export default Home;