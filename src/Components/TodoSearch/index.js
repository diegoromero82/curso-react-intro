function TodoSearch({ value, onChange }) {
  // Componente controlado: value baja desde App. Cuando la persona escribe,
  // onChange comunica el nuevo texto al padre, que actualiza searchValue.

  return (
    <label className="search-box">
      <span className="search-icon" aria-hidden="true">⌕</span><span className="sr-only">Buscar tarea</span>
      <input type="search" value={value} onChange={(event) => onChange(event.target.value)} placeholder="Buscar una tarea..." />
    </label>
  );
}

export { TodoSearch };
