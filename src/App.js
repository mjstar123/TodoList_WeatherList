import { useState, useEffect } from "react";
import {Link, Outlet} from 'react-router-dom';
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import Filter from "./components/Filter";
import "./App.css";
import Time1 from "./picture/Time1.jpg";
import Time2 from "./picture/Time2.jpg";

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored) {
      setTodos(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const addTodo = (text) => {
    if (text.trim() === "") return;
    const newTodo = {
      id: Date.now(),
      text,
      done: false,
      createdAt: Date.now(),
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos
    .filter((t) =>
      filter === "done"
        ? t.done
        : filter === "notdone"
        ? !t.done
        : true
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.createdAt - b.createdAt
        : b.createdAt - a.createdAt
    );

  return (
    <div className="parent-container">
      <div>
        <img src={Time1} className="pic1" alt="no pic"></img>
      </div>
      <div className="app-container">
        <div className="horizontal">  
          <div className="weather">
            <Link to="/weather">weather</Link>
            <Outlet />
          </div>
          <div className="time">
            <h4>{now.toLocaleDateString()} <br />{now.toLocaleTimeString()}</h4>
          </div>
        </div>  
        <h1 className="app-title">Todo App</h1>
        <TodoInput onAdd={addTodo} />
        <Filter filter={filter} setFilter={setFilter} />
        <div className="sort-container">
          <button
            className="sort-button"
            onClick={() =>
              setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"))
            }
          >
            {sortOrder === "desc" ? "⬇️ 최신순" : "⬆️ 오래된 순"}
          </button>
        </div>
        <TodoList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} />
      </div>
      <div>
        <img src={Time2} className="pic2" alt="no pic"></img>
      </div>
    </div>
  );
}

export default App;