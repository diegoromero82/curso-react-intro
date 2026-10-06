function TodoCounter({ completed, total }) {
  // ESTADO DERIVADO: el porcentaje se calcula desde las props del padre; no se
  // guarda como estado local, así nunca puede desincronizarse del contador.
  const progress = total ? Math.round((completed / total) * 100) : 0;
  return (
    <div className="todo-counter">
      <p><strong>{completed}</strong> de {total} tareas completadas</p>
      <div className="progress-track" aria-label={`${progress}% de tareas completadas`}><span className="progress-bar" style={{ width: `${progress}%` }} /></div>
    </div>
  );
}

export { TodoCounter };
