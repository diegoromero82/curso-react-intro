function TodoItem({ id, text, completed, onToggle, onDelete }) {
  // TodoItem no posee estado local: recibe una instantánea de una tarea desde App.
  // Al pulsar sus botones envía el id al padre mediante callbacks; App actualiza
  // todos y React vuelve a entregar las props actualizadas a este componente.
  return (
    <li className={`todo-item ${completed ? 'is-completed' : ''}`}>
      <button className="check-button" type="button" onClick={() => onToggle(id)} aria-label={completed ? `Marcar ${text} como pendiente` : `Completar ${text}`}>{completed && '✓'}</button>
      <p>{text}</p>
      <button className="delete-button" type="button" onClick={() => onDelete(id)} aria-label={`Eliminar ${text}`}>×</button>
    </li>
  );
}

export { TodoItem };
