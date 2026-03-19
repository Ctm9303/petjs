import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { fetchProducts } from "../api";
import { useCart } from "../context/CartContext";
import Breadcrumb from "../Components/Breadcrumb";

import imgDogA from "../Assest/2.png";
import imgDogB from "../Assest/1.jpg";

function resolveImage(imageKey) {
  if (imageKey === "1.jpg") return imgDogB;
  return imgDogA;
}

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [items, setItems] = useState([]);

  const q = searchParams.get("q") || "";
  const sort = searchParams.get("sort") || "popular";

  const { addItem } = useCart();

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError("");
    fetchProducts({ q })
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
  }, [q]);

  const content = useMemo(() => {
    if (loading) return <p>Loading products...</p>;
    if (error) return <p style={{ color: "crimson" }}>Error: {error}</p>;
    if (!items.length) return <p>No products found.</p>;

    const sorted = [...items];
    if (sort === "price_asc") sorted.sort((a, b) => (String(a.fees).length || 0) - (String(b.fees).length || 0));
    if (sort === "price_desc") sorted.sort((a, b) => (String(b.fees).length || 0) - (String(a.fees).length || 0));

    return (
      <div className="wc-products-grid">
        {sorted.map((p) => (
          <div className="wc-product-card" key={p.id}>
            <Link to={`/products/${p.id}`} className="wc-product-img">
              <img src={resolveImage(p.imageKey)} alt={p.destTitle} />
            </Link>
            <div className="wc-product-body">
              <div className="wc-sku">ID#{p.id}</div>
              <Link to={`/products/${p.id}`} className="wc-product-name">
                {p.destTitle}
              </Link>
              <div className="wc-price">{p.fees}</div>
              <button className="wc-btn wc-btn-outline" onClick={() => addItem(p, 1)} type="button">
                Thêm vào giỏ
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }, [error, items, loading, addItem, sort]);

  return (
    <div className="petjs-page wc-page">
      <Breadcrumb current="Sản phẩm" />

      <div className="wc-products">
        <aside className="wc-sidebar">
          <div className="wc-widget">
            <div className="wc-widget-title">DANH MỤC SẢN PHẨM</div>
            <ul className="wc-cat">
              <li>Balo</li>
              <li>Cát vệ sinh</li>
              <li>Chuồng</li>
              <li>Phụ kiện</li>
              <li>Thực phẩm</li>
            </ul>
          </div>

          <div className="wc-widget">
            <div className="wc-widget-title">GIÁ</div>
            <div className="wc-muted">Demo filter (chưa nối dữ liệu)</div>
            <button className="wc-btn wc-btn-small wc-btn-outline" type="button">
              LỌC
            </button>
          </div>
        </aside>

        <main className="wc-products-main">
          <div className="wc-products-header">
            <h1 className="wc-title">SẢN PHẨM</h1>
            <div className="wc-tools">
              <div className="wc-tool">
                <span className="wc-muted">Sắp xếp:</span>
                <select
                  value={sort}
                  onChange={(e) => {
                    const sp = new URLSearchParams(searchParams);
                    sp.set("sort", e.target.value);
                    setSearchParams(sp, { replace: true });
                  }}
                >
                  <option value="popular">Sắp xếp theo độ phổ biến</option>
                  <option value="price_asc">Giá: thấp đến cao</option>
                  <option value="price_desc">Giá: cao đến thấp</option>
                </select>
              </div>
              <div className="wc-tool">
                <input
                  value={q}
                  placeholder="Tìm kiếm..."
                  onChange={(e) => {
                    const next = e.target.value;
                    const sp = new URLSearchParams(searchParams);
                    if (next) sp.set("q", next);
                    else sp.delete("q");
                    setSearchParams(sp, { replace: true });
                  }}
                />
              </div>
            </div>
          </div>
          {content}
        </main>
      </div>
    </div>
  );
}

