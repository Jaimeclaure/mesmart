import ArchPage from './ArchPage';
import data from '../data/pagina7b.json';

const Pagina7b = () => <ArchPage 
    pageData={data} 
    images={{ 
        img1: '/img/FAH-REPOSTERIA-BROWNIE.jpg', 
        img2: '/img/FAH-REPOSTERIA-CHEESECAKE-FRUTILLA.jpg', 
        img3: '/img/FAH-REPOSTERIA-TORTA-ALEMANA-PORCION.jpg' 
    }} 
/>;

export default Pagina7b;