import ArchPage from './ArchPage';
import data from '../data/pagina5a.json';

const Pagina5a = () => <ArchPage 
    pageData={data} 
    images={{ 
        img1: '/img/FAH-BURGER-FAHRENHEIT-SMASH.jpg', 
        img2: '/img/FAH-BURGER-PICKELS-1.jpg', 
        img3: '/img/Jalapeno-Burger1 copia.jpg' 
    }} 
/>;

export default Pagina5a;