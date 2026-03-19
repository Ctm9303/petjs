import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "petjs_cart_v1";

function readStoredCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => readStoredCart());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const api = useMemo(() => {
    function addItem(product, quantity = 1) {
      setItems((prev) => {
        const qty = Number(quantity || 1);
        const nextQty = Number.isFinite(qty) && qty > 0 ? qty : 1;

        const idx = prev.findIndex((x) => x.product.id === product.id);
        if (idx === -1) return [...prev, { product, quantity: nextQty }];
        return prev.map((x, i) => (i === idx ? { ...x, quantity: x.quantity + nextQty } : x));
      });
    }

    function removeItem(productId) {
      setItems((prev) => prev.filter((x) => x.product.id !== productId));
    }

    function setQuantity(productId, quantity) {
      setItems((prev) =>
        prev
          .map((x) =>
            x.product.id === productId ? { ...x, quantity: Math.max(1, Number(quantity || 1)) } : x
          )
          .filter((x) => Number.isFinite(x.quantity))
      );
    }

    function clear() {
      setItems([]);
    }

    const count = items.reduce((sum, x) => sum + (Number(x.quantity) || 0), 0);

    return { items, addItem, removeItem, setQuantity, clear, count };
  }, [items]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

