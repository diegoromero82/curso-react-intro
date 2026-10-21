import { createContext, useMemo, useState } from 'react';
import { useLocalStorage } from '../Hooks/useLocalStorage';

// CONTEXTO DE TAREAS: permite que los componentes descendientes compartan el
// estado principal y las acciones sin tener que transportar props intermedias.
const TodoContext = createContext(null);

// Esta constante evita repetir el texto de la clave en varios lugares.
// LocalStorage guardará las tareas en el navegador bajo este nombre.
const TODOS_STORAGE_KEY = 'TODOS_V1';

function TodoProvider({ children }) {
  // ESTADO PRINCIPAL: el hook lee las tareas guardadas al iniciar y las
  // vuelve a guardar automáticamente cada vez que cambia el arreglo.
  const [todos, setTodos, loading] = useLocalStorage(TODOS_STORAGE_KEY, []);

  // ESTADO DE INTERFAZ: texto controlado del buscador.
  const [searchValue, setSearchValue] = useState('');

  // ESTADO DE INTERFAZ: decide si el modal para crear tareas se muestra.
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTodos = useMemo(() => {
    // ESTADO DERIVADO: se recalcula a partir de todos y searchValue, por lo
    // que no necesita un useState propio.
    const query = searchValue.trim().toLowerCase();

    return query
      ? todos.filter((todo) => todo.text.toLowerCase().includes(query))
      : todos;
  }, [todos, searchValue]);

  // ESTADOS DERIVADOS para las dos columnas de la interfaz.
  const pendingTodos = filteredTodos.filter((todo) => !todo.completed);
  const completedTodos = filteredTodos.filter((todo) => todo.completed);
  const completedCount = todos.filter((todo) => todo.completed).length;

  const toggleTodo = (id) => {
    // Actualiza la tarea seleccionada sin modificar el arreglo original.
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    // Crea un nuevo arreglo sin la tarea cuyo id coincide.
    setTodos((current) => current.filter((todo) => todo.id !== id));
  };

  const addTodo = (text) => {
    // Agrega una tarea nueva y cierra el modal cuando termina la creación.
    setTodos((current) => [
      ...current,
      {
        id: Date.now(),
        text,
        completed: false,
      },
    ]);

    setIsModalOpen(false);
  };

  // El Provider es el único lugar que conoce la lógica de negocio. Sus hijos
  // pueden leer este objeto mediante useContext(TodoContext).
  const contextValue = {
    addTodo,
    completedCount,
    completedTodos,
    deleteTodo,
    isModalOpen,
    loading,
    pendingTodos,
    searchValue,
    setIsModalOpen,
    setSearchValue,
    todos,
    toggleTodo,
  };

  return (
    <TodoContext.Provider value={contextValue}>
      {children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };
