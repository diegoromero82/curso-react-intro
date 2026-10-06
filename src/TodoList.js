function TodoList({ title, count, emptyMessage, children }) {
  // count es un estado derivado calculado en App. Este hijo decide únicamente
  // cómo representarlo: lista cuando hay elementos o mensaje cuando no los hay.
  // children contiene los TodoItem que el padre ya construyó para esta sección.
  return (
    <section className="todo-section" aria-labelledby={`${title}-title`}>
      <div className="section-heading"><h2 id={`${title}-title`}>{title}</h2><span>{count}</span></div>
      {count ? <ul className="todo-list">{children}</ul> : <p className="empty-state">{emptyMessage}</p>}
    </section>
  );
}

export { TodoList };
