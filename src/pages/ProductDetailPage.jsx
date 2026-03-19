import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchProductById } from "../api";
import { useCart } from "../context/CartContext";

import imgDogA from "../Assest/2.png";
import imgDogB from "../Assest/1.jpg";

function resolveImage(imageKey) {
  if (imageKey === "1.jpg") return imgDogB;
  return imgDogA;
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError("");
    fetchProductById(id)
      .then((p) => {
        if (!alive) return;
        setProduct(p);
      })
      .catch((e) => {
        if (!alive) return;
        setError(e?.message || "FAILED_TO_LOAD");
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [id]);

  if (loading) return <div className="petjs-page">Loading...</div>;
  if (error)
    return (
      <div className="petjs-page">
        <p style={{ color: "crimson" }}>Error: {error}</p>
        <Link className="petjs-btn" to="/products">
          Back to products
        </Link>
      </div>
    );

  if (!product) return <div className="petjs-page">Not found.</div>;

  return (
    <div className="petjs-page">
      <div className="petjs-detail">
        <img className="petjs-detail-img" src={resolveImage(product.imageKey)} alt={product.destTitle} />
        <div className="petjs-detail-body">
          <h2>{product.destTitle}</h2>
          <div className="petjs-muted">{product.location}</div>
          <div className="petjs-price">{product.fees}</div>
          <p>{product.description}</p>

          <div className="petjs-row">
            <label className="petjs-muted">Quantity</label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value || 1))}
              style={{ width: 100 }}
            />
          </div>

          <div className="petjs-row">
            <button
              className="petjs-btn petjs-btn-primary"
              onClick={() => {
                addItem(product, quantity);
                navigate("/cart");
              }}
            >
              Add to cart
            </button>
            <Link className="petjs-btn" to="/products">
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

