// src/components/MenuPage.jsx

const MenuPage = ({ title, children }) => {
  return (
    <div className="menu-page">
      <header className="page-header">
        <img src="/img/fah_brown.png" alt="Logo" className="page-logo" />
        <h1 className="page-title">{title}</h1>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
};

export default MenuPage;