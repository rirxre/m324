import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = import.meta.env.VITE_BACKEND_URL;

function Todo() {
  const [todoList, setTodoList] = useState([]);
  const [editableId, setEditableId] = useState(null);
  const [editedTask, setEditedTask] = useState("");
  const [editedStatus, setEditedStatus] = useState("");
  const [newTask, setNewTask] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [newDeadline, setNewDeadline] = useState("");
  const [editedDeadline, setEditedDeadline] = useState("");

  const statusOptions = [
    { label: "Offen", value: "open" },
    { label: "In Bearbeitung", value: "in progress" },
    { label: "Erledigt", value: "done" }
  ];

  useEffect(() => {
    axios
      .get(`${API_URL}/getTodoList`)
      .then((result) => {
        setTodoList(result.data);
      })
      .catch((err) => {
        console.error("Fehler beim Laden der ToDo-Liste:", err);
        toast.error("Fehler beim Laden der ToDo-Liste!");
      });
  }, []);

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask || !newStatus || !newDeadline) {
      toast.error("Alle Felder müssen ausgefüllt sein!");
      return;
    }

    axios
      .post(`${API_URL}/addTodoList`, { task: newTask, status: newStatus, deadline: newDeadline })
      .then(() => {
        toast.success("Aufgabe erfolgreich hinzugefügt!");
        setTimeout(() => window.location.reload(), 1000);
      })
      .catch((err) => {
        console.error("Fehler beim Hinzufügen:", err);
        toast.error("Fehler beim Hinzufügen der Aufgabe!");
      });
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <div className="row">
        <div className="col-md-7">
          <h2 className="text-center">ToDo Liste</h2>
          <div className="table-responsive">
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
                {todoList.map((data) => (
                  <tr key={data._id}>
                    <td>{data.task}</td>
                    <td>{statusOptions.find((option) => option.value === data.status)?.label || data.status}</td>
                    <td>{new Date(data.deadline).toLocaleString()}</td>
                    <td>
                      <button className="btn btn-danger btn-sm">Löschen</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

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
