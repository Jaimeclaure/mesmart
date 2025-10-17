// src/pages/Pagina8a.jsx
import data from '../data/pagina8a.json';

const Pagina8a = () => {
    return (
        <div className="menu-page page-8a">
            <img src="/img/fah_brown.png" alt="Logo Watermark" className="logo-watermark" />
            <div className="qr-section">
                <p>{data[0].frase1}</p>
                <p>{data[0].frase2}</p>
                <p>{data[0].frase3}</p>
                <p>{data[0].frase4}</p>
                <img src="/img/qr.png" alt="QR Code" className="qr-image" />
                <div className="icons-row">
                    <img src="/img/flecha.png" alt="Icono" />
                    <img src="/img/atomo.png" alt="Icono" />
                    <img src="/img/estrella.png" alt="Icono" />
                    <img src="/img/asterisco.png" alt="Icono" />
                </div>
            </div>
            <div className="review-section">
                <p>{data[0].frase5}</p>
                <p>{data[0].frase6}</p>
                <div className="review-logos">
                    <img src="/img/tripadvisor.png" alt="TripAdvisor" />
                    <img src="/img/estrella2.png" alt="Estrella" />
                    <img src="/img/googlemaps.png" alt="Google Maps" />
                </div>
            </div>
        </div>
    );
}

export default Pagina8a;