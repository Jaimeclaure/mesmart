import ArchPage from './ArchPage';
import data from '../data/pagina3a.json';

const Pagina3a = () => <ArchPage 
    pageData={data} 
    images={{ 
        img1: '/img/CopaMelba1.jpg', 
        img2: '/img/Latte-IMG_3145.jpg', 
        img3: '/img/FAH-CHICKEN-WINGS-2.jpg' 
    }} 
/>;

export default Pagina3a;