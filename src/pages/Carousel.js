import ImageSlider from './tools/ImageSlider';
import './style/Carousel.css';

const App = () => {
  const slides = [
    {url: "https://firebasestorage.googleapis.com/v0/b/bibliotech-72ec4.appspot.com/o/system%2Fcarousel%2Fimag1carossel.jpeg?alt=media&token=c4892d9f-f77b-4731-b5d7-e3e5da049348", title: "Bibliotech1" },
    {url: "https://firebasestorage.googleapis.com/v0/b/bibliotech-72ec4.appspot.com/o/system%2Fcarousel%2Fimag2carossel.jpeg?alt=media&token=8b9f5a5f-e948-40ae-b98e-835f1a5d55a4", title: "Bibliotech2" },
    {url: "https://firebasestorage.googleapis.com/v0/b/bibliotech-72ec4.appspot.com/o/system%2Fcarousel%2Fimag3carossel.jpeg?alt=media&token=d5d71741-6546-4da7-882d-0da03c6a257e", title: "Bibliotech3" },
    {url: "https://firebasestorage.googleapis.com/v0/b/bibliotech-72ec4.appspot.com/o/system%2Fcarousel%2Fimag4carossel.jpeg?alt=media&token=3e8c109c-72c3-47e2-ba8f-6218583f83f6", title: "Bibliotech4" },
    {url: "https://firebasestorage.googleapis.com/v0/b/bibliotech-72ec4.appspot.com/o/system%2Fcarousel%2Fimag5carossel.jpeg?alt=media&token=30852540-d84e-478d-8feb-cb7218494026", title: "Bibliotech5" },
  ];

  const containerStyles = {
    width: '700px',
    height: '700px',
    margin: "0 auto",
  };

  return (
      <div className="inicioPage">
        <div className="inicioLinha"></div>
        <div className='inicioDireita'>
          <h1>Seja Bem-Vindo(a)</h1>
          <br></br>
          <div style={containerStyles}>
            <ImageSlider slides={slides}></ImageSlider>
          </div>
          <br></br>
          <br></br>
          <br></br>
        </div>
        <div className='sobretela'>
          <div className='footerCarousel'>
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
  );
};

export default App;