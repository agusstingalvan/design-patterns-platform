# GameManager - Singleton Pattern

> **Patrón de diseño Singleton generado para Unity**  
> Este archivo contiene todo el código necesario para implementar el patrón en tu proyecto.

---

## ⚙️ Configuración del Patrón

- **Clase Principal**: `GameManager`
- **Variante**: Código Mínimo - Patrón esencial y básico
- **Motor**: Unity (C#)


### Métodos de Callback

- `OnEnable()`


---

## 📖 Descripción

El patrón **Singleton** asegura que una clase tenga solo una instancia y proporciona un punto de acceso global a ella.

**Variante Mínima**: Implementación básica y esencial del patrón.

---

## 📦 Archivos del Patrón


## 📄 GameManager.cs

```csharp
using UnityEngine;

public class GameManager : MonoBehaviour
{
    public static GameManager Instance { get; private set; }

    private void Awake()
    {
        if (Instance == null)
        {
            Instance = this;
        }
        else
        {
            Destroy(gameObject);
        }
    }
    private void OnEnable()
    {
        // Implement OnEnable logic
    }
}
```



---

## 🚀 Instrucciones de Uso

### 1. Copiar Archivos

Copia **el archivo** GameManager.cs a tu proyecto Unity en la carpeta `Assets/Scripts`.

### 2. Configuración en Unity

- Crea un GameObject vacío en tu escena
- Añade el componente GameManager al GameObject

### 3. Acceder al Singleton

```csharp
// Desde cualquier script
GameManager.Instance.YourMethod();

// Ejemplo en otro componente
public class Player : MonoBehaviour
{
    void Start()
    {
        GameManager.Instance.Initialize();
    }
}
```



---

## 💡 Casos de Uso Comunes

- **Game Manager**: Gestión global del estado del juego
- **Audio Manager**: Sistema centralizado de audio
- **Save/Load System**: Sistema de guardado y carga
- **Input Manager**: Gestión de entrada del jugador
- **Scene Manager**: Control de transiciones entre escenas
- **UI Manager**: Gestión de interfaces de usuario

---

## ⚠️ Notas Importantes


⚠️ Debes tener **exactamente un** GameObject con GameManager en tu escena inicial.

⚠️ Si cambias de escena, la instancia se **destruirá** (no persiste).


---

## 🤖 Información para Agentes de IA

Este README contiene la implementación completa del patrón Singleton para Unity con la siguiente configuración:

- **Pattern**: Singleton
- **Variant**: minimal
- **Language**: C#
- **Engine**: Unity
- **Files**: 1
- **Callbacks**: 1

El código está listo para ser copiado y usado directamente en Unity. Todos los archivos necesarios están incluidos arriba.

---

*Generado con Design Patterns Platform*  
*https://design-patterns-platform.vercel.app*
