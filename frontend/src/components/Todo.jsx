import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// API_URL mit Fallback auf localhost setzen
//const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";
const API_URL = typeof import.meta !== "undefined" ? import.meta.env.VITE_BACKEND_URL : process.env.VITE_BACKEND_URL || "http://localhost:3001";


function Todo() {
  const [todoList, setTodoList] = useState([]);
  const [editableId, setEditableId] = useState(null);
  const [editedTask, setEditedTask] = useState("");
  const [editedStatus, setEditedStatus] = useState("");
  const [editedDeadline, setEditedDeadline] = useState("");
  const [newTask, setNewTask] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [newDeadline, setNewDeadline] = useState("");

  const statusOptions = [
    { label: "Offen", value: "open" },
    { label: "In Bearbeitung", value: "in progress" },
    { label: "Erledigt", value: "done" }
  ];

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const result = await axios.get(`${API_URL}/getTodoList`);
      setTodoList(result.data);
    } catch (err) {
      console.error("Fehler beim Laden der ToDo-Liste:", err.response || err.message);
      toast.error("Fehler beim Laden der ToDo-Liste!");
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask || !newStatus || !newDeadline) {
      toast.error("Alle Felder müssen ausgefüllt sein!");
      return;
    }

    try {
      await axios.post(`${API_URL}/addTodoList`, { task: newTask, status: newStatus, deadline: newDeadline });
      toast.success("Aufgabe erfolgreich hinzugefügt!");
      fetchTasks();
      setNewTask("");
      setNewStatus("");
      setNewDeadline("");
    } catch (err) {
      console.error("Fehler beim Hinzufügen:", err.response || err.message);
      toast.error("Fehler beim Hinzufügen der Aufgabe!");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/deleteTodoList/${id}`);
      toast.success("Aufgabe gelöscht!");
      fetchTasks();
    } catch (err) {
      console.error("Fehler beim Löschen:", err.response || err.message);
      toast.error("Fehler beim Löschen der Aufgabe!");
    }
  };

  const editTask = (task) => {
    setEditableId(task._id);
    setEditedTask(task.task);
    setEditedStatus(task.status);
    setEditedDeadline(task.deadline ? new Date(task.deadline).toISOString().slice(0, 16) : "");
  };

  const saveTask = async (id) => {
    try {
      await axios.put(`${API_URL}/updateTodoList/${id}`, { task: editedTask, status: editedStatus, deadline: editedDeadline });
      toast.success("Aufgabe aktualisiert!");
      setEditableId(null);
      fetchTasks();
    } catch (err) {
      console.error("Fehler beim Aktualisieren:", err.response || err.message);
      toast.error("Fehler beim Aktualisieren der Aufgabe!");
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <div className="row">
        {/* 📝 ToDo Liste */}
        <div className="col-md-7">
          <h2 className="text-center">ToDo Liste</h2>
          <table className="table table-bordered">
            <thead className="table-primary">
              <tr>
                <th>Aufgabe</th>
                <th>Status</th>
                <th>Fällig bis</th>
                <th>Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {todoList.map((task) => (
                <tr key={task._id}>
                  <td>
                    {editableId === task._id ? (
                      <input className="form-control" type="text" value={editedTask} onChange={(e) => setEditedTask(e.target.value)} />
                    ) : (
                      task.task
                    )}
                  </td>
                  <td>
                    {editableId === task._id ? (
                      <select className="form-control" value={editedStatus} onChange={(e) => setEditedStatus(e.target.value)}>
                        {statusOptions.map((option) => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    ) : (
                      statusOptions.find((option) => option.value === task.status)?.label || task.status
                    )}
                  </td>
                  <td>{task.deadline ? new Date(task.deadline).toLocaleString() : "Kein Datum"}</td>
                  <td>
                    {editableId === task._id ? (
                      <button className="btn btn-success btn-sm" onClick={() => saveTask(task._id)}>Speichern</button>
                    ) : (
                      <>
                        <button className="btn btn-primary btn-sm me-1" onClick={() => editTask(task)}>Bearbeiten</button>
                        <button className="btn btn-danger btn-sm" onClick={() => deleteTask(task._id)}>Löschen</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ➕ Neue Aufgabe Hinzufügen */}
        <div className="col-md-5">
          <h2 className="text-center">Neue Aufgabe</h2>
          <div className="card p-4 bg-light">
            <form onSubmit={addTask}>
              <div className="mb-3">
                <label>Aufgabe</label>
                <input className="form-control" type="text" placeholder="Aufgabe eingeben" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
              </div>
              <div className="mb-3">
                <label>Status</label>
                <select className="form-control" value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                  <option value="">Status auswählen</option>
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label>Fällig bis</label>
                <input className="form-control" type="datetime-local" value={newDeadline} onChange={(e) => setNewDeadline(e.target.value)} />
              </div>
              <button type="submit" className="btn btn-success btn-sm">Aufgabe hinzufügen</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
