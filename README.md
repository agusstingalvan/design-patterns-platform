# Design Patterns Platform - Generador de Código

![Next.js](https://img.shields.io/badge/Next.js-16.3.0-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8)

Una plataforma web interactiva para generar código de patrones de diseño personalizados para Unity (C#). Acelera tu desarrollo de videojuegos con plantillas configurables y código listo para usar.

## 🌐 Pruébalo en vivo

👉 [Abrir Design Patterns Platform](https://game-design-patterns-gamedev.vercel.app/)

Entra, genera patrones y finge que escribiste todo ese código a mano.

## 🎯 ¿Qué es este proyecto?

**Design Patterns Platform** es un generador de código inteligente que te permite crear implementaciones completas de patrones de diseño comunes en desarrollo de videojuegos. En lugar de copiar y pegar código de tutoriales o escribir todo desde cero, esta herramienta te permite:

- **Configurar** parámetros específicos de cada patrón
- **Visualizar** el código generado en tiempo real
- **Descargar** archivos listos para usar en Unity
- **Personalizar** nombres de clases, estados, callbacks y más

## ✨ Características Principales

### 🎮 Generador de Código (`/generator`)

La funcionalidad principal de la plataforma. Permite generar tres patrones de diseño esenciales para desarrollo de videojuegos:

#### **1. Singleton Pattern**
Garantiza que una clase tenga solo una instancia con acceso global.

**Variantes disponibles:**
- **Minimal**: Implementación básica y esencial
- **Persistent**: Con `DontDestroyOnLoad` y lazy instantiation
- **Generic**: Clase base reutilizable `Singleton<T>`

**Opciones configurables:**
- Nombre de la clase principal
- Persistencia entre escenas
- Creación perezosa (lazy instantiation)
- Métodos de callback personalizados (OnEnable, OnDisable, OnDestroy, etc.)

**Casos de uso:**
- GameManager
- AudioManager
- SaveManager
- InputManager
- UIManager

---

#### **2. State Machine Pattern**
Permite que un objeto cambie su comportamiento según su estado interno.

**Configuración:**
- Nombre de la clase principal
- Estados personalizados (Idle, Move, Attack, etc.)
- Opción de incluir clase controladora
- Métodos de callback (OnTriggerEnter, OnCollisionEnter, etc.)

**Archivos generados:**
- Interface `I{ClassName}State`
- Clase `{ClassName}StateMachine`
- Controlador `{ClassName}.cs` (opcional)
- Clases individuales para cada estado

**Casos de uso:**
- Control de personajes (Idle → Walk → Run → Jump)
- IA de enemigos (Patrol → Chase → Attack → Retreat)
- Estados de UI (Closed → Opening → Open → Closing)
- Flujo del juego (Menu → Playing → Paused → GameOver)

---

#### **3. Object Pool Pattern**
Reutiliza objetos pre-inicializados para optimizar rendimiento.

**Variantes disponibles:**
- **Custom Stack**: Pool minimalista usando `Stack<T>` sin dependencias
- **Generic UnityEngine.Pool**: Pool oficial de Unity con más control

**Opciones configurables:**
- Nombre de la clase base
- Tamaño inicial del pool
- Capacidad por defecto y máximo
- Collection check (validación de duplicados)
- Incluir clases de ejemplo

**Casos de uso:**
- Proyectiles y balas
- Efectos de partículas
- Enemigos
- UI temporal
- Audio sources

---

## 🚀 Inicio Rápido

### Requisitos previos

- Node.js 18+ 
- npm

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/agusstingalvan/design-patterns-platform.git
cd design-patterns-platform

# Instalar dependencias
npm install
```

### Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000/generator](http://localhost:3000/generator) en tu navegador.

## 🎨 Cómo Usar el Generador

### 1. Accede a `/generator`

Navega a la página del generador en tu navegador local o en la versión desplegada.

### 2. Selecciona un Patrón

Elige entre:
- **Singleton**
- **State Machine** 
- **Object Pool**

### 3. Configura el Patrón

**Panel izquierdo (Configuración):**
- Define el nombre de tu clase principal
- Selecciona la variante del patrón
- Ajusta opciones específicas (persistencia, estados, tamaño del pool, etc.)
- Añade o quita callbacks personalizados

### 4. Visualiza el Código

**Panel derecho (Código):**
- Previsualiza el código generado en tiempo real
- Navega entre múltiples archivos generados usando tabs
- Lee la documentación de uso en la pestaña "Usage"

### 5. Descarga los Archivos

- Haz clic en el botón "Download All Files" para descargar un ZIP
- Copia y pega el código directamente desde el visor

### 6. Usa en Unity

- Extrae los archivos en tu proyecto Unity (`Assets/Scripts/`)
- Sigue las instrucciones en el README.md incluido
- ¡Listo para usar!

## 📁 Estructura del Proyecto

```
design-patterns-platform/
├── app/
│   ├── generator/
│   │   └── page.tsx              # Página principal del generador
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── generator/
│   │   ├── PatternConfiguration.tsx   # Configuraciones de patrones
│   │   ├── CodeViewer.tsx            # Visor de código
│   │   ├── UsageInfo.tsx             # Instrucciones de uso
│   │   └── CallbackMethodsConfig.tsx # Configuración de callbacks
│   ├── ui/                           # Componentes de shadcn/ui
│   ├── site-header.tsx
│   └── site-footer.tsx
├── lib/
│   ├── generators/
│   │   ├── singleton.ts         # Generador de Singleton
│   │   ├── state.ts            # Generador de State Machine
│   │   └── object-pool.ts      # Generador de Object Pool
│   └── utils.ts
└── public/
```

## 🛠️ Tecnologías Utilizadas

- **[Next.js 16](https://nextjs.org/)** - Framework React con App Router
- **[React 19](https://react.dev/)** - Biblioteca de UI
- **[TypeScript](https://www.typescriptlang.org/)** - Tipado estático
- **[Tailwind CSS](https://tailwindcss.com/)** - Estilos utility-first
- **[shadcn/ui](https://ui.shadcn.com/)** - Componentes UI accesibles
- **[Lucide React](https://lucide.dev/)** - Iconos
- **[JSZip](https://stuk.github.io/jszip/)** - Generación de archivos ZIP
- **[file-saver](https://github.com/eligrey/FileSaver.js/)** - Descarga de archivos

## 🧩 Cómo Funciona

### Arquitectura del Generador

1. **Interfaz de Configuración** (`PatternConfiguration.tsx`)
   - Formularios dinámicos según el patrón seleccionado
   - Validación en tiempo real
   - Estado sincronizado con React hooks

2. **Motor de Generación** (`lib/generators/`)
   - Funciones puras que generan código basado en configuración
   - Templates de código con interpolación de variables
   - Generación de múltiples archivos (.cs + README.md)

3. **Visualización de Código** (`CodeViewer.tsx`)
   - Syntax highlighting para C#
   - Navegación por tabs entre archivos
   - Botones de copia y descarga

4. **Sistema de Descarga**
   - Generación de archivos ZIP en cliente
   - Inclusión automática de README con instrucciones

### Flujo de Datos

```
Usuario modifica config → Estado React actualiza → 
Generador crea código → Código se muestra en visor → 
Usuario descarga ZIP
```

## 🎯 Patrones Implementados

### Singleton

**Archivos generados:**
- `{ClassName}.cs` (o `Singleton.cs` + `{ClassName}.cs` en variante genérica)
- `README.md` con instrucciones completas

**Ejemplo de código generado:**

```csharp
using UnityEngine;

public class GameManager : MonoBehaviour
{
    public static GameManager Instance;
    
    private void Awake()
    {
        if (Instance == null)
        {
            Instance = this;
            DontDestroyOnLoad(gameObject);
        }
        else
        {
            Destroy(gameObject);
        }
    }
}
```

### State Machine

**Archivos generados:**
- `I{ClassName}State.cs` (interface)
- `{ClassName}StateMachine.cs`
- `{ClassName}.cs` (controlador, opcional)
- `{ClassName}{StateName}State.cs` (uno por cada estado)
- `README.md`

**Ejemplo de transición:**

```csharp
// En cualquier estado
public void Update()
{
    if (shouldJump)
    {
        player.stateMachine.TransitionTo(player.stateMachine.jumpState);
    }
}
```

### Object Pool

**Archivos generados:**
- `{ClassName}Pool.cs`
- `Pooled{ClassName}.cs`
- `IPooledWithRef.cs` (solo en variante genérica)
- Archivos de ejemplo (opcional)
- `README.md`

**Ejemplo de uso:**

```csharp
// Obtener del pool
Pooled{ClassName} item = pool.Get();
item.transform.position = spawnPoint.position;

// Devolver al pool
item.Release();
```

## 📊 Ventajas del Generador

### ✅ Para Desarrolladores

- **Ahorra tiempo**: No escribas código repetitivo desde cero
- **Código limpio**: Implementaciones siguiendo best practices
- **Documentación incluida**: README.md con instrucciones detalladas
- **Personalizable**: Ajusta nombres, opciones y callbacks
- **Educativo**: Aprende implementaciones correctas de patrones

### ✅ Para Proyectos

- **Consistencia**: Mismo estilo de código en todo el proyecto
- **Mantenibilidad**: Código estructurado y documentado
- **Escalabilidad**: Patrones probados y reutilizables
- **Optimización**: Object Pool mejora rendimiento

## 🤝 Contribuciones

Las contribuciones son bienvenidas! Si quieres agregar nuevos patrones o mejorar los existentes:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/NuevoPatron`)
3. Commit tus cambios (`git commit -m 'Add: Nuevo patrón Observer'`)
4. Push a la rama (`git push origin feature/NuevoPatron`)
5. Abre un Pull Request

## 📝 Roadmap

- [ ] Patrón Observer
- [ ] Patrón Command
- [ ] Patrón Factory
- [ ] Soporte para Godot (GDScript)
- [ ] Soporte para Unreal (C++)
- [ ] Exportar a Gist de GitHub
- [ ] Modo oscuro mejorado
- [ ] Historial de generaciones

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👤 Autor

**Agustín Galván**

- GitHub: [@agusstingalvan](https://github.com/agusstingalvan)

## 🙏 Agradecimientos

- [shadcn](https://twitter.com/shadcn) por los componentes UI
- Comunidad de Unity por feedback sobre patrones
- Todos los contribuidores del proyecto

---

**⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub!**

*Generado con ❤️ para la comunidad de desarrollo de videojuegos*
