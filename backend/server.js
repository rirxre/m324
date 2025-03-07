import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import TodoModel from "./models/todoList.js";

dotenv.config();
const app = express();

// 🌍 CORS-Fix: Erlaubt explizit bestimmte Domains + Header
app.use(cors({
    origin: ['http://localhost:5173', 'https://m324-1.onrender.com'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo:27017/todoapp";

// 🛠 Funktion zum Verbinden mit MongoDB mit automatischer Wiederverbindung
async function connectDB(retries = 5) {
    while (retries > 0) {
        try {
            await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
            console.log("✅ MongoDB connected successfully");
            return;
        } catch (error) {
            console.error(`❌ MongoDB connection error (${retries} retries left):`, error);
            retries--;
            await new Promise(res => setTimeout(res, 5000)); // 5 Sek. warten, bevor ein neuer Versuch unternommen wird
        }
    }
    console.error("❌ Could not connect to MongoDB after multiple retries. Exiting.");
    process.exit(1);
}
connectDB();

// ✅ **Health Check** (Test, ob der Server läuft)
app.get("/", (req, res) => {
    res.send("🚀 Backend API is running!");
});

// ✅ **Fehlersuche: Gibt ALLE gespeicherten Todos zurück**
app.get("/getTodoList", async (req, res) => {
    try {
        const todoList = await TodoModel.find({});
        console.log("📋 Todos aus der DB:", todoList); // Debug-Log
        res.json(todoList);
    } catch (err) {
        console.error("❌ Fehler beim Abrufen der Todos:", err);
        res.status(500).json({ error: err.message });
    }
});

// ✅ **Neues Todo hinzufügen**
app.post("/addTodoList", async (req, res) => {
    try {
        const { task, status, deadline } = req.body;

        if (!task || !status || !deadline) {
            return res.status(400).json({ error: "Alle Felder müssen ausgefüllt sein" });
        }

        const todo = await TodoModel.create(req.body);
        console.log("✅ Neue Aufgabe gespeichert:", todo);
        res.status(201).json(todo);
    } catch (err) {
        console.error("❌ Fehler beim Speichern einer Aufgabe:", err);
        res.status(500).json({ error: err.message });
    }
});

// ✅ **Ein Todo bearbeiten**
app.put("/updateTodoList/:id", async (req, res) => {
    try {
        const updatedTask = await TodoModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ error: "Aufgabe nicht gefunden" });
        }

        console.log("✏️ Aufgabe aktualisiert:", updatedTask);
        res.json(updatedTask);
    } catch (err) {
        console.error("❌ Fehler beim Aktualisieren:", err);
        res.status(500).json({ error: err.message });
    }
});

// ✅ **Ein Todo löschen**
app.delete("/deleteTodoList/:id", async (req, res) => {
    try {
        const deletedTask = await TodoModel.findByIdAndDelete(req.params.id);

        if (!deletedTask) {
            return res.status(404).json({ error: "Aufgabe nicht gefunden" });
        }

        console.log("🗑️ Aufgabe gelöscht:", deletedTask);
        res.json({ message: "Aufgabe erfolgreich gelöscht" });
    } catch (err) {
        console.error("❌ Fehler beim Löschen:", err);
        res.status(500).json({ error: err.message });
    }
});

// ✅ **404 Route für ungültige Anfragen**
app.use((req, res) => {
    res.status(404).json({ error: "Route nicht gefunden" });
});

// 🔥 **Server starten**
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
