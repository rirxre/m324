import TodoModel from "../models/todoList.js";
import mongoose from "mongoose";
import { Types } from "mongoose";

// Verbindung zur Test-Datenbank herstellen
beforeAll(async () => {
  const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/testDB";
  await mongoose.connect(mongoURI);
}, 20000); // Setzt das Timeout für `beforeAll`


// 1
test(
  "Eine neue Aufgabe sollte gespeichert werden",
  async () => {
    const todo = new TodoModel({ task: "Test Aufgabe", status: "open", deadline: "2025-03-10" });
    const savedTodo = await todo.save();

    expect(savedTodo.task).toBe("Test Aufgabe");
    expect(savedTodo.status).toBe("open");
  },
  20000
); // Timeout für den Test erhöhen


// 2
test(
  "Eine gespeicherte Aufgabe sollte abrufbar sein",
  async () => {
    const todo = new TodoModel({ task: "Abruf-Test", status: "open", deadline: "2025-03-11" });
    await todo.save();

    const foundTodo = await TodoModel.findOne({ task: "Abruf-Test" });
    expect(foundTodo).not.toBeNull();
    expect(foundTodo.task).toBe("Abruf-Test");
  },
  20000
);


// 3
test(
  "Eine Aufgabe sollte bearbeitet werden können",
  async () => {
    const todo = new TodoModel({ task: "Update-Test", status: "open", deadline: "2025-03-12" });
    const savedTodo = await todo.save();

    savedTodo.status = "done";
    const updatedTodo = await savedTodo.save();

    expect(updatedTodo.status).toBe("done");
  },
  20000
);


// 4
test("Eine Aufgabe sollte gelöscht werden können", async () => {
  const todo = new TodoModel({ task: "Lösch-Test", status: "open", deadline: "2025-03-13" });
  const savedTodo = await todo.save();

  await TodoModel.findByIdAndDelete(savedTodo._id);

  const foundTodo = await TodoModel.findById(savedTodo._id);
  expect(foundTodo).toBeNull();
});


// 5
test("Eine Aufgabe ohne Pflichtfelder sollte nicht gespeichert werden", async () => {
  const invalidTodo = new TodoModel({}); // Keine Daten übergeben
  let error = null;
  try {
    await invalidTodo.save();
  } catch (err) {
    error = err;
  }
  expect(error).not.toBeNull();
});


// 6
test("Mehrere gespeicherte Aufgaben sollten abrufbar sein", async () => {
  await TodoModel.insertMany([
    { task: "Task 1", status: "open", deadline: "2025-03-14" },
    { task: "Task 2", status: "done", deadline: "2025-03-15" }
  ]);

  const todos = await TodoModel.find({});
  expect(todos.length).toBeGreaterThanOrEqual(2);
});


// 7
test("Eine nicht existierende Aufgabe kann nicht aktualisiert werden", async () => {
  const nonExistentId = new Types.ObjectId();
  const updatedTodo = await TodoModel.findByIdAndUpdate(
    nonExistentId,
    { status: "done" },
    { new: true }
  );
  expect(updatedTodo).toBeNull();
});


// 8
test("Eine Aufgabe mit ungültigem Feld sollte nicht gespeichert werden", async () => {
  const invalidTodo = new TodoModel({ task: "Invalid", status: "unknown" }); // Status darf nur "open" oder "done" sein
  let error = null;
  try {
    await invalidTodo.save();
  } catch (err) {
    error = err;
  }
  expect(error).not.toBeNull();
});


// 9
test("Alle Aufgaben sollten gelöscht werden können", async () => {
  await TodoModel.deleteMany({});
  const todos = await TodoModel.find({});
  expect(todos.length).toBe(0);
});


// 10
test("Die Aufgabenliste sollte am Anfang leer sein", async () => {
  await TodoModel.deleteMany({});
  const todos = await TodoModel.find({});
  expect(todos.length).toBe(0);
});


// Verbindung zur Test-Datenbank schließen**
afterAll(async () => {
  await mongoose.connection.close();
}, 20000);
