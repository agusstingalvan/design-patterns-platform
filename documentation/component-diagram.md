# Diagrama de Componentes - Design Patterns Platform

## Arquitectura Modular del Sistema

Este documento describe la arquitectura modular de la plataforma web de generación de patrones de diseño, mostrando los componentes principales y sus interacciones.

---

## 1. Vista General del Sistema

```
┌─────────────────────────────────────────────────────────────────────┐
│                        DESIGN PATTERNS PLATFORM                      │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                    ┌─────────────┼─────────────┐
                    │             │             │
            ┌───────▼──────┐ ┌───▼────┐ ┌─────▼──────┐
            │ Presentación │ │ Lógica │ │ Persistencia│
            │   (UI/UX)    │ │Negocio │ │   (Datos)  │
            └──────────────┘ └────────┘ └────────────┘
```

---

## 2. Capas de la Arquitectura

### **Capa de Presentación** (Frontend)
- Componentes React/Next.js
- Gestión de estado local
- Interfaz de usuario responsiva

### **Capa de Lógica de Negocio**
- Generadores de código
- Procesamiento de configuraciones
- Validaciones y transformaciones

### **Capa de Persistencia**
- Supabase (PostgreSQL)
- Autenticación OAuth
- Almacenamiento de proyectos y patrones

---

## 3. Componentes Principales

```
┌──────────────────────────────────────────────────────────────────────┐
│                         APLICACIÓN WEB                               │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌────────────────┐  ┌────────────────┐  ┌─────────────────┐       │
│  │  Site Header   │  │   Routing      │  │  Site Footer    │       │
│  │  - Navigation  │  │  - App Router  │  │  - Links        │       │
│  │  - Auth        │  │  - Pages       │  │  - Info         │       │
│  └────────────────┘  └────────────────┘  └─────────────────┘       │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 4. Módulo Generador de Código

### 4.1 Estructura del Módulo

```
┌─────────────────────────────────────────────────────────────────┐
│                    MÓDULO GENERADOR                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────┐         ┌──────────────────────┐     │
│  │ Pattern Selector     │────────▶│ Pattern Config       │     │
│  │ - Singleton          │         │ - Form Controls      │     │
│  │ - State Machine      │         │ - Validators         │     │
│  │ - Flyweight          │         │ - Options            │     │
│  └──────────────────────┘         └──────────────────────┘     │
│           │                                 │                   │
│           │                                 ▼                   │
│           │                    ┌───────────────────────┐        │
│           │                    │ Callback Config       │        │
│           │                    │ - Method Selection    │        │
│           │                    │ - Custom Code         │        │
│           │                    └───────────────────────┘        │
│           │                                 │                   │
│           └─────────────────┬───────────────┘                   │
│                             ▼                                   │
│                  ┌────────────────────┐                         │
│                  │  Code Generator    │                         │
│                  │  - singleton.ts    │                         │
│                  │  - state.ts        │                         │
│                  │  - flyweight.ts    │                         │
│                  └────────────────────┘                         │
│                             │                                   │
│                             ▼                                   │
│                  ┌────────────────────┐                         │
│                  │   Code Viewer      │                         │
│                  │  - Tabs            │                         │
│                  │  - Copy/Download   │                         │
│                  │  - Usage Info      │                         │
│                  │  - Save Pattern    │                         │
│                  │  - Create PR       │                         │
│                  └────────────────────┘                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 Componentes del Generador

#### **PatternConfiguration.tsx**
- Formularios dinámicos según patrón seleccionado
- Validación de inputs
- Gestión de estado de configuración

#### **CallbackMethodsConfig.tsx**
- Selector de métodos Unity (OnEnable, Update, etc.)
- Checkboxes personalizables
- Integración con configuración principal

#### **CodeViewer.tsx**
- Visualización de código generado
- Sistema de tabs para múltiples archivos
- Funciones de descarga (individual/ZIP)
- Opciones de guardado y compartir
- Integración con GitHub (crear PR)

#### **UsageInfo.tsx**
- Instrucciones de uso del patrón
- Ejemplos de implementación
- Mejores prácticas

---

## 5. Módulo de Generadores de Código

