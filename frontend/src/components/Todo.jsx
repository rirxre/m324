import axios from "axios";
import React, { useEffect, useState } from "react";

function Todo() {
    const [todoList, setTodoList] = useState([]);
    const [editableId, setEditableId] = useState(null);
    const [editedTask, setEditedTask] = useState("");
    const [editedStatus, setEditedStatus] = useState("");
    const [newTask, setNewTask] = useState("");
    const [newStatus, setNewStatus] = useState("");
    const [newDeadline, setNewDeadline] = useState("");
    const [editedDeadline, setEditedDeadline] = useState("");

    useEffect(() => {
        axios.get('http://127.0.0.1:3001/getTodoList')
            .then(result => {
                setTodoList(result.data);
            })
            .catch(err => console.log(err));
    }, []);

    // ✅ addTask-Funktion wieder korrekt hinzugefügt
    const addTask = (e) => {
        e.preventDefault();
        if (!newTask || !newStatus || !newDeadline) {
            alert("All fields must be filled out.");
            return;
        }

        axios.post('http://127.0.0.1:3001/addTodoList', { task: newTask, status: newStatus, deadline: newDeadline })
            .then(() => {
                window.location.reload();
            })
            .catch(err => console.log(err));
    };

    // ✅ saveEditedTask-Funktion geprüft und wieder hinzugefügt
    const saveEditedTask = (id) => {
        if (!editedTask || !editedStatus || !editedDeadline) {
            alert("All fields must be filled out.");
            return;
        }

        axios.put(`http://127.0.0.1:3001/updateTodoList/${id}`, {
            task: editedTask,
            status: editedStatus,
            deadline: editedDeadline,
        })
            .then(() => {
                setEditableId(null);
                window.location.reload();
            })
            .catch(err => console.log(err));
    };

    // ✅ deleteTask-Funktion wieder hinzugefügt
    const deleteTask = (id) => {
        axios.delete(`http://127.0.0.1:3001/deleteTodoList/${id}`)
            .then(() => {
                window.location.reload();
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="container mt-5">
            <div className="row">
                {/* Linke Seite - Todo List */}
                <div className="col-md-7">
                    <h2 className="text-center">Todo List</h2>
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead className="table-primary">
                                <tr>
                                    <th>Task</th>
                                    <th>Status</th>
                                    <th>Deadline</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {todoList.map((data) => (
                                    <tr key={data._id}>
                                        <td>
                                            {editableId === data._id ? (
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={editedTask}
                                                    onChange={(e) => setEditedTask(e.target.value)}
                                                />
                                            ) : (
                                                data.task
                                            )}
                                        </td>
                                        <td>
                                            {editableId === data._id ? (
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={editedStatus}
                                                    onChange={(e) => setEditedStatus(e.target.value)}
                                                />
                                            ) : (
                                                data.status
                                            )}
                                        </td>
                                        <td>
                                            {editableId === data._id ? (
                                                <input
                                                    type="datetime-local"
                                                    className="form-control"
                                                    value={editedDeadline}
                                                    onChange={(e) => setEditedDeadline(e.target.value)}
                                                />
                                            ) : (
                                                new Date(data.deadline).toLocaleString()
                                            )}
                                        </td>
                                        <td>
                                            {editableId === data._id ? (
                                                <>
                                                    <button className="btn btn-success btn-sm" onClick={() => saveEditedTask(data._id)}>Save</button>
                                                    <button className="btn btn-secondary btn-sm" onClick={() => setEditableId(null)}>Cancel</button>
                                                </>
                                            ) : (
                                                <>
                                                    <button className="btn btn-primary btn-sm" onClick={() => setEditableId(data._id)}>Edit</button>
                                                    <button className="btn btn-danger btn-sm" onClick={() => deleteTask(data._id)}>Delete</button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Rechte Seite - Add Task */}
                <div className="col-md-5">
                    <h2 className="text-center">Add Task</h2>
                    <div className="card p-4 bg-light">
                        <form onSubmit={addTask}>
                            <div className="mb-3">
                                <label>Task</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Enter Task"
                                    value={newTask}
                                    onChange={(e) => setNewTask(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label>Status</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Enter Status"
                                    value={newStatus}
                                    onChange={(e) => setNewStatus(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label>Deadline</label>
                                <input
                                    className="form-control"
                                    type="datetime-local"
                                    value={newDeadline}
                                    onChange={(e) => setNewDeadline(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-success btn-sm">
                                Add Task
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Todo;
