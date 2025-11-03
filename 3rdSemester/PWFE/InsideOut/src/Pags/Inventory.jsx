import { useEffect, useState } from "react";

export function Inventory() {
  const [stickers, setStickers] = useState([]);

  useEffect(() => {
    // Loads the inventory saved in localStorage when opening the page
    const stored = JSON.parse(localStorage.getItem("inventory")) || [];
    setStickers(stored);
  }, []);

    const cleanInventory = () => {
    // asks for confirmation from the user
    if (!window.confirm("Do you really want to clear out the inventory?")) return;

    // remove item from localStorage
    localStorage.removeItem("inventory");

    // Updates the local state to reflect the cleanup in the UI.
    setStickers([]);
  };


  return (
    <main className="conteiner">
        <section className="inventory">
      <h2>Inventory</h2>
      <button className="clean-inventory" onClick={cleanInventory}>
            Clean Inventorory
          </button>

      {/* Caso o jogador ainda não tenha nenhuma figurinha */}
      {stickers.length === 0 ? (
        <p className="empty">No stickers collected yet!</p>
      ) : (
        <div className="grid">
          {stickers.map((s) => (
            <div key={s.id} className="stickers">
              <img src={s.image} alt={s.name} />
             
            </div>
          ))}
        </div>
      )}
      </section>
    </main>
  );
}
