import { describe, expect, it } from "vitest";
import { generateFlyweightCode } from "./flyweight";

describe("generateFlyweightCode", () => {
  const result = generateFlyweightCode({
    className: "Tree",
    key: "Oak",
    intrinsicState: "Oak mesh and material",
    sharedType: "Vegetation",
    meshName: "OakMesh",
    materialName: "OakMaterial",
    color: "Dark green",
    initialHealth: 75,
    initialSpeed: 3.5,
    directionX: 1,
    directionY: 0,
    directionZ: 0,
  });

  it("generates Flyweight, Factory, Context and README files", () => {
    expect(result.names).toEqual({
      flyweight: "TreeFlyweight.cs",
      factory: "TreeFlyweightFactory.cs",
      context: "TreeContext.cs",
      readme: "README.md",
    });
    expect(Object.keys(result.files)).toEqual([
      "flyweight",
      "factory",
      "context",
      "readme",
    ]);
  });

  it("shares intrinsic state through a factory cache keyed by key", () => {
    expect(result.files.flyweight).toContain("public string SharedState { get; }");
    expect(result.files.flyweight).toContain("public string MeshName { get; }");
    expect(result.files.flyweight).toContain("public string MaterialName { get; }");
    expect(result.files.factory).toContain(
      "Dictionary<string, TreeFlyweight> flyweights"
    );
    expect(result.files.factory).toContain("TryGetValue(key, out TreeFlyweight flyweight)");
    expect(result.files.readme).toContain("Oak mesh and material");
    expect(result.files.readme).toContain("OakMaterial");
  });

  it("keeps entity state in the context", () => {
    expect(result.files.context).toContain("Vector3 Position");
    expect(result.files.context).toContain("Quaternion Rotation");
    expect(result.files.context).toContain("float health = 75f");
    expect(result.files.context).toContain("float speed = 3.5f");
    expect(result.files.context).toContain("Vector3 Direction");
    expect(result.files.context).toContain("new Vector3(1f, 0f, 0f)");
  });

  it("does not generate pooling APIs or lifecycle callbacks", () => {
    const output = Object.values(result.files).join("\n");

    expect(output).not.toContain(["UnityEngine", "Pool"].join("."));
    expect(output).not.toContain(["I", "Object", "Pool"].join(""));
    expect(output).not.toContain(["Object", "Pool", "<"].join(""));
    expect(output).not.toContain("OnGetFromPool");
    expect(output).not.toContain("OnReleaseToPool");
  });
});
