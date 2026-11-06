# Mis tareas — React

Aplicación de tareas creada como una **fork mejorada** del [Curso de Introducción a React.js de Platzi](https://platzi.com/reactjs). Conserva el propósito educativo del proyecto original, pero incorpora una interfaz y una estructura propias, enfocadas en practicar conceptos actuales de React.

El desarrollo de esta versión se realizó bajo mi propio estilo y con apoyo de **ChatGPT Codex** como herramienta de desarrollo.

## Características

- Crear, buscar, completar y eliminar tareas.
- Separación de tareas pendientes y completadas, con contador y progreso.
- Persistencia de tareas en `localStorage`.
- Estado compartido con Context API y hook personalizado.
- Modal accesible para crear tareas, renderizado con React Portal.
- Diseño adaptable para dispositivos móviles y escritorio.
- React 19.3.

## Tecnologías

- React 19.3
- React DOM 19.3
- Create React App 5
- GitHub Pages para publicación

## Ejecutar el proyecto localmente

Clona el repositorio e instala las dependencias:

```bash
git clone <URL_DEL_REPOSITORIO>
cd curso-react-intro
npm install
```

Inicia el entorno de desarrollo:

```bash
npm start
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000). Los cambios se reflejan automáticamente durante el desarrollo.

## Compilar para producción

Para generar una versión optimizada de la aplicación, ejecuta:

```bash
npm run build
```

El resultado se crea en la carpeta `build/`. Este comando también sirve para verificar que el proyecto compile correctamente antes de publicar cambios.

## Publicar en GitHub Pages

El proyecto está configurado para publicarse en GitHub Pages en:

[https://diegoromero82.github.io/curso-react-intro](https://diegoromero82.github.io/curso-react-intro)

Para compilar y publicar la versión actual, ejecuta:

```bash
npm run deploy
```

Este script ejecuta primero `npm run build` y después publica el contenido de `build/` mediante `gh-pages`.

## Origen del proyecto

El punto de partida fue el repositorio educativo de Platzi. Esta fork amplía ese material con decisiones de interfaz, accesibilidad, organización de código y funcionalidades implementadas como parte del proceso de aprendizaje.
