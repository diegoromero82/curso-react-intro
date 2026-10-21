import { useEffect, useRef, useState } from 'react';

// CUSTOM HOOK: concentra la lógica de lectura y escritura en LocalStorage.
// Recibe la clave donde se guardarán los datos y un valor inicial.
function useLocalStorage(storageKey, initialValue) {
  // Conservamos el valor inicial con el que se creó el hook.
  // useRef mantiene su valor entre renderizados sin provocar nuevos renders.
  const initialValueRef = useRef(initialValue);

  const [item, setItem] = useState(initialValue);

  // Guarda la clave cuyos datos ya terminaron de cargarse.
  // Al principio es null porque todavía no hemos leído LocalStorage.
  const [loadedKey, setLoadedKey] = useState(null);

  // Mientras la clave actual no haya terminado de cargar, loading será true.
  const loading = loadedKey !== storageKey;

  useEffect(() => {
    // SIMULACIÓN DE CARGA: esperamos 2 segundos antes de leer LocalStorage.
    // En una aplicación real, aquí podríamos hacer una solicitud a una API.
    const timer = setTimeout(() => {
      try {
        const storedItem = localStorage.getItem(storageKey);

        // Si no hay datos guardados, usamos el valor inicial.
        if (storedItem === null) {
          setItem(initialValueRef.current);
        } else {
          // LocalStorage guarda texto. JSON.parse lo convierte nuevamente
          // en un valor de JavaScript.
          const parsedItem = JSON.parse(storedItem);

          // Si esperamos un arreglo, comprobamos que el dato guardado
          // también lo sea.
          if (
            Array.isArray(initialValueRef.current) &&
            !Array.isArray(parsedItem)
          ) {
            setItem(initialValueRef.current);
          } else {
            setItem(parsedItem);
          }
        }
      } catch (error) {
        // Si la lectura falla o el JSON no es válido, usamos el valor inicial.
        console.error('No fue posible leer LocalStorage:', error);
        setItem(initialValueRef.current);
      }

      // La lectura terminó: loading pasará a ser false en el siguiente render.
      setLoadedKey(storageKey);
    }, 2000);

    // LIMPIEZA: cancela la espera si el componente se desmonta o si cambia
    // storageKey antes de que el temporizador termine.
    return () => clearTimeout(timer);
  }, [storageKey]);

  useEffect(() => {
    // No guardamos nada antes de terminar la lectura. De lo contrario,
    // el valor inicial podría sobrescribir las tareas que ya estaban guardadas.
    if (loading) {
      return;
    }

    // PERSISTENCIA: cuando item cambia, guardamos el valor actualizado.
    try {
      localStorage.setItem(storageKey, JSON.stringify(item));
    } catch (error) {
      console.error('No fue posible guardar en LocalStorage:', error);
    }
  }, [storageKey, item, loading]);

  // Además del valor y su actualizador, devolvemos el estado de carga.
  return [item, setItem, loading];
}

export { useLocalStorage };