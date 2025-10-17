// src/pages/Pagina8b.jsx
import data from '../data/pagina8b.json';

const Pagina8b = () => {
    return (
        <div className="menu-page page-8b">
            <img src="./img/Fahrenheitv4transparenteblanco.png" alt="Logo Fahrenheit" className="logo-back" />
            <p>{data[0].frase1}</p>
            <p className="bold-link">{data[0].frase2}</p>
            <p>{data[0].frase3}</p>
            <p>{data[0].frase4}</p>
            <div className="social-icons">
                <img src="/img/facebook.png" alt="Facebook" />
                <img src="/img/instagram.png" alt="Instagram" />
                <img src="/img/whatsapp.png" alt="WhatsApp" />
                <img src="/img/tiktok.png" alt="TikTok" />
            </div>
        </div>
    );
}

export default Pagina8b;