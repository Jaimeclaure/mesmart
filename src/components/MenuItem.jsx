// src/components/MenuItem.jsx

const MenuItem = ({ product }) => {
  return (
    <div className="menu-item">
      <div className="item-header">
        <span className="item-name">{product.nombre}</span>
        <div className="item-prices">
          {product.precio1 && <span>{product.precio1} Bs</span>}
          {product.precio2 && <span>{product.precio2} Bs</span>}
        </div>
      </div>
      {product.descripcion && (
        <p className="item-description">{product.descripcion}</p>
      )}
    </div>
  );
};

export default MenuItem;