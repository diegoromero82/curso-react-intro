import { useContext } from 'react';
import { TodoCounter } from '../Components/TodoCounter';
import { TodoSearch } from '../Components/TodoSearch';
import { TodoList } from '../Components/TodoList';
import { TodoItem } from '../Components/TodoItem';
import { CreateTodoButton } from '../Components/CreateTodoButton';
import { TodoContext } from '../Context/TodoContext';

function AppUI() {
    // CONSUMIDOR: useContext lee el objeto entregado por TodoContext.Provider
    // en App. Así AppUI no necesita recibir ni declarar una lista extensa
    // de props que solo usaría para construir la interfaz.
    const {
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
    } = useContext(TodoContext);

    // La carga pertenece a la interfaz: el Provider comunica su estado y
    // AppUI decide qué representación mostrar a la persona usuaria.
    if (loading) {
        return (
            <main className="loading-screen">
                <div className="loading-content" role="status">
                    <span className="loading-spinner" aria-hidden="true" />
                    <p className="loading-message">Cargando, por favor espere</p>
                </div>
            </main>
        );
    }

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
                {/* Comunicación bidireccional controlada: valor baja al hijo;
            onChange sube el nuevo texto. */}

                <div className="todo-columns">
                    <TodoList
                        title="Pendientes"
                        count={pendingTodos.length}
                        emptyMessage="No tienes tareas pendientes. ¡Buen trabajo!"
                    >
                        {/* El padre deriva y entrega las tareas pendientes; cada TodoItem
                notifica acciones hacia arriba. */}
                        {pendingTodos.map((todo) => (
                            <TodoItem
                                key={todo.id}
                                {...todo}
                                onToggle={toggleTodo}
                                onDelete={deleteTodo}
                            />
                        ))}
                    </TodoList>

                    <TodoList
                        title="Completadas"
                        count={completedTodos.length}
                        emptyMessage="Aún no has completado tareas."
                    >
                        {/* La misma fuente de verdad se presenta aquí, separada por el
                estado derivado completed. */}
                        {completedTodos.map((todo) => (
                            <TodoItem
                                key={todo.id}
                                {...todo}
                                onToggle={toggleTodo}
                                onDelete={deleteTodo}
                            />
                        ))}
                    </TodoList>
                </div>

                <CreateTodoButton
                    isOpen={isModalOpen}
                    onOpen={() => setIsModalOpen(true)}
                    onClose={() => setIsModalOpen(false)}
                    onCreate={addTodo}
                />
                {/* El padre controla la apertura y recibe del hijo las solicitudes
            de crear o cerrar. */}
            </section>
        </main>
    );
}

export { AppUI };
