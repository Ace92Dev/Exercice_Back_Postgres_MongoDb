# StockLink Pro API

API Express sécurisée, avec authentification JWT, rôles, validation, Swagger et tests.

## Lancement

1. Installe les dépendances: `npm install`
2. Configure `.env` (exemple dans `.env.example`):
   - `POSTGRES_URL` (ex: `postgres://postgres:postgres@localhost:5432/stocklink`)
   - `JWT_SECRET` (génère avec: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
   - `JWT_EXPIRES_IN` (ex: `1h`)
3. Démarre: `npm run dev`

Swagger: http://localhost:3000/docs

## Sécurité
- CORS restreint à `http://localhost:3000`
- Rate limit: 100 requêtes / 15 minutes par IP
- Validation via `express-validator`

## Authentification et rôles
- Enregistrement: `POST /auth/register` (username, password, role optionnel)
- Connexion: `POST /auth/login` (retourne JWT contenant `id`, `username`, `role`)
- Middlewares: `requireAuth`, `isAdmin`

## Routes et protection
- GET `/products` — Public
- POST `/products` — Authentifié
- PUT `/products/:id` — Authentifié
- DELETE `/products/:id` — Admin uniquement
- GET `/movements` — Public
- POST `/movements` — Authentifié
- GET `/warehouses` — Public
- POST `/warehouses` — Authentifié
- GET `/warehouses/:id/locations` — Public
- POST `/warehouses/:id/locations` — Authentifié
- PUT `/warehouses/:id/locations` — Authentifié

## Tests
- Lancer: `npm test`
- Unitaires: `tests/unit/stockService.test.js` (règles stock IN/OUT)
- Intégration: `tests/integration/auth.test.js` (login)

![Image de swagger](image.png)