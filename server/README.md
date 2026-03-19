# PetJS Backend (Node.js + Express)

## Requirements
- Node.js 18+ (khuyến nghị 20+)

## Setup
```bash
cd server
npm install
```

## Run
### Dev (Node watch)
```bash
cd server
npm run dev
```

### Prod
```bash
cd server
npm start
```

## Environment
Copy `.env.example` thành `.env` nếu cần:
```bash
PORT=5000
CORS_ORIGIN=http://localhost:3000
```

## API
- `GET /api/health`
- `GET /api/products?q=<name>&location=<country>`
- `GET /api/products/:id`
- `POST /api/orders`
  - body JSON: `{ "productId": 1, "quantity": 1, "email": "a@b.com" }`

