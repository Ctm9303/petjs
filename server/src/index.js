const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const { products } = require("./data/products");

dotenv.config();

const app = express();

const port = Number(process.env.PORT || 5000);
// Dev-friendly CORS: reflect request origin (works for localhost:3000/3001/etc.)
// If you want to lock this down, set a strict allowlist instead.
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "petjs-backend", time: new Date().toISOString() });
});

app.get("/api/products", (req, res) => {
  const q = String(req.query.q || "").trim().toLowerCase();
  const location = String(req.query.location || "").trim().toLowerCase();

  let result = products;
  if (q) {
    result = result.filter((p) => p.destTitle.toLowerCase().includes(q));
  }
  if (location) {
    result = result.filter((p) => p.location.toLowerCase().includes(location));
  }

  res.json({ items: result, total: result.length });
});

app.get("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);
  if (!product) return res.status(404).json({ error: "PRODUCT_NOT_FOUND" });
  res.json(product);
});

// Placeholder endpoint for "BUY NOW" / cart action
app.post("/api/orders", (req, res) => {
  const body = req.body || {};

  // V2: accepts items[]
  if (Array.isArray(body.items)) {
    const items = body.items
      .map((x) => ({
        productId: Number(x?.productId),
        quantity: Number(x?.quantity || 1),
      }))
      .filter((x) => Number.isFinite(x.productId));

    if (!items.length) return res.status(400).json({ error: "INVALID_ITEMS" });
    if (items.some((x) => !Number.isFinite(x.quantity) || x.quantity <= 0))
      return res.status(400).json({ error: "INVALID_QUANTITY" });

    const lines = items.map((x) => {
      const product = products.find((p) => p.id === x.productId);
      return { product, ...x };
    });

    if (lines.some((l) => !l.product)) return res.status(404).json({ error: "PRODUCT_NOT_FOUND" });

    return res.status(201).json({
      orderId: `ord_${Date.now()}`,
      status: "created",
      customer: body.customer || null,
      shipping: body.shipping || null,
      note: body.note ? String(body.note) : "",
      paymentMethod: body.paymentMethod || "bank_transfer",
      items: lines.map((l) => ({ product: l.product, quantity: l.quantity })),
    });
  }

  // V1 fallback: single item
  const { productId, quantity, email } = body;
  const id = Number(productId);
  const qty = Number(quantity || 1);

  if (!Number.isFinite(id)) return res.status(400).json({ error: "INVALID_PRODUCT_ID" });
  if (!Number.isFinite(qty) || qty <= 0) return res.status(400).json({ error: "INVALID_QUANTITY" });

  const product = products.find((p) => p.id === id);
  if (!product) return res.status(404).json({ error: "PRODUCT_NOT_FOUND" });

  return res.status(201).json({
    orderId: `ord_${Date.now()}`,
    product,
    quantity: qty,
    email: email ? String(email) : null,
    status: "created",
  });
});

function startServer(preferredPort) {
  const server = app.listen(preferredPort, () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on http://localhost:${preferredPort}`);
  });

  server.on("error", (err) => {
    if (err && err.code === "EADDRINUSE") {
      const next = preferredPort + 1;
      // eslint-disable-next-line no-console
      console.log(`Port ${preferredPort} is in use. Trying ${next}...`);
      setTimeout(() => startServer(next), 150);
      return;
    }
    throw err;
  });
}

startServer(port);

