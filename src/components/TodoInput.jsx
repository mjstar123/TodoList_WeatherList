import { useState } from "react";
import "./TodoInput.css";

function TodoInput({ onAdd }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="todo-input"
        placeholder="할 일을 입력하세요"
      />
      <button type="submit" className="todo-button">
        추가
      </button>
    </form>
  );
}

export default TodoInput;
