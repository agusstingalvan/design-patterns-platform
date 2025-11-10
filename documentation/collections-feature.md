# Funcionalidad de Colecciones y Equipos

## Descripción

Sistema completo para gestionar colecciones de patrones, crear equipos y colaborar con otros desarrolladores.

## Archivos Creados

### Páginas

1. **`app/collections/page.tsx`** - Página principal de colecciones (Server Component)
   - Obtiene proyectos del usuario y del equipo
   - Verifica autenticación
   - Pasa datos a componente cliente

2. **`app/collections/collections-client.tsx`** - Componente cliente de colecciones
   - Búsqueda de proyectos
   - Grid de 4 columnas con cards de proyectos
   - Gestión de equipos
   - Diálogos para crear equipo e invitar colaboradores

3. **`app/generator/[id]/page.tsx`** - Página dinámica para cargar patrones (Server Component)
   - Carga proyecto específico por ID
   - Verifica permisos de acceso
   - Valida que el usuario tenga acceso al proyecto

4. **`app/generator/[id]/generator-client.tsx`** - Componente cliente del generador
   - Muestra el patrón guardado
   - Usa CodeViewer para mostrar archivos
   - Permite copiar y descargar código

### Componentes

5. **`components/collections/CreateTeamDialog.tsx`**
   - Diálogo para crear equipos
   - Validación de nombre
   - Feedback con toast

6. **`components/collections/InviteCollaboratorDialog.tsx`**
   - Diálogo para invitar colaboradores
   - Validación de email
   - Búsqueda de usuario por email

### Acciones del Servidor

7. **`app/collections/actions.ts`**
   - `createTeam()`: Crea equipo y asigna al usuario
   - `inviteCollaborator()`: Invita usuario por email al equipo
   - `leaveTeam()`: Elimina usuario del equipo
   - `getUserTeam()`: Obtiene información del equipo actual

### Base de Datos

8. **`database/functions.sql`**
   - Función RPC `get_user_by_email()` para buscar usuarios

### Modificaciones

9. **`components/site-header.tsx`**
   - Botón "Colecciones" en dropdown del avatar
   - Icono FolderOpen

## Características Implementadas

### 1. Página de Colecciones (/collections)

✅ **Búsqueda de Proyectos**
- Input con icono de búsqueda
- Filtrado en tiempo real por nombre de proyecto
- Solo busca en proyectos públicos (shared: true)

✅ **Grid de Proyectos**
- 4 columnas en desktop, responsive
- 2 filas de altura con scroll si hay más
- Cards con:
  - Nombre del proyecto
  - Badge de compartido/privado
  - Tipo de patrón
  - Fecha de creación

✅ **Gestión de Equipos**
- Botón "Crear Equipo" si no tiene equipo
- Botón "Invitar Colaborador" si tiene equipo
- Botón "Abandonar Equipo" con confirmación
- Muestra nombre del equipo actual

✅ **Visualización de Proyectos**
- Proyectos privados del usuario
- Proyectos compartidos del equipo
- Click en card redirige a `/generator/[id]`

### 2. Gestión de Equipos

✅ **Crear Equipo**
- Diálogo con input para nombre
- Validación: usuario no puede estar en otro equipo
- Crea equipo y asigna team_id al perfil

✅ **Invitar Colaborador**
- Input para email del colaborador
- Busca usuario registrado por email
- Valida que colaborador no tenga equipo
- Asigna team_id del equipo actual

✅ **Abandonar Equipo**
- AlertDialog de confirmación
- Establece team_id en null
- Elimina acceso a proyectos compartidos

### 3. Visualización de Patrón Guardado (/generator/[id])

✅ **Carga de Datos**
- Obtiene proyecto desde base de datos
- Extrae archivos del JSONB
- Crea mapping de nombres de archivos

✅ **Interfaz**
- Header con nombre de proyecto y badge
- Información del patrón y clase
- CodeViewer con todos los archivos
- Botón volver a colecciones

✅ **Seguridad**
- Verifica autenticación
- Valida acceso al proyecto
- Redirige si no tiene permisos

## Flujos de Usuario

### Crear Equipo
1. Usuario sin equipo ve botón "Crear Equipo"
2. Click abre diálogo
3. Ingresa nombre del equipo
4. Sistema crea equipo y asigna team_id
5. Toast de éxito y actualización de página

### Invitar Colaborador
1. Usuario con equipo ve botón "Invitar Colaborador"
2. Click abre diálogo
3. Ingresa email del colaborador
4. Sistema busca usuario por email
5. Valida que no tenga equipo
6. Asigna team_id del equipo actual
7. Toast de éxito

### Abandonar Equipo
1. Usuario con equipo ve botón "Abandonar Equipo"
2. Click abre AlertDialog de confirmación
3. Usuario confirma acción
4. Sistema establece team_id en null
5. Usuario pierde acceso a proyectos compartidos

### Ver Patrón Guardado
1. Usuario navega a /collections
2. Ve grid con sus proyectos
3. Click en card de proyecto
4. Redirige a /generator/[id]
5. Carga patrón desde base de datos
6. Muestra código en CodeViewer

