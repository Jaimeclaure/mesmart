import ArchPage from './ArchPage';
import data from '../data/pagina2b.json';

const Pagina2b = () => <ArchPage 
    pageData={data} 
    images={{ 
        img1: '/img/FahrenheitBurger2.jpg', 
        img2: '/img/FAH-CAFE-FRIO-ICED-FOAM-AMERICANO.jpg', 
        img3: '/img/Cookies3-IMG_3080.jpg' 
    }} 
/>;

export default Pagina2b;