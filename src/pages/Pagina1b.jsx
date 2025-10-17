// src/pages/Pagina1b.jsx
import data from '../data/pagina1b.json';

const Pagina1b = () => {
  return (
    <div className="menu-page page-1b">
      <img src="/img/fah_brown.png" alt="Logo Watermark" className="logo-watermark" />
      <img src="/img/mujerescafebistro.png" alt="Disfrutando" className="image-top" style={{ width: '600px' }} />
      <p className="main-text">{data[0].frase1}</p>
      <img src="/img/familia.png" alt="Familia" className="image-bottom" style={{ width: '550px' }} />
    </div>
  );
};
export default Pagina1b;