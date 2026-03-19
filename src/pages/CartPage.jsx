import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const navigate = useNavigate();
  const { items, removeItem, setQuantity, clear } = useCart();

  const summary = useMemo(() => {
    const count = items.reduce((sum, x) => sum + (Number(x.quantity) || 0), 0);
    return { count };
  }, [items]);

  return (
    <div className="petjs-page">
      <div className="petjs-page-header">
        <h2>Cart</h2>
        <div className="petjs-row">
          <button className="petjs-btn" onClick={() => clear()} disabled={!items.length}>
            Clear
          </button>
          <Link className="petjs-btn" to="/products">
            Continue shopping
          </Link>
        </div>
      </div>

      {!items.length ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="petjs-cart">
            {items.map(({ product, quantity }) => (
              <div className="petjs-cart-item" key={product.id}>
                <div className="petjs-cart-main">
                  <div className="petjs-cart-title">{product.destTitle}</div>
                  <div className="petjs-muted">{product.location}</div>
                  <div className="petjs-muted">{product.fees}</div>
                </div>
                <div className="petjs-cart-controls">
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(product.id, e.target.value)}
                    style={{ width: 90 }}
                  />
                  <button className="petjs-btn" onClick={() => removeItem(product.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="petjs-page-footer">
            <div className="petjs-muted">Items: {summary.count}</div>
            <button className="petjs-btn petjs-btn-primary" onClick={() => navigate("/checkout")}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

