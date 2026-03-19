import React, { useState } from "react";
import Breadcrumb from "../Components/Breadcrumb";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="petjs-page wc-page">
      <Breadcrumb current="Contact" />
      <h1 className="wc-title">CONTACT</h1>

      <div className="wc-contact-map">
        <iframe
          title="Map"
          src="https://www.google.com/maps?q=168%20Th%C6%B0%E1%BB%A3ng%20%C4%90%C3%ACnh%20Thanh%20Xu%C3%A2n%20H%C3%A0%20N%E1%BB%99i&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div className="wc-contact-info">
        <div className="wc-contact-info-row">
          <div className="wc-contact-info-col">
            <div className="wc-contact-label">ĐỊA CHỈ 1 :</div>
            <div>Số 168 Thượng Đình – Thanh Xuân – Hà Nội</div>
            <div className="wc-contact-label" style={{ marginTop: 14 }}>
              ĐỊA CHỈ 2 :
            </div>
            <div>294–296 Đồng Đen – Quận Tân Bình – Hồ Chí Minh</div>
          </div>
          <div className="wc-contact-info-col">
            <div className="wc-contact-label">ĐIỆN THOẠI:</div>
            <div>0939.86.36.96</div>
            <div className="wc-contact-label" style={{ marginTop: 14 }}>
              EMAIL:
            </div>
            <div>matpetfamily2011@gmail.com</div>
          </div>
        </div>
      </div>

      <h3 className="wc-subtitle">CONTACT FORM</h3>
      <div className="wc-contact-form">
        <div className="wc-form-field">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name*" />
        </div>
        <div className="wc-form-field">
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email*" />
        </div>
        <div className="wc-form-field">
          <textarea
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message*"
          />
        </div>
        {sent ? <div className="wc-success">Đã gửi (demo).</div> : null}
        <button
          className="wc-btn"
          type="button"
          onClick={() => {
            setSent(true);
            setTimeout(() => setSent(false), 1500);
          }}
        >
          POST COMMENT
        </button>
      </div>
    </div>
  );
}

