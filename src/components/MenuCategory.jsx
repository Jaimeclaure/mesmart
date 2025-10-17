// src/components/MenuCategory.jsx
import MenuItem from './MenuItem';

const MenuCategory = ({ title, products, icon }) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="category-container">
      {/* Si hay un título, lo mostramos con su ícono */}
      {title && (
        <h2 className="category-title">
          {icon && <img src={`/img/${icon}`} alt="" />}
          <span>{title}</span>
        </h2>
      )}
      <div className="category-content">
        {products.map((product) => (
          <MenuItem key={product.nombre} product={product} />
        ))}
      </div>
    </div>
  );
};

export default MenuCategory;