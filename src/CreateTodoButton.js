import { useState } from 'react';

function CreateTodoButton({ isOpen, onOpen, onClose, onCreate }) {
  // ESTADO LOCAL DEL HIJO: solo conserva el borrador del formulario. No pertenece
  // a App porque ningún otro componente necesita leerlo.

  const [newTodo, setNewTodo] = useState('');

  // ACCIÓN DEL FORMULARIO: valida el borrador, comunica el texto al padre con
  // onCreate y limpia el estado local. App agrega la tarea y cierra el modal.

  const handleSubmit = (event) => {

    event.preventDefault();
    const task = newTodo.trim();
    if (!task) return;
    onCreate(task);
    setNewTodo('');
  };
  // ACCIÓN DE CIERRE: restablece el borrador local y pide al padre cambiar el
  // estado isModalOpen mediante la callback onClose.
  const handleClose = () => { setNewTodo(''); onClose(); };
  return (
    <>
      {/* isOpen llega desde App; al pulsar, el hijo solicita abrir el modal. */}
      <button className="create-button" type="button" onClick={onOpen}><span>+</span> Nueva tarea</button>
      {isOpen && <div className="modal-backdrop" role="presentation" onMouseDown={handleClose}>
        <section className="todo-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={(event) => event.stopPropagation()}>
          <button className="modal-close" type="button" onClick={handleClose} aria-label="Cerrar">×</button>
          <p className="eyebrow">Nueva tarea</p><h2 id="modal-title">¿Qué necesitas hacer?</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="new-todo">Describe tu tarea</label>
            {/* Entrada controlada por el estado local newTodo. */}
            <input id="new-todo" autoFocus value={newTodo} onChange={(event) => setNewTodo(event.target.value)} placeholder="Ej. Revisar el proyecto" />
            <div className="modal-actions"><button type="button" className="cancel-button" onClick={handleClose}>Cancelar</button><button type="submit" className="submit-button">Crear tarea</button></div>
          </form>
        </section>
      </div>}
    </>
  );
}

export { CreateTodoButton };
