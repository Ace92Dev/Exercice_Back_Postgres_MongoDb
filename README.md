# Exercice 2 — API Todolist (Express, JS)

API REST minimaliste pour gérer une liste de tâches (ajout, suppression, affichage) avec Express en architecture MVC.

## Prérequis
- Node.js >= 18

## Installation
```
npm install
```

## Lancement
- Développement (rechargement auto) :
```
npm run dev
```
- Production :
```
npm start
```

Par défaut, le serveur écoute sur le port `3000`. Vous pouvez changer le port via un fichier `.env` à la racine :
```
PORT=3000
```

## Endpoints
Base URL: `http://localhost:3000`

- GET `/api/tasks`
  - Affiche toutes les tâches.
- POST `/api/tasks`
  - Ajoute une tâche.
  - Corps (JSON): `{ "title": "Nom de la tâche" }`
- DELETE `/api/tasks/:id`
  - Supprime la tâche par `id`.

### Exemples (curl)
```
# Lister les tâches
curl -s http://localhost:3000/api/tasks

# Ajouter une tâche
curl -s -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Acheter du lait"}'

# Supprimer une tâche (ex: id=1)
curl -s -X DELETE http://localhost:3000/api/tasks/1
```

> Remarque: Les données sont conservées en mémoire uniquement (pas de base de données). Un redémarrage du serveur réinitialise la liste.

## Architecture (MVC)
```
Exercice2-Back/
├─ server.js                 # Point d'entrée Express
└─ src/
   ├─ models/
   │  └─ taskModel.js        # Logique et stockage en mémoire
   ├─ controllers/
   │  └─ taskController.js   # Validation et réponses HTTP
   └─ routes/
      └─ taskRoutes.js       # Définition des routes Express
```

## Scripts npm
- `start`: démarre le serveur (`node server.js`)
- `dev`: démarre avec rechargement (`nodemon server.js`)

## CORS et JSON
- CORS activé pour faciliter les appels depuis un front.
- Le corps des requêtes doit être en JSON pour `POST /api/tasks`.

