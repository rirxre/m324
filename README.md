# 📝 ToDo List App

Dieses Projekt ist eine einfache **ToDo List Webanwendung**, die mit **React (Frontend), Express.js (Backend) und MongoDB (Datenbank)** erstellt wurde.  
Das Projekt unterstützt **Docker** für eine einfache Bereitstellung und verfügt über eine **CI/CD Pipeline mit GitHub Actions**, um automatisiert Tests und Deployments durchzuführen.

## Features
- Aufgaben hinzufügen, bearbeiten und löschen
- Status für Aufgaben verwalten (Offen, In Bearbeitung, Erledigt)
- Responsive Design mit **Bootstrap**
- **MongoDB** als Datenbank
- **Docker-Unterstützung**
- **CI/CD Pipeline mit GitHub Actions**

---

## Projektstruktur
```sh
M324_Todo-List 
├── backend # Express.js Backend 
│ ├── server.js # Hauptserver mit API-Routen 
│ ├── models/todoList.js # Mongoose Modell für die ToDos 
│ ├── .env # Umgebungsvariablen für Backend 
│ ├── Dockerfile # Docker Setup für Backend 
│ ├── package.json # Abhängigkeiten & Skripte (Backend) 
│ ├── package-lock.json # Abhängigkeiten (gesperrte Versionen) 
│ └── node_modules # Installierte npm-Abhängigkeiten 
├── frontend # React Frontend (Vite) 
│ ├── src/Todo.jsx # Hauptkomponente der ToDo-App 
│ ├── .env # Umgebungsvariablen für Frontend 
│ ├── Dockerfile # Docker Setup für Frontend 
│ ├── package.json # Abhängigkeiten & Skripte (Frontend) 
│ ├── package-lock.json # Abhängigkeiten (gesperrte Versionen) 
│ └── node_modules # Installierte npm-Abhängigkeiten 
├── docker-compose.yml # Docker-Konfiguration für das Projekt 
├── deploy.yml # GitHub Actions CI/CD Pipeline 
└── README.md # Diese Dokumentation
```

## Verwendete Technologien & Tools

| Technologie    | Beschreibung |
|---------------|-------------|
| **React.js**  | Frontend für die Benutzeroberfläche |
| **Express.js**| Backend-Server für die API |
| **MongoDB**   | Datenbank zur Speicherung der Aufgaben |
| **Docker**    | Containerisierung der Anwendung |
| **GitHub Actions** | Automatisierte Tests & Deployment |
| **Render**    | Cloud-Hosting für Frontend & Backend |
| **Bootstrap** | Styling für das Frontend |


## Installation & Start (Lokal)

### Voraussetzungen:
- Docker
- Node.js
- Git

### 1️ Repository klonen:
```sh
git clone https://github.com/rirxre/m324.git
cd m324
```


### 2 Dateien anlegen:
Erstelle **Backend .env Datei (`backend/.env`):**
```env
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/todoapp
JWT_SECRET=geheimes_passwort
FRONTEND_URL=http://localhost:5173
PORT=3001
```

Erstelle eine .env Datei für das Frontend (frontend/.env):
```env
VITE_BACKEND_URL=http://localhost:3001
```

### 3 Docker-Container starten:
```sh
docker-compose up --build -d
```

Danach ist die App erreichbar unter:

- Frontend: http://localhost:5173
- Backend: http://localhost:3001



## Deployment auf Render
Das Projekt wird automatisch bei Push auf main mit GitHub Actions deployed.

- **Backend Deployment**
  - **Platform:** Render
  - **Service:** [Backend auf Render](https://m324.onrender.com)

- **Frontend Deployment**
  - **Platform:** Render
  - **Service:** [Frontend auf Render](https://m324-1.onrender.com)



## CI/CD & Deployment
Das Projekt verwendet GitHub Actions für eine automatisierte CI/CD Pipeline, die folgende Schritte umfasst:

1. Linting & Tests
- Prüft Code-Qualität mit ESLint
- Führt Unit-Tests aus (falls vorhanden)

2. Build-Prozess
- Baut das React-Frontend

3. Deployment zu Render
- Backend wird auf Render.com deployed
- Frontend wird auf Render.com deployed

Die Pipeline wird automatisch bei jedem Push in den main Branch ausgeführt.
Datei: [.github/workflows/deploy.yml](.github/workflows/deploy.yml)



## Docker
Falls du Docker nutzt, kannst du das Projekt mit Docker Compose starten.

#### Docker-Container hochfahren:
```sh
docker-compose up --build -d
```
Dadurch werden alle Services (Frontend, Backend, MongoDB) in Containern gestartet.

#### Docker-Container stoppen:
```sh
docker-compose down
```


## API-Endpunkte (Backend)
| Methode  | Endpunkt                 | Beschreibung                  |
|----------|--------------------------|-------------------------------|
| **GET**  | `/getTodoList`           | Alle ToDos abrufen            |
| **POST** | `/addTodoList`           | Neues ToDo hinzufügen         |
| **PUT**  | `/updateTodoList/:id`    | ToDo bearbeiten               |
| **DELETE** | `/deleteTodoList/:id`  | ToDo löschen                  |


## Autorinnen
- Ceren Durukan
- Rina Rexhepi
#### Github:
- https://github.com/rirxre/m324.git


