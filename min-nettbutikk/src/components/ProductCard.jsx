function ProductCard({ produkt, onAddToCart }) {
    return (
        <article className="product-card">
            <img src={produkt.bilde} alt={produkt.tittel}/>
            <h3>{produkt.tittel}</h3>
            <p>{produkt.beskrivelse}</p>
            <div className="price-section">
                <span className="price">{produkt.pris} kr</span>
                <button onClick={() => onAddToCart(produkt)}>
                    Legg i handlekurv
                </button>
            </div>
        </article>
    );
}

export default ProductCard;