```
┌─────────────────────────────────────────────────────────┐
│              GENERADORES DE CÓDIGO (lib/)               │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────┐  ┌─────────────────┐             │
│  │  singleton.ts   │  │    state.ts     │             │
│  │                 │  │                 │             │
│  │ ┌─────────────┐ │  │ ┌─────────────┐ │             │
│  │ │ Minimal     │ │  │ │ Interface   │ │             │
│  │ │ Persistent  │ │  │ │ StateMachine│ │             │
│  │ │ Generic     │ │  │ │ Controller  │ │             │
│  │ └─────────────┘ │  │ │ States      │ │             │
│  └─────────────────┘  │ └─────────────┘ │             │
│                       └─────────────────┘             │
│                                                         │
│  ┌─────────────────┐  ┌─────────────────┐             │
│  │ flyweight.ts    │  │   README.md     │             │
│  │                 │  │   Generator     │             │
│  │ ┌─────────────┐ │  │                 │             │
│  │ │ Flyweight   │ │  │ - Usage guide   │             │
│  │ │ Factory     │ │  │ - Examples      │             │
│  │ │ Context     │ │  │ - Setup steps   │             │
│  │ └─────────────┘ │  └─────────────────┘             │
│  └─────────────────┘                                   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Características de los Generadores

- **Funciones puras**: Entrada → Procesamiento → Salida
- **Templates de código**: Interpolación de variables
- **Generación multi-archivo**: .cs + README.md
- **Validación de configuración**: Prevención de errores

---

## 6. Módulo de Colecciones

```
┌──────────────────────────────────────────────────────────┐
│                   MÓDULO COLECCIONES                     │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────────┐         ┌────────────────┐          │
│  │ Project List   │◀───────▶│ Search/Filter  │          │
│  │ - Cards        │         │ - Query input  │          │
│  │ - Metadata     │         └────────────────┘          │
│  └────────────────┘                                      │
│         │                                                │
│         ▼                                                │
│  ┌────────────────┐                                      │
│  │ Team Manager   │                                      │
│  │ - Create Team  │                                      │
│  │ - Invite       │                                      │
│  │ - Leave Team   │                                      │
│  └────────────────┘                                      │
│         │                                                │
│         ▼                                                │
│  ┌────────────────┐                                      │
│  │ Save Pattern   │                                      │
│  │ - Dialog       │                                      │
│  │ - Validation   │                                      │
│  └────────────────┘                                      │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### Componentes del Módulo

#### **CollectionsClient.tsx**
- Vista principal de proyectos
- Búsqueda y filtrado
- Gestión de equipos

#### **CreateTeamDialog.tsx**
- Formulario de creación de equipo
- Validación de nombre

#### **InviteCollaboratorDialog.tsx**
- Selector de colaboradores
- Envío de invitaciones

#### **SavePatternDialog.tsx**
- Guardado de patrones generados
- Organización en proyectos

---

## 7. Módulo de Autenticación

```
┌─────────────────────────────────────────────────────┐
│              MÓDULO AUTENTICACIÓN                   │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────────────┐      ┌──────────────────┐    │
│  │  GitHub OAuth    │◀────▶│   Supabase Auth  │    │
│  │  - Login         │      │   - Sessions     │    │
│  │  - Scopes        │      │   - Tokens       │    │
│  │  - Callback      │      │   - Profiles     │    │
│  └──────────────────┘      └──────────────────┘    │
│          │                          │              │
│          └──────────┬───────────────┘              │
│                     ▼                              │
│          ┌──────────────────┐                      │
│          │  Auth Actions    │                      │
│          │  - signIn        │                      │
│          │  - signOut       │                      │
│          └──────────────────┘                      │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 8. Módulo de Integración GitHub

```
┌──────────────────────────────────────────────────────┐
│           INTEGRACIÓN GITHUB (PR Creator)            │
├──────────────────────────────────────────────────────┤
│                                                      │
│  ┌────────────────────┐                             │
│  │ CreatePRDialog     │                             │
│  │ - Repo selector    │                             │
│  │ - Branch selector  │                             │
│  │ - Form inputs      │                             │
│  └────────────────────┘                             │
│           │                                          │
│           ▼                                          │
│  ┌────────────────────────────────────┐             │
│  │     GitHub Actions                 │             │
│  │  - getUserRepositories()           │             │
│  │  - getRepositoryBranches()         │             │
│  │  - createPullRequest()             │             │
│  └────────────────────────────────────┘             │
│           │                                          │
│           ▼                                          │
│  ┌────────────────────────────────────┐             │
│  │      GitHub REST API               │             │
│  │  - Create branch                   │             │
│  │  - Create blobs                    │             │
│  │  - Create tree                     │             │
│  │  - Create commit                   │             │
│  │  - Create PR                       │             │
│  └────────────────────────────────────┘             │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## 9. Módulo de Persistencia

```
┌──────────────────────────────────────────────────────┐
│                CAPA DE DATOS (Supabase)              │
├──────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐  │
│  │  Profiles    │  │   Teams      │  │ Projects  │  │
│  │  - user_id   │  │   - name     │  │ - name    │  │
│  │  - team_id   │  │   - created  │  │ - shared  │  │
│  │  - name      │  └──────────────┘  │ - team_id │  │
│  │  - avatar    │                    └───────────┘  │
│  └──────────────┘                          │        │
│         │                                  │        │
│         └──────────────┬───────────────────┘        │
│                        ▼                            │
│              ┌──────────────────┐                   │
│              │    Patterns      │                   │
│              │  - pattern (JSON)│                   │
│              │  - category_id   │                   │
│              │  - project_id    │                   │
│              │  - user_id       │                   │
│              │  - team_id       │                   │
│              └──────────────────┘                   │
│                        │                            │
│                        ▼                            │
│              ┌──────────────────┐                   │
│              │   Categories     │                   │
│              │  - name          │                   │
│              │  (Singleton,     │                   │
│              │   State, Pool)   │                   │
│              └──────────────────┘                   │
│                                                      │
└──────────────────────────────────────────────────────┘
```

### Relaciones de Datos

