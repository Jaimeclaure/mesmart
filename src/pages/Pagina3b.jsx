import ArchPage from './ArchPage';
import data from '../data/pagina3b.json';

const Pagina3b = () => <ArchPage 
    pageData={data} 
    images={{ 
        img1: '/img/RedFruitsLatte1.jpg', 
        img2: '/img/FAH-CAFE-MOCACCINO.jpg', 
        img3: '/img/FAH-CAFE-ICED-LATTE.jpg' 
    }} 
/>;

export default Pagina3b;