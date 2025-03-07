# ----- Backend -----
    FROM node:18 AS backend

    WORKDIR /app
    
    # Kopiere nur die package.json, um Caching zu optimieren
    COPY package.json package-lock.json ./
    RUN npm install --omit=dev
    
    # Kopiere den restlichen Code
    COPY . .
    
    # Exponiere den Port des Backends
    EXPOSE 3001
    
    # Starte den Backend-Server
    CMD ["node", "server.js"]
    