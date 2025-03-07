# ----- Frontend -----
    FROM node:18 AS frontend

    WORKDIR /app
    
    # Kopiere die package.json, um Caching zu optimieren
    COPY package.json package-lock.json ./
    RUN npm install --omit=dev
    
    # Kopiere den restlichen Frontend-Code
    COPY . .
    
    # Baue das Frontend (Erzeugt `/app/dist`)
    RUN npm run build
    
    # Exponiere den Frontend-Port
    EXPOSE 5173
    
    # Starte das Frontend (Vite Server mit --host)
    CMD ["npm", "run", "dev", "--", "--host"]
    