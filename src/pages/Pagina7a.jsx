import ArchPage from './ArchPage';
import data from '../data/pagina7a.json';

const Pagina7a = () => <ArchPage 
    pageData={data} 
    images={{ 
        img1: '/img/FAH-FRAPPUCCINO-CLASSIC.jpg', 
        img2: '/img/FAH-FRAPPUCCINO-FRUTILLA.jpg', 
        img3: '/img/FAH-FRAPPUCCINO-OREO.jpg' 
    }} 
/>;

export default Pagina7a;