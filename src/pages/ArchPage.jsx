const ArchPage = ({ pageData, images }) => {
    return (
        <div className="menu-page arch-page">
            <img src="/img/fah_brown.png" alt="Logo Watermark" className="logo-watermark" />

            <div className="arch-container arch-1">
                <div className="arch-inner"><img src={images.img1} alt={pageData[0].frase1} /></div>
            </div>
            <div className="arch-container arch-2">
                <div className="arch-inner"><img src={images.img2} alt={pageData[0].frase2} /></div>
            </div>
            <div className="arch-container arch-3">
                <div className="arch-inner"><img src={images.img3} alt={pageData[0].frase3} /></div>
            </div>
            
            <div className="text-box text-1">{pageData[0].frase1}</div>
            <div className="text-box text-2">{pageData[0].frase2}</div>
            <div className="text-box text-3">{pageData[0].frase3}</div>
        </div>
    );
}

export default ArchPage;