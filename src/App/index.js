import { AppUI } from './AppUI';
import { TodoProvider } from '../Context/TodoContext';
import './App.css';

function App() {
  // App solo compone las piezas principales. La lógica de las tareas vive en
  // TodoProvider y la presentación de la interfaz vive en AppUI.
  return (
    <TodoProvider>
      <AppUI />
    </TodoProvider>
  );
}

export default App;
