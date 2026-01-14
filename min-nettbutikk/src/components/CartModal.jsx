function CartModal({ items, onClose, onRemove}) {
    const total = items.redice((sum, item) =>  sum + item.price, 0);

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>&times;</button>
                <h2>Din Handlekurv</h2>

                {items.length === 0 ? (
                    <p>Kurven er tom...</p>
                ) : (
                    <ul className="cart-list">
                       {items.map((item, index) => (
                        <li key={index} className="cart-item">
                            <span>{item.tittel}</span>
                            <span>{item.pris} kr</span>
                            <button onClick={() => onRemove(index)}>Fjern</button>
                        </li>
                       ))} 
                    </ul>
                )}

                <div className="cart-total">
                    <strong>Total: {total} kr</strong>
                    <button className="checkout-btn" disabled={items.length === 0}>
                        Gå til kassen
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CartModal;