## Estructura de Datos

### Query de Proyectos
```typescript
.select(`
  id,
  name,
  shared,
  created_at,
  patterns(id, category_id, pattern, categories(name))
`)
.or(`and(team_id.is.null,shared.eq.false),and(team_id.eq.${team_id},shared.eq.true)`)
```

### JSONB del Patrón
```json
{
  "className": "GameManager",
  "files": {
    "main": "código principal",
    "interface": "código interfaz",
    "readme": "README.md"
  },
  "generatedAt": "2025-11-09T..."
}
```

## Configuración Necesaria

### 1. Ejecutar SQL en Supabase

**Categorías** (si no están creadas):
```sql
INSERT INTO public.categories (name) VALUES
  ('state'),
  ('singleton'),
  ('object-pool')
ON CONFLICT (name) DO NOTHING;
```

**Función RPC**:
```sql
-- Ejecutar database/functions.sql en Supabase SQL Editor
```

### 2. Crear Profiles Automáticamente

Crear un trigger en Supabase para crear perfil cuando se registra un usuario:

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (user_id, name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### 3. Políticas RLS (Row Level Security)

**Tabla profiles**:
```sql
-- SELECT: Users can view their own profile and profiles in their team
CREATE POLICY "Users can view profiles"
  ON public.profiles FOR SELECT
  USING (
    user_id = auth.uid()
    OR team_id IN (
      SELECT team_id FROM public.profiles WHERE user_id = auth.uid()
    )
  );

-- UPDATE: Users can only update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (user_id = auth.uid());
```

**Tabla projects**:
```sql
-- SELECT: Users can view their own projects and team projects
CREATE POLICY "Users can view accessible projects"
  ON public.projects FOR SELECT
  USING (
    -- Private projects (no team)
    (team_id IS NULL AND shared = false)
    OR
    -- Team projects
    (team_id IN (
      SELECT team_id FROM public.profiles WHERE user_id = auth.uid()
    ) AND shared = true)
  );

-- INSERT: Authenticated users can create projects
CREATE POLICY "Users can create projects"
  ON public.projects FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);
```

**Tabla teams**:
```sql
-- SELECT: Users can view teams they belong to
CREATE POLICY "Users can view their teams"
  ON public.teams FOR SELECT
  USING (
    id IN (
      SELECT team_id FROM public.profiles WHERE user_id = auth.uid()
    )
  );

-- INSERT: Authenticated users can create teams
CREATE POLICY "Users can create teams"
  ON public.teams FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);
```

## Validaciones

### Crear Equipo
- ✅ Usuario debe estar autenticado
- ✅ Usuario no debe tener equipo previo
- ✅ Nombre del equipo no vacío

### Invitar Colaborador
- ✅ Usuario debe estar autenticado
- ✅ Usuario debe tener equipo
- ✅ Email debe ser válido
- ✅ Colaborador debe estar registrado
- ✅ Colaborador no debe tener equipo

### Abandonar Equipo
- ✅ Usuario debe estar autenticado
- ✅ Confirmación de acción

### Acceso a Proyecto
- ✅ Usuario debe estar autenticado
- ✅ Proyecto debe existir
- ✅ Usuario debe tener acceso (propio o de equipo)

## Seguridad

### Server-Side
- ✅ Verificación de autenticación en cada acción
- ✅ Validación de permisos antes de modificar datos
- ✅ Uso de RLS en Supabase
- ✅ Funciones SECURITY DEFINER cuando necesario

### Client-Side
- ✅ Validación de formularios
- ✅ Feedback al usuario
- ✅ Manejo de errores

## Próximos Pasos

1. ✅ Crear función RPC en Supabase
2. ✅ Crear trigger para profiles automáticos
3. ✅ Configurar políticas RLS
4. ⬜ Agregar paginación a la grid
5. ⬜ Implementar eliminación de proyectos
6. ⬜ Agregar filtros por tipo de patrón
7. ⬜ Implementar notificaciones de equipo
8. ⬜ Agregar estadísticas de uso

## Testing

### Crear Equipo
1. Login con GitHub
2. Ir a /collections
3. Click en "Crear Equipo"
4. Ingresar nombre
5. Verificar creación en Supabase

### Invitar Colaborador
1. Tener equipo creado
2. Click en "Invitar Colaborador"
3. Ingresar email de usuario registrado
4. Verificar team_id actualizado en profiles

### Ver Proyecto
1. Guardar patrón desde generador
2. Ir a /collections
3. Click en card de proyecto
4. Verificar que carga correctamente

## Troubleshooting

### Error: "No se encontró un usuario con ese email"
- El usuario debe estar registrado en la plataforma
- Verificar que el email sea exacto

### Error: "Ya perteneces a un equipo"
- Usuario solo puede estar en un equipo
- Debe abandonar equipo actual primero

### Proyecto no visible en colecciones
- Verificar que esté guardado correctamente
- Revisar team_id y shared en la tabla projects
- Verificar políticas RLS

### No se puede acceder a proyecto
- Verificar que el usuario tenga permisos
- Proyectos privados solo para creador
- Proyectos compartidos solo para miembros del equipo
