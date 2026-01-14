import { useState } from 'react';
import ProductCard from './components/ProductCard';
import CartModal from './components/CartModal';
import './App.scss';

function App() {
  const [produkter, setProdukter] = useState([]);
  const [handlekurv, setHandlekurv] = useState([]);
  const [visModal, setVisModal] = useState(false);
  const [laster, setLaster] = useState(true);
  const [sokeord, setSokeord] = useState("");

  const filtrerteProdukter = produkter.filter((p) => 
    p.title.toLowerCase().includes(sokeord.toLowerCase())
  );

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => {
        setProdukter(data);
        setLaster(false);
      })
      .catch(err => console.error("Feil ved henting av data;", err));
  }, []);

  useEffect(() => {
    const lagretKurv = localStorage.getItem("minNettkurv");
    if (lagretKurv) {
      setHandlekurv(JSON.parse(lagretKurv));
    }
  }, []);

  useEffect(() => {
    localStorage.getItem("minNettkurv", JSON.stringify(handlekurv));
  }, [handlekurv]);

  const leggTilKurv = (p) => setHandlekurv([...handlekurv, p]);
  const fjernFraKurv = (index) => setHandlekurv(handlekurv.filter((_, i) => i !== index));

  return (
    <div className="App">
      <header>
        <nav>
          <div className="logo"><h1>TechStore</h1></div>
          <div className="cart-status" onClick={() => setVisModal(true)}>
            <span>🛒 Kurv ({handlekurv.length})</span>
          </div>
        </nav>
      </header>

      <main>
        <section className="search-section">
          <input
            type="text"
            placeholder="Søk etter produkter..."
            value={sokeord}
            onChange={(e) => setSokeord(e.target.value)}
            className="search-input"
          />
        </section>

        {laster ? (
          <div className="loader">Henter produkter...</div>
        ) : (
          <section className="product-grid">
            {filtrerteProdukter.map((p) => (
              <ProductCard
                key={p.id}
                produkt={{
                  id: p.id,
                  tittel: p.title,
                  pris: Math.round(p.price * 10),
                  bilde: p.image,
                  beskrivelse: p.description
                }}
                onAddToCart={leggTilKurv}
              />
            ))}
      
            {filtrerteProdukter.length === 0 && (
            <p>Ingen produkter funnet for "{sokeord}"</p>
            )}
          </section>
          )}
      </main>

        {visModal && (
          <CartModal
          items={handlekurv}
          onClose={() => setVisModal(false)}
          onRemove={fjernFraKurv}
          />
        )}
    </div>
  );
}


export default App;
