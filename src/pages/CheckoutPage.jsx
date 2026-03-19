import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createOrderV2 } from "../api";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import Breadcrumb from "../Components/Breadcrumb";

function moneyToNumber(v) {
  // "21.000.000₫" -> 21000000
  const digits = String(v || "").replace(/[^\d]/g, "");
  const n = Number(digits);
  return Number.isFinite(n) ? n : 0;
}

function formatVnd(n) {
  try {
    return new Intl.NumberFormat("vi-VN").format(n) + "₫";
  } catch {
    return `${n}₫`;
  }
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, clear } = useCart();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("Việt Nam");
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [shipToDifferent, setShipToDifferent] = useState(false);
  const [shipAddress, setShipAddress] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bank_transfer");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);

  const canSubmit = items.length > 0 && !submitting;

  const summary = useMemo(() => {
    const count = items.reduce((sum, x) => sum + (Number(x.quantity) || 0), 0);
    const subtotal = items.reduce((sum, x) => sum + moneyToNumber(x.product?.fees) * (Number(x.quantity) || 0), 0);
    return { count, subtotal, total: subtotal };
  }, [items]);

  return (
    <div className="petjs-page">
      <Breadcrumb current="Thanh toán" />
      <div className="petjs-page-header">
        <h2>Checkout</h2>
        <Link className="petjs-btn" to="/cart">
          Back to cart
        </Link>
      </div>

      {!items.length ? (
        <p>
          Cart is empty. <Link to="/products">Go shopping</Link>
        </p>
      ) : (
        <>
          <div className="petjs-checkout">
            <div className="petjs-panel">
              <h3 className="petjs-h3">Thông tin thanh toán</h3>

              <div className="petjs-grid-2">
                <div className="petjs-field">
                  <label>Tên *</label>
                  <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="petjs-field">
                  <label>Họ *</label>
                  <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
              </div>

              <div className="petjs-field">
                <label>Quốc gia *</label>
                <input value={country} onChange={(e) => setCountry(e.target.value)} />
              </div>

              <div className="petjs-field">
                <label>Địa chỉ *</label>
                <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Địa chỉ" />
              </div>

              <div className="petjs-field">
                <label>Mã bưu điện (tuỳ chọn)</label>
                <input value={postcode} onChange={(e) => setPostcode(e.target.value)} />
              </div>

              <div className="petjs-field">
                <label>Tỉnh / Thành phố *</label>
                <input value={city} onChange={(e) => setCity(e.target.value)} />
              </div>

              <div className="petjs-field">
                <label>Số điện thoại *</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>

              <div className="petjs-field">
                <label>Địa chỉ email *</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
              </div>
            </div>

            <div className="petjs-panel">
              <div className="petjs-row" style={{ justifyContent: "space-between", alignItems: "baseline" }}>
                <h3 className="petjs-h3">Đơn hàng của bạn</h3>
                <div className="petjs-muted">Items: {summary.count}</div>
              </div>

              <div className="petjs-order">
                <div className="petjs-order-head">
                  <div>Sản phẩm</div>
                  <div>Thành tiền</div>
                </div>
                {items.map((x) => {
                  const lineTotal = moneyToNumber(x.product?.fees) * (Number(x.quantity) || 0);
                  return (
                    <div className="petjs-order-row" key={x.product.id}>
                      <div className="petjs-order-name">
                        {x.product.destTitle} <span className="petjs-muted">× {x.quantity}</span>
                      </div>
                      <div className="petjs-order-price">{formatVnd(lineTotal)}</div>
                    </div>
                  );
                })}
                <div className="petjs-order-total">
                  <div className="petjs-muted">Tổng cộng</div>
                  <div className="petjs-order-price">{formatVnd(summary.total)}</div>
                </div>
              </div>

              <div className="petjs-divider" />

              <label className="petjs-checkbox">
                <input
                  type="checkbox"
                  checked={shipToDifferent}
                  onChange={(e) => setShipToDifferent(e.target.checked)}
                />
                Giao hàng tới địa chỉ khác?
              </label>

              {shipToDifferent ? (
                <div className="petjs-field" style={{ marginTop: 10 }}>
                  <label>Địa chỉ giao hàng</label>
                  <input value={shipAddress} onChange={(e) => setShipAddress(e.target.value)} placeholder="Địa chỉ giao hàng" />
                </div>
              ) : null}

              <div className="petjs-field" style={{ marginTop: 10 }}>
                <label>Ghi chú đơn hàng (tuỳ chọn)</label>
                <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Ghi chú..." rows={4} />
              </div>

              <div className="petjs-divider" />

              <div className="petjs-pay">
                <label className="petjs-radio">
                  <input
                    type="radio"
                    name="pay"
                    checked={paymentMethod === "bank_transfer"}
                    onChange={() => setPaymentMethod("bank_transfer")}
                  />
                  Chuyển khoản ngân hàng
                </label>
                {paymentMethod === "bank_transfer" ? (
                  <div className="petjs-pay-hint">
                    Thực hiện thanh toán vào ngay tài khoản ngân hàng của chúng tôi. Vui lòng sử dụng Mã đơn hàng trong phần
                    Nội dung thanh toán.
                  </div>
                ) : null}

                <label className="petjs-radio" style={{ marginTop: 8 }}>
                  <input
                    type="radio"
                    name="pay"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  Trả tiền mặt khi nhận hàng
                </label>
              </div>

              {error ? <div style={{ color: "crimson", marginTop: 10 }}>{error}</div> : null}
              {success ? (
                <div style={{ color: "seagreen", marginTop: 10 }}>
                  Đặt hàng thành công: <b>{success.orderId}</b>
                </div>
              ) : null}

              <button
                className="petjs-btn petjs-btn-primary"
                style={{ width: "100%", marginTop: 12 }}
                disabled={!canSubmit}
                onClick={async () => {
                  setError("");
                  setSuccess(null);

                  if (!firstName.trim() || !lastName.trim() || !address.trim() || !city.trim() || !phone.trim() || !email.trim()) {
                    setError("Vui lòng nhập đủ các trường bắt buộc (*)");
                    return;
                  }

                  setSubmitting(true);
                  try {
                    const result = await createOrderV2({
                      items: items.map((x) => ({ productId: x.product.id, quantity: x.quantity })),
                      customer: { firstName, lastName, email, phone },
                      shipping: shipToDifferent ? { address: shipAddress || address, city, country, postcode } : { address, city, country, postcode },
                      note,
                      paymentMethod,
                    });
                    setSuccess(result);
                    clear();
                    setTimeout(() => navigate("/products"), 900);
                  } catch (e) {
                    setError(e?.message || "CHECKOUT_FAILED");
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {submitting ? "Đang đặt hàng..." : "ĐẶT HÀNG"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

