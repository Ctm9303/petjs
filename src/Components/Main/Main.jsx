import React, { useEffect, useState } from 'react';
import './main.scss';
import { GoLocation } from "react-icons/go";
import { IoMdCart } from "react-icons/io";
import img from '../../Assest/2.png';
import img2 from '../../Assest/1.jpg';
import { Link } from "react-router-dom";
import { fetchProducts } from "../../api";
import { useCart } from "../../context/CartContext";

function resolveImage(imageKey) {
  if (imageKey === "1.jpg") return img2;
  return img;
}

const Main = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addItem } = useCart();

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError("");
    fetchProducts()
      .then((data) => {
        if (!alive) return;
        setItems(data.items || []);
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
  }, []);

  return (
    <section className='main container section'>
      <div className="secTitle">
        <h3 className="title">
          Products
        </h3>
      </div>
      <div className="secContent">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "crimson" }}>Error: {error}</p>
        ) : (
          items.map(({ id, imageKey, destTitle, location, fees, description }) => (
            <div key={id} className="card">
              <div className="card__img">
                <img src={resolveImage(imageKey)} alt={destTitle} />
              </div>
              <div className="card__body">
                <div className="card__top">
                  <h4 className="card__title">{destTitle}</h4>
                  <span className="card__location">
                    <GoLocation className="icon" />
                    {location}
                  </span>
                </div>
                <p className="card__desc">{description}</p>
                <div className="card__bottom">
                  <span className="card__price">{fees}</span>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Link className="card__btn" to={`/products/${id}`}>
                      <IoMdCart className="icon" /> Details
                    </Link>
                    <button className="card__btn" type="button" onClick={() => addItem({ id, imageKey, destTitle, location, fees, description }, 1)}>
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Main;