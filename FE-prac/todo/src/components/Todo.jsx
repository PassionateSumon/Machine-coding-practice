import React, { useState } from "react";

const Todo = () => {
  const [ip, setIp] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [todos, setTodos] = useState([
    {
      id: crypto.randomUUID(),
      data: "hey there!!",
      done: false,
    },
  ]);

  const handleChange = (e) => {
    setIp(e.target.value);
  };

  const saveFormat = (text) => {
    return {
      id: crypto.randomUUID(),
      data: text,
      done: false,
    };
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (ip.length > 0) {
        setTodos((prev) => [...prev, saveFormat(ip.trim())]);
        setIp("");
      }
    }
  };
  const handleClick = () => {
    if (ip.length > 0) {
      setTodos((prev) => [...prev, saveFormat(ip.trim())]);
      setIp("");
    }
  };

  const handleChecked = (id) => {
    setTodos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, done: !p.done } : p))
    );
  };

  const handleEdit = (id, text) => {
    setTodos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, data: text } : p))
    );
    setEditId(null);
  };

  const handleRemove = (id) => {
    setTodos((prev) => prev.filter((p) => p.id !== id));
  };

  // console.log(todos);

  return (
    <div>
      {/* Create input & Button section */}
      <div className="ip-wrap">
        <input
          type="text"
          className="ip"
          value={ip}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button className="btn" onClick={handleClick}>
          Create
        </button>
      </div>

      {/* List the all todos with edit and delete button */}
      <div>
        {todos.map((todo) => (
          <div key={todo.id} className="todo-list-wrap">
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => handleChecked(todo.id)}
            />
            {editId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  className="todo-edit-input"
                  onChange={(e) => setEditText(e.target.value)}
                  autoFocus
                />
                <button
                  className="todo-edit-btn"
                  onClick={() => handleEdit(todo.id, editText.trim())}
                >
                  Save
                </button>
                <button
                  className="todo-edit-btn"
                  onClick={() => setEditId(null)}
                >
                  Cancle
                </button>
              </>
            ) : (
              <div className={`todo-text ${todo.done ? "done" : ""}`}>
                {todo.data}
                <button
                  className="todo-btn"
                  onClick={() => {
                    if (!todo.done) {
                      setEditId(todo.id);
                      setEditText(todo.data);
                    } else {
                      alert("already done...");
                    }
                  }}
                >
                  ✏️
                </button>
                <button
                  className="todo-btn"
                  onClick={() => handleRemove(todo.id)}
                >
                  ❌
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