- **User** → **Profile** (1:1)
- **Profile** → **Team** (N:1)
- **Team** → **Projects** (1:N)
- **Project** → **Patterns** (1:N)
- **Pattern** → **Category** (N:1)

---

## 10. Flujo de Datos Principal

### 10.1 Generación de Código

```
┌─────────┐    ┌──────────────┐    ┌───────────┐    ┌──────────┐
│ Usuario │───▶│ Configuración│───▶│ Generador │───▶│  Código  │
└─────────┘    └──────────────┘    └───────────┘    └──────────┘
                                           │
                                           ▼
                                    ┌──────────┐
                                    │ Visor +  │
                                    │ Descarga │
                                    └──────────┘
```

### 10.2 Guardado de Patrón

```
┌─────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│ Usuario │───▶│  Dialog  │───▶│  Action  │───▶│ Supabase │
└─────────┘    └──────────┘    └──────────┘    └──────────┘
                                      │
                                      ▼
                               ┌─────────────┐
                               │ Collections │
                               │   Update    │
                               └─────────────┘
```

### 10.3 Creación de Pull Request

```
┌─────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐
│ Usuario │──▶│ PR Dialog│──▶│ GitHub   │──▶│  GitHub  │
└─────────┘   └──────────┘   │ Actions  │   │   API    │
                              └──────────┘   └──────────┘
                                     │
                                     ▼
                              ┌──────────┐
                              │ PR creado│
                              │ en repo  │
                              └──────────┘
```

---

## 11. Componentes de Interfaz (UI)

### Librería: shadcn/ui + Radix UI

```
┌────────────────────────────────────────────────────┐
│              COMPONENTES UI                        │
├────────────────────────────────────────────────────┤
│                                                    │
│  Formularios:                                      │
│  - Input, Textarea, Select, Checkbox               │
│  - Label, Form, Switch, Radio                      │
│                                                    │
│  Feedback:                                         │
│  - Toast, Alert, Dialog, AlertDialog               │
│  - Progress, Skeleton, Loader                      │
│                                                    │
│  Navegación:                                       │
│  - Tabs, Accordion, Dropdown, Popover              │
│  - Navigation Menu, Breadcrumb                     │
│                                                    │
│  Layout:                                           │
│  - Card, Separator, Scroll Area                    │
│  - Resizable Panels, Sheet                         │
│                                                    │
│  Otros:                                            │
│  - Avatar, Badge, Button, Tooltip                  │
│                                                    │
└────────────────────────────────────────────────────┘
```

---

## 12. Tecnologías y Stack

### Frontend
- **Next.js 15** (App Router)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 3**

### Backend/Servicios
- **Supabase** (Auth + Database)
- **GitHub API** (PR creation)

### Utilidades
- **JSZip** (generación de archivos)
- **file-saver** (descargas)
- **Zod** (validación)
- **React Hook Form** (formularios)

---

## 13. Interacciones entre Componentes

### Dependencias Principales

```
App Layout
    │
    ├── SiteHeader ────────────▶ Auth Actions
    │
    ├── Generator Page
    │       ├── PatternConfiguration ──▶ CallbackMethodsConfig
    │       │                        │
    │       │                        ▼
    │       │                  Code Generators (lib/)
    │       │                        │
    │       │                        ▼
    │       └── CodeViewer ──────▶ SavePatternDialog
    │                           │
    │                           └─▶ CreatePRDialog ──▶ GitHub Actions
    │
    ├── Collections Page
    │       ├── CollectionsClient
    │       │       ├── CreateTeamDialog ──▶ Supabase Actions
    │       │       └── InviteCollaboratorDialog
    │       │
    │       └── Generator Link (project/{id})
    │
    └── SiteFooter
```

---

## 14. Ventajas de la Arquitectura

### Modularidad
- Componentes independientes y reutilizables
- Separación de responsabilidades clara
- Fácil mantenimiento y testing

### Escalabilidad
- Agregar nuevos patrones sin afectar existentes
- Estructura extensible para nuevas features
- Generadores aislados y personalizables

### Mantenibilidad
- Código organizado por funcionalidad
- Documentación integrada
- Tipado estático (TypeScript)

### Rendimiento
- Server Components de Next.js
- Generación de código en cliente
- Optimización de assets

### Seguridad
- Autenticación OAuth
- Server Actions para operaciones sensibles
- Validación de datos (cliente y servidor)

---

## 15. Resumen Ejecutivo

La plataforma está construida con una **arquitectura modular de tres capas** que separa claramente la presentación, lógica de negocio y persistencia. Los componentes principales son:

1. **Generador de Código**: Motor central con generadores especializados
2. **Colecciones**: Gestión de proyectos y equipos colaborativos
3. **Autenticación**: OAuth con GitHub vía Supabase
4. **Integración GitHub**: Creación automatizada de Pull Requests
5. **UI Components**: Librería reutilizable basada en shadcn/ui

Esta arquitectura permite **extensibilidad**, **mantenibilidad** y **escalabilidad**, facilitando la adición de nuevos patrones de diseño y funcionalidades sin comprometer la estabilidad del sistema existente.
