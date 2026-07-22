import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * Modelo utilizado para representar una tarea.
 */
interface Tarea {
  id: number;
  titulo: string;
  completada: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  /**
   * Clave utilizada para guardar las tareas en LocalStorage.
   */
  private readonly claveLocalStorage = 'taskflow-tareas';

  /**
   * Texto ingresado por el usuario.
   */
  nuevaTarea: string = '';

  /**
   * Estado actual de la conexión del navegador.
   */
  conectado: boolean = navigator.onLine;

  /**
   * Arreglo de tareas.
   * Se inicializa vacío porque luego se cargará desde LocalStorage.
   */
  tareas: Tarea[] = [];

  /**
   * Se ejecuta al iniciar la aplicación.
   */
  ngOnInit(): void {
    console.log('[APP] Aplicación iniciada');
    console.log(
      '[APP] Estado de conexión:',
      this.conectado ? 'En línea' : 'Sin conexión'
    );

    this.cargarTareas();

    if ('serviceWorker' in navigator) {
      console.log('[APP] El navegador soporta Service Workers');

      navigator.serviceWorker.ready
        .then(() => {
          console.log('[APP] Service Worker listo');
        })
        .catch((error: unknown) => {
          console.error(
            '[APP] Error al preparar el Service Worker:',
            error
          );
        });
    } else {
      console.warn(
        '[APP] El navegador no soporta Service Workers'
      );
    }
  }

  /**
   * Detecta cuando el navegador recupera la conexión.
   */
  @HostListener('window:online')
  manejarConexionRestablecida(): void {
    this.conectado = true;
    console.log('[APP] Conexión restablecida');
  }

  /**
   * Detecta cuando el navegador pierde la conexión.
   */
  @HostListener('window:offline')
  manejarConexionPerdida(): void {
    this.conectado = false;
    console.log('[APP] Conexión perdida');
  }

  /**
   * Agrega una nueva tarea.
   */
  agregarTarea(): void {
    const tituloLimpio = this.nuevaTarea.trim();

    if (tituloLimpio === '') {
      console.warn(
        '[APP] No se puede agregar una tarea vacía'
      );
      return;
    }

    const nueva: Tarea = {
      id: Date.now(),
      titulo: tituloLimpio,
      completada: false
    };

    this.tareas.push(nueva);

    this.guardarTareas();

    console.log('[APP] Tarea agregada:', nueva);

    this.nuevaTarea = '';
  }

  /**
   * Cambia el estado de una tarea.
   */
  cambiarEstado(tarea: Tarea): void {
    tarea.completada = !tarea.completada;

    this.guardarTareas();

    console.log(
      '[APP] Estado actualizado:',
      tarea.titulo,
      tarea.completada ? 'Completada' : 'Pendiente'
    );
  }

  /**
   * Elimina una tarea.
   */
  eliminarTarea(id: number): void {
    const tareaEliminada = this.tareas.find(
      (tarea) => tarea.id === id
    );

    this.tareas = this.tareas.filter(
      (tarea) => tarea.id !== id
    );

    this.guardarTareas();

    console.log(
      '[APP] Tarea eliminada:',
      tareaEliminada
    );
  }

  /**
   * Guarda las tareas actuales en LocalStorage.
   */
  private guardarTareas(): void {
    try {
      const tareasConvertidas = JSON.stringify(
        this.tareas
      );

      localStorage.setItem(
        this.claveLocalStorage,
        tareasConvertidas
      );

      console.log(
        '[APP] Tareas guardadas en LocalStorage'
      );
    } catch (error: unknown) {
      console.error(
        '[APP] Error al guardar las tareas:',
        error
      );
    }
  }

  /**
   * Carga las tareas almacenadas en LocalStorage.
   */
  private cargarTareas(): void {
    try {
      const tareasGuardadas = localStorage.getItem(
        this.claveLocalStorage
      );

      if (tareasGuardadas) {
        const tareasConvertidas: unknown = JSON.parse(
          tareasGuardadas
        );

        if (Array.isArray(tareasConvertidas)) {
          this.tareas = tareasConvertidas as Tarea[];

          console.log(
            '[APP] Tareas recuperadas desde LocalStorage:',
            this.tareas
          );

          return;
        }
      }

      this.cargarTareasIniciales();
    } catch (error: unknown) {
      console.error(
        '[APP] Error al cargar las tareas:',
        error
      );

      this.cargarTareasIniciales();
    }
  }

  /**
   * Carga tareas predeterminadas cuando no existen datos guardados.
   */
  private cargarTareasIniciales(): void {
    this.tareas = [
      {
        id: 1,
        titulo: 'Configurar el proyecto Angular',
        completada: true
      },
      {
        id: 2,
        titulo: 'Agregar soporte PWA',
        completada: true
      },
      {
        id: 3,
        titulo: 'Programar la aplicación de tareas',
        completada: false
      }
    ];

    this.guardarTareas();

    console.log(
      '[APP] Se cargaron las tareas iniciales'
    );
  }
}