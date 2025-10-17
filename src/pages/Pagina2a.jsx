// src/pages/Pagina2a.jsx
import data from '../data/pagina2a.json';

const Pagina2a = () => {
  return (
    <div className="menu-page page-2a">
      <img src="/img/fah_brown.png" alt="Logo Watermark" className="logo-watermark" />
      <img src="/img/pareja.png" alt="Pareja" className="image-top" style={{ width: '500px' }} />
      <p className="main-text">{data[0].frase1}</p>
      <img src="/img/grupoamigas.png" alt="Amigas" className="image-bottom" style={{ width: '600px' }} />
    </div>
  );
};
export default Pagina2a;