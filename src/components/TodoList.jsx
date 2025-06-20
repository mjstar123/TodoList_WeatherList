import "./TodoList.css";

function TodoList({ todos, onToggle, onDelete }) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className="todo-item">
          <span
            onClick={() => onToggle(todo.id)}
            className={`todo-text ${todo.done ? "done" : ""}`}
          >
            {todo.text}
          </span>
          <button onClick={() => onDelete(todo.id)} className="delete-button">
            삭제
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
