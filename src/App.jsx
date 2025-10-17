// src/App.jsx
import { useState, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

// Las importaciones ahora coincidirán con los nombres de archivo renombrados
import Pagina1a from './pages/Pagina1a.jsx';
import Pagina1b from './pages/Pagina1b.jsx';
import Pagina2a from './pages/Pagina2a.jsx';
import Pagina2b from './pages/Pagina2b.jsx';
import Pagina3a from './pages/Pagina3a.jsx';
import Pagina3b from './pages/Pagina3b.jsx';
import Pagina5a from './pages/Pagina5a.jsx';
import Pagina5b from './pages/Pagina5b.jsx';
import Pagina7a from './pages/Pagina7a.jsx';
import Pagina7b from './pages/Pagina7b.jsx';
import Pagina8a from './pages/Pagina8a.jsx';
import Pagina8b from './pages/Pagina8b.jsx';

// Importar componentes y datos LOCALES de respaldo
import MenuPage from './components/MenuPage.jsx';
import MenuCategory from './components/MenuCategory.jsx';
import JsonUploader from './components/JsonUploader.jsx';
import initialCafeData from './data/productoCafe.json';
import initialHamburguesaData from './data/productoHamburguesa.json';
import initialBistroData from './data/productoBistro.json';
import initialPostreData from './data/productoPostre.json';

// (El resto del archivo App.jsx permanece exactamente igual que en mi mensaje anterior)

// Función para procesar los datos
const processMenuData = (cafe, hamburguesa, bistro, postre) => {
  const safeFilter = (data, key, filterFn) => (data && data[key] ? data[key].filter(filterFn) : []);
  
  return {
    cafe: {
      añadir: safeFilter(cafe, 'productosCafes', p => p.tipo === 'añadir'),
      tazaPequeña: safeFilter(cafe, 'productosCafes', p => p.tipo === 'tazaPequeña'),
      tazaMedianaGrande: safeFilter(cafe, 'productosCafes', p => p.tipo === 'tazaMedianaGrande'),
      especiales: safeFilter(cafe, 'productosCafes', p => p.tipo === 'tazaEspeciales'),
      frios: safeFilter(cafe, 'productosCafes', p => p.tipo === 'frio'),
      infusiones: safeFilter(cafe, 'productosCafes', p => p.tipo === 'infusion'),
    },
    hamburguesa: {
      extras: safeFilter(hamburguesa, 'productosHamburguesas', p => p.tipo === 'Extra'),
      clasicas: safeFilter(hamburguesa, 'productosHamburguesas', p => p.tipo === 'clasicas'),
      autenticas: safeFilter(hamburguesa, 'productosHamburguesas', p => p.tipo === 'autenticas'),
      exoticas: safeFilter(hamburguesa, 'productosHamburguesas', p => p.tipo === 'exoticas'),
    },
    bistro: {
      paninis: safeFilter(bistro, 'productosBistro', p => p.tipo.toLowerCase() === 'paninis'),
      croissant: safeFilter(bistro, 'productosBistro', p => p.tipo.toLowerCase() === 'croissant'),
      salados: safeFilter(bistro, 'productosBistro', p => p.tipo.toLowerCase() === 'salados'),
    },
    postre: {
      helados: safeFilter(postre, 'productosPostres', p => p.tipo === 'Helados'),
      postres: safeFilter(postre, 'productosPostres', p => p.tipo === 'Postres'),
      jugos1: safeFilter(postre, 'productosPostres', p => p.tipo === 'Jugos1'),
      jugos2: safeFilter(postre, 'productosPostres', p => p.tipo === 'Jugos2'),
      bebidas: safeFilter(postre, 'productosPostres', p => p.tipo === 'Bebidas'),
    }
  };
};

function App() {
  const componentRef = useRef();
  const [rawData, setRawData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/.netlify/functions/get-products');
        if (!response.ok) {
          console.warn("No se pudo conectar al servidor. Usando datos locales de respaldo.");
          setRawData({
            cafe: initialCafeData,
            hamburguesa: initialHamburguesaData,
            bistro: initialBistroData,
            postre: initialPostreData,
          });
        } else {
          const data = await response.json();
          setRawData({
            cafe: data.cafe || initialCafeData,
            hamburguesa: data.hamburguesa || initialHamburguesaData,
            bistro: data.bistro || initialBistroData,
            postre: data.postre || initialPostreData,
          });
        }
      } catch (error) {
        console.error("Error al cargar datos, usando respaldo local:", error);
        setRawData({
            cafe: initialCafeData,
            hamburguesa: initialHamburguesaData,
            bistro: initialBistroData,
            postre: initialPostreData,
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Fahrenheit-Coffee-Bistro-Menu',
  });

  const handleJsonUploadSuccess = (uploadedItems) => {
     setRawData(prevData => {
        const newData = { ...prevData };
        uploadedItems.forEach(item => {
           if (item.category && item.data) {
              newData[item.category] = item.data;
           }
        });
        return newData;
     });
  };
  
  if (isLoading || !rawData) {
    return <div style={{ fontFamily: 'ITC Benguiat Std', fontSize: '24px', textAlign: 'center', padding: '50px' }}>Cargando menú...</div>;
  }
  
  const menuData = processMenuData(rawData.cafe, rawData.hamburguesa, rawData.bistro, rawData.postre);

  return (
    <>
      <div className="controls-container">
        <JsonUploader onUploadSuccess={handleJsonUploadSuccess} />
        <button onClick={handlePrint} className="print-button">
          Generar PDF del Menú
        </button>
      </div>
      <div ref={componentRef} className="menu-container">
        
        <Pagina1a />
        <Pagina1b />
        <Pagina2a />
        <Pagina2b />
        <Pagina3a />
        <Pagina3b />

        <MenuPage title="CAFÉ DE ESPECIALIDAD">
          <MenuCategory title="Puedes añadir a tu taza" products={menuData.cafe.añadir} icon="AÑADIR.png" />
          <div className="category-separator" />
          <MenuCategory title="Café Caliente" products={menuData.cafe.tazaPequeña} icon="tazaP.png" />
          <MenuCategory products={menuData.cafe.tazaMedianaGrande} />
          <div className="category-separator" />
          <MenuCategory title="Especiales Fahrenheit" products={menuData.cafe.especiales} icon="bebidaLicor.png" />
          <div className="category-separator" />
          <MenuCategory title="Café Frío" products={menuData.cafe.frios} icon="bebidaFria.png" />
          <div className="category-separator" />
          <MenuCategory title="Infusiones" products={menuData.cafe.infusiones} icon="tazainfusion.png" />
        </MenuPage>

        <MenuPage title="HAMBURGUESAS BISTRÓ">
          <MenuCategory title="Añade extras a tu gusto" products={menuData.hamburguesa.extras} icon="AÑADIR.png" />
          <div className="category-separator" />
          <MenuCategory title="Clásicas (Medallón / Smash)" products={menuData.hamburguesa.clasicas} icon="burgerN.png" />
          <div className="category-separator" />
          <MenuCategory title="Auténticas (Medallón / Smash)" products={menuData.hamburguesa.autenticas} icon="burgerN.png" />
          <div className="category-separator" />
          <MenuCategory title="Exóticas (Medallón / Smash)" products={menuData.hamburguesa.exoticas} icon="burgerN.png" />
        </MenuPage>
        
        <Pagina5a />
        <Pagina5b />

        <MenuPage title="SABORES BISTRÓ">
            <MenuCategory title="Paninis" products={menuData.bistro.paninis} icon="panini.png" />
            <div className="category-separator" />
            <MenuCategory title="Croissant" products={menuData.bistro.croissant} icon="croissant.png" />
            <div className="category-separator" />
            <MenuCategory title="Salados" products={menuData.bistro.salados} icon="sandwich.png" />
        </MenuPage>

        <MenuPage title="POSTRES & BEBIDAS">
            <MenuCategory title="Helados" products={menuData.postre.helados} icon="helado.png" />
            <div className="category-separator" />
            <MenuCategory title="Postres" products={menuData.postre.postres} icon="torta.png" />
            <div className="category-separator" />
            <MenuCategory title="Jugos Especiales en Copa" products={menuData.postre.jugos1} icon="jugos.png" />
            <div className="category-separator" />
            <MenuCategory title="Jugos Naturales en Jarra" products={menuData.postre.jugos2} icon="jarra.png" />
            <div className="category-separator" />
            <MenuCategory title="Gaseosas y Bebidas" products={menuData.postre.bebidas} icon="bebidas.png" />
        </MenuPage>

        <Pagina7a />
        <Pagina7b />
        <Pagina8a />
        <Pagina8b />
      </div>
    </>
  );
}

export default App;

