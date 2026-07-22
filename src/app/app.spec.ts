/**
 * @vitest-environment jsdom
 * @vitest-environment-options {"url":"http://localhost/"}
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

  it('debe cambiar una tarea de pendiente a completada', () => {
    const app = new App();

    app.nuevaTarea = 'Revisar funcionamiento del pipeline';
    app.agregarTarea();

    const tarea = app.tareas.find(
      (item) =>
        item.titulo === 'Revisar funcionamiento del pipeline'
    );

    expect(tarea).toBeDefined();
    expect(tarea?.completada).toBe(false);

    if (tarea) {
      app.cambiarEstado(tarea);
    }

    expect(tarea?.completada).toBe(true);
  });
});