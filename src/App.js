import React, { useMemo, useState } from 'react';
import { TodoCounter } from './TodoCounter';
import { TodoSearch } from './TodoSearch';
import { TodoList } from './TodoList';
import { TodoItem } from './TodoItem';
import { CreateTodoButton } from './CreateTodoButton';
import './App.css';
const initialTodos = [
  { id: 1, text: 'Ir al gimnasio', completed: true },
  { id: 2, text: 'Terminar el curso de React', completed: false },
  { id: 3, text: 'Preparar la comida', completed: false },
  { id: 4, text: 'Leer 20 páginas', completed: true },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);
  // ESTADO PRINCIPAL (fuente única de verdad): el padre conserva la lista porque
  // varios hijos la necesitan. TodoItem solicita cambios al padre mediante callbacks.


  const [searchValue, setSearchValue] = useState('');
  // ESTADO DE INTERFAZ: texto controlado del buscador. TodoSearch recibe el valor
  // y comunica cada escritura al padre a través de la prop onChange.


  const [isModalOpen, setIsModalOpen] = useState(false);
  // ESTADO DE INTERFAZ: decide si el modal del hijo CreateTodoButton se muestra.
  // El hijo no lo modifica directamente: invoca onOpen u onClose que entrega el padre.


  const filteredTodos = useMemo(() => {
  // ESTADO DERIVADO: no se guarda con useState porque se puede recalcular a partir
  // de todos y searchValue. useMemo evita repetir el filtrado si no cambió ninguno.


    const query = searchValue.trim().toLowerCase();
    return query ? todos.filter((todo) => todo.text.toLowerCase().includes(query)) : todos;
  }, [todos, searchValue]);
  const pendingTodos = filteredTodos.filter((todo) => !todo.completed);
  // ESTADOS DERIVADOS para cada columna. Dependen de filteredTodos, no son datos
  // independientes que haya que sincronizar manualmente.


  const completedTodos = filteredTodos.filter((todo) => todo.completed);
  const completedCount = todos.filter((todo) => todo.completed).length;
  // ESTADO DERIVADO para el encabezado: cuenta sobre todas las tareas, incluso
  // cuando la búsqueda está activa. Se envía como prop al hijo TodoCounter.


  const toggleTodo = (id) => setTodos((current) => current.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  // ACCIÓN SOLICITADA POR TodoItem: el hijo envía el id y el padre actualiza la
  // fuente de verdad. La forma funcional usa el estado más reciente de React.


  const deleteTodo = (id) => setTodos((current) => current.filter((todo) => todo.id !== id));
  // ACCIÓN SOLICITADA POR TodoItem: se elimina la tarea cuyo id recibió el hijo.


  const addTodo = (text) => {
  // ACCIÓN SOLICITADA POR CreateTodoButton: recibe el texto validado por el hijo,
  // crea la tarea en el estado del padre y cierra el modal.
    setTodos((current) => [...current, { id: Date.now(), text, completed: false }]);
    setIsModalOpen(false);
  };

  return (
    <main className="app-shell">
      <section className="todo-app" aria-labelledby="app-title">
        <header className="app-header">
          <p className="eyebrow">Organiza tu día</p>
          <h1 id="app-title">Mis tareas</h1>
          <TodoCounter completed={completedCount} total={todos.length} />
          {/* Comunicación padre → hijo: TodoCounter solo presenta los datos derivados. */}
        </header>
        <TodoSearch value={searchValue} onChange={setSearchValue} />
        {/* Comunicación bidireccional controlada: valor baja al hijo; onChange sube el nuevo texto. */}
        <div className="todo-columns">
          <TodoList title="Pendientes" count={pendingTodos.length} emptyMessage="No tienes tareas pendientes. ¡Buen trabajo!">
          {/* El padre deriva y entrega las tareas pendientes; cada TodoItem notifica acciones hacia arriba. */}
            {pendingTodos.map((todo) => <TodoItem key={todo.id} {...todo} onToggle={toggleTodo} onDelete={deleteTodo} />)}
          </TodoList>
          <TodoList title="Completadas" count={completedTodos.length} emptyMessage="Aún no has completado tareas.">
          {/* La misma fuente de verdad se presenta aquí, separada por el estado derivado completed. */}
            {completedTodos.map((todo) => <TodoItem key={todo.id} {...todo} onToggle={toggleTodo} onDelete={deleteTodo} />)}
          </TodoList>
        </div>
        <CreateTodoButton isOpen={isModalOpen} onOpen={() => setIsModalOpen(true)} onClose={() => setIsModalOpen(false)} onCreate={addTodo} />
        {/* El padre controla la apertura y recibe del hijo las solicitudes de crear o cerrar. */}
      </section>
    </main>
  );
}

export default App;
