import ArchPage from './ArchPage';
import data from '../data/pagina5b.json';

const Pagina5b = () => <ArchPage 
    pageData={data} 
    images={{ 
        img1: '/img/FAH-CROISSANT.jpg', 
        img2: '/img/Tartine-de-Palta1.jpg', 
        img3: '/img/Croissant-1-IMG_3513.jpg' 
    }} 
/>;

export default Pagina5b;