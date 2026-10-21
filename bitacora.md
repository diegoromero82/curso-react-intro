# Bitácora de ajustes

## 2026-10-03

- Se creó una interfaz de tareas moderna, minimalista y adaptable a móviles.
- Se añadió encabezado con título, contador y barra de progreso de tareas completadas.
- Se implementó búsqueda por texto y separación visual de tareas pendientes y completadas.
- Se incorporaron acciones para completar y eliminar tareas.
- Se agregó el botón **Nueva tarea** y un modal accesible para crear tareas.
- Se documentaron convenciones de trabajo en `AGENTS.md`.

## 2026-10-21

- Se reorganizó el código fuente por responsabilidades: `App` concentra el estado y las acciones, `Components` reúne los componentes de interfaz y `Hooks` contiene los hooks reutilizables.
- Se creó el custom hook `useLocalStorage` para centralizar la lectura, validación y persistencia de las tareas en `localStorage` bajo la clave `TODOS_V1`.
- Se incorporó una simulación de carga asíncrona de dos segundos en `useLocalStorage`, con limpieza del temporizador y protección para no sobrescribir las tareas antes de terminar la lectura.
- Se añadió una pantalla de carga accesible con el mensaje «Cargando, por favor espere» y un indicador circular animado que respeta la preferencia de reducción de movimiento.
- Se inició la separación de la presentación en `AppUI`. Queda pendiente conectar sus props: en el estado actual, los parámetros de `AppUI` están comentados y la interfaz no puede acceder a los datos y callbacks recibidos.
