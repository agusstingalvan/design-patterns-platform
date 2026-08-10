export interface FlyweightOptions {
  className: string;
  key: string;
  intrinsicState: string;
  sharedType: string;
  meshName: string;
  materialName: string;
  color: string;
  initialHealth: number;
  initialSpeed: number;
  directionX: number;
  directionY: number;
  directionZ: number;
}

interface GeneratedFiles {
  [key: string]: string;
}

interface FileNames {
  [key: string]: string;
}

export function generateFlyweightCode(options: FlyweightOptions): {
  files: GeneratedFiles;
  names: FileNames;
} {
  const {
    className,
    key,
    intrinsicState,
    sharedType,
    meshName,
    materialName,
    color,
    initialHealth,
    initialSpeed,
    directionX,
    directionY,
    directionZ,
  } = options;
  const files: GeneratedFiles = {
    flyweight: `public sealed class ${className}Flyweight
{
    public string Key { get; }
    public string SharedState { get; }
    public string Type { get; }
    public string MeshName { get; }
    public string MaterialName { get; }
    public string Color { get; }

    public ${className}Flyweight(
        string key,
        string sharedState,
        string type,
        string meshName,
        string materialName,
        string color)
    {
        Key = key;
        SharedState = sharedState;
        Type = type;
        MeshName = meshName;
        MaterialName = materialName;
        Color = color;
    }
}`,
    factory: `using System.Collections.Generic;

public class ${className}FlyweightFactory
{
    private readonly Dictionary<string, ${className}Flyweight> flyweights = new();

    public ${className}Flyweight GetFlyweight(
        string key,
        string sharedState,
        string type,
        string meshName,
        string materialName,
        string color)
    {
        if (!flyweights.TryGetValue(key, out ${className}Flyweight flyweight))
        {
            flyweight = new ${className}Flyweight(
                key,
                sharedState,
                type,
                meshName,
                materialName,
                color
            );
            flyweights.Add(key, flyweight);
        }

        return flyweight;
    }
}`,
    context: `using UnityEngine;

public class ${className}Context
{
    public ${className}Flyweight Flyweight { get; }
    public Vector3 Position { get; set; }
    public Quaternion Rotation { get; set; }
    public float Health { get; set; }
    public float Speed { get; set; }
    public Vector3 Direction { get; set; }

    public ${className}Context(
        ${className}Flyweight flyweight,
        Vector3 position,
        Quaternion rotation,
        float health = ${initialHealth}f,
        float speed = ${initialSpeed}f,
        Vector3 direction = default)
    {
        Flyweight = flyweight;
        Position = position;
        Rotation = rotation;
        Health = health;
        Speed = speed;
        Direction = direction == default
            ? new Vector3(${directionX}f, ${directionY}f, ${directionZ}f)
            : direction;
    }
}`,
  };

  const names: FileNames = {
    flyweight: `${className}Flyweight.cs`,
    factory: `${className}FlyweightFactory.cs`,
    context: `${className}Context.cs`,
  };

  files.readme = `# ${className} - Flyweight Pattern

> Patrón Flyweight para Unity. Comparte información común entre objetos similares para reducir la duplicación de estado.

## Configuración

- **Clave compartida**: ${key}
- **Estado intrínseco**: ${intrinsicState}
- **Tipo compartido**: ${sharedType}
- **Mesh compartido**: ${meshName}
- **Material compartido**: ${materialName}
- **Color compartido**: ${color}
- **Vida inicial por contexto**: ${initialHealth}
- **Velocidad inicial por contexto**: ${initialSpeed}
- **Dirección inicial por contexto**: (${directionX}, ${directionY}, ${directionZ})

## Estructura

- ${className}Flyweight.cs: estado intrínseco, compartido e inmutable.
- ${className}FlyweightFactory.cs: crea o recupera Flyweights por clave.
- ${className}Context.cs: estado extrínseco individual: posición, rotación, vida y velocidad.

## Uso

~~~csharp
var factory = new ${className}FlyweightFactory();
${className}Flyweight flyweight = factory.GetFlyweight(
    "${key}",
    "${intrinsicState}",
    "${sharedType}",
    "${meshName}",
    "${materialName}",
    "${color}"
);

var first = new ${className}Context(
    flyweight,
    new Vector3(0f, 0f, 0f),
    Quaternion.identity
);

var second = new ${className}Context(
    flyweight,
    new Vector3(10f, 0f, 0f),
    Quaternion.Euler(0f, 90f, 0f),
    health: 50f,
    speed: 4f
);
~~~

Ambos contexts comparten el mismo Flyweight, pero cada uno conserva su propio estado extrínseco.

*Generado con Design Patterns Platform*
`;
  names.readme = "README.md";

  return { files, names };
}
