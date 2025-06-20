import "./Filter.css";

function Filter({ filter, setFilter }) {
  return (
    <div className="filter-container">
      <button
        className={`filter-button ${filter === "all" ? "selected" : ""}`}
        onClick={() => setFilter("all")}
      >
        전체
      </button>
      <button
        className={`filter-button ${filter === "done" ? "selected" : ""}`}
        onClick={() => setFilter("done")}
      >
        완료
      </button>
      <button
        className={`filter-button ${filter === "notdone" ? "selected" : ""}`}
        onClick={() => setFilter("notdone")}
      >
        미완료
      </button>
    </div>
  );
}

export default Filter;
