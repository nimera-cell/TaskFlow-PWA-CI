/**
 * @vitest-environment jsdom
 * @vitest-environment-options {"url":"http://localhost/"}
 */

/**
 * Carga el compilador JIT de Angular antes de importar
 * el componente que se probará.
 */
import '@angular/compiler';

import {
  beforeEach,
  describe,
  expect,
  it
} from 'vitest';

import { App } from './app';

describe('App', () => {
  /**
   * Limpia LocalStorage antes de cada prueba para evitar
   * que los datos de una prueba afecten a las siguientes.
   */
  beforeEach(() => {
    localStorage.clear();
  });

  it('debe crear la aplicación correctamente', () => {
    const app = new App();

    expect(app).toBeTruthy();
  });

  it('debe iniciar con el campo de nueva tarea vacío', () => {
    const app = new App();

    expect(app.nuevaTarea).toBe('');
  });

  it('debe agregar una nueva tarea', () => {
    const app = new App();

    app.nuevaTarea = 'Preparar informe del laboratorio';
    app.agregarTarea();

    const tareaAgregada = app.tareas.find(
      (tarea) =>
        tarea.titulo === 'Preparar informe del laboratorio'
    );

    expect(tareaAgregada).toBeDefined();
    expect(tareaAgregada?.completada).toBe(false);
  });
});