# Guía para agentes

## Proyecto

Aplicación educativa de tareas construida con React y Create React App. La interfaz y los textos están en español.

## Convenciones

- Conserva los componentes funcionales y usa hooks de React para el estado local.
- Mantén los estilos en `src/App.css` y los estilos globales mínimos en `src/index.css`.
- No agregues dependencias para cambios de interfaz simples.
- Prioriza accesibilidad: controles con etiquetas, foco visible, HTML semántico y funcionamiento con teclado.
- Conserva una experiencia responsive; valida al menos los anchos móvil y escritorio.

## Verificación

Después de cambios relevantes, ejecuta `npm run build`. No modifiques `package-lock.json` salvo que se cambien dependencias de forma intencional.
