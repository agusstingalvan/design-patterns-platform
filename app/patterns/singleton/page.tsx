import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ArrowLeft, Code2, Gamepad2, GitFork } from "lucide-react"
import Link from "next/link"

export default function SingletonPatternPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <Link href="/patterns">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                  <Gamepad2 className="h-6 w-6" />
                  Singleton Pattern
                </h1>
                <p className="text-muted-foreground">
                  Ensure a class has only one instance and provide a global point of access to it
                </p>
              </div>
            </div>
            <Tabs defaultValue="overview">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="implementation">Implementation</TabsTrigger>
                <TabsTrigger value="examples">Examples</TabsTrigger>
                <TabsTrigger value="diagram">Diagram</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-6 py-4">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">What is the Singleton Pattern?</h2>
                  <p>
                    The Singleton pattern is one of the most commonly used design patterns in game development. It
                    ensures that a class has only one instance and provides a global point of access to that instance.
                  </p>
                  <p>
                    This pattern is particularly useful for managing game-wide resources and services that should be
                    accessible from anywhere in your code, but should only exist once.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">When to Use It</h2>
                  <ul className="list-disc list-inside space-y-2">
                    <li>When exactly one instance of a class is needed throughout your game</li>
                    <li>When you need a global access point to that instance</li>
                    <li>When the instance should be extensible by subclassing</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Common Use Cases in Games</h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-bold mb-2">Game Managers</h3>
                      <p className="text-sm text-muted-foreground">
                        Central controllers that manage game state, levels, or scenes. Having a single GameManager
                        ensures consistent state management.
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-bold mb-2">Audio Systems</h3>
                      <p className="text-sm text-muted-foreground">
                        Sound managers that control all audio playback in the game, preventing audio conflicts and
                        providing a single interface.
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-bold mb-2">Input Managers</h3>
                      <p className="text-sm text-muted-foreground">
                        Systems that handle player input across the entire game, ensuring consistent input processing.
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-bold mb-2">Save/Load Systems</h3>
                      <p className="text-sm text-muted-foreground">
                        Persistence managers that handle saving and loading game data, maintaining a single source of
                        truth.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Advantages and Disadvantages</h2>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <h3 className="font-bold">Advantages</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Ensures a class has just a single instance</li>
                        <li>Provides a global access point to that instance</li>
                        <li>Protects the instance from being overwritten</li>
                        <li>Reduces memory usage by reusing the same instance</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-bold">Disadvantages</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Can introduce global state, making testing more difficult</li>
                        <li>Can hide dependencies between classes</li>
                        <li>Violates the Single Responsibility Principle</li>
                        <li>Can be problematic in multithreaded environments if not implemented carefully</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="implementation" className="space-y-6 py-4">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Implementation in Unity (C#)</h2>
                  <div className="border rounded-lg p-4 bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold flex items-center">
                        <Code2 className="mr-2 h-4 w-4" />
                        GameManager.cs
                      </h3>
                      <Button variant="ghost" size="sm">
                        Copy Code
                      </Button>
                    </div>
                    <pre className="text-sm overflow-x-auto p-2 bg-muted rounded-md">
                      {`using UnityEngine;

public class GameManager : MonoBehaviour
{
    private static GameManager _instance;
    
    public static GameManager Instance
    {
        get
        {
            if (_instance == null)
            {
                _instance = FindObjectOfType<GameManager>();
                
                if (_instance == null)
                {
                    GameObject obj = new GameObject("GameManager");
                    _instance = obj.AddComponent<GameManager>();
                }
            }
            
            return _instance;
        }
    }
    
    private void Awake()
    {
        if (_instance != null && _instance != this)
        {
            Destroy(gameObject);
            return;
        }
        
        _instance = this;
        DontDestroyOnLoad(gameObject);
    }
    
    // Add your singleton functionality below
    public void ExampleMethod()
    {
        Debug.Log("GameManager singleton method called!");
    }
}`}
                    </pre>
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Implementation in Godot (GDScript)</h2>
                  <div className="border rounded-lg p-4 bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold flex items-center">
                        <Code2 className="mr-2 h-4 w-4" />
                        game_manager.gd
                      </h3>
                      <Button variant="ghost" size="sm">
                        Copy Code
                      </Button>
                    </div>
                    <pre className="text-sm overflow-x-auto p-2 bg-muted rounded-md">
                      {`extends Node

class_name GameManager

# Singleton instance
static var _instance = null

# Static getter for the singleton
static func get_instance():
    if _instance == null:
        _instance = GameManager.new()
    return _instance

func _init():
    if _instance != null:
        printerr("GameManager singleton already exists. Use get_instance() instead.")
    else:
        _instance = self

# Add your singleton functionality below
func example_method():
    print("GameManager singleton method called!")
`}
                    </pre>
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Implementation in Unreal Engine (C++)</h2>
                  <div className="border rounded-lg p-4 bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold flex items-center">
                        <Code2 className="mr-2 h-4 w-4" />
                        GameManager.h
                      </h3>
                      <Button variant="ghost" size="sm">
                        Copy Code
                      </Button>
                    </div>
                    <pre className="text-sm overflow-x-auto p-2 bg-muted rounded-md">
                      {`#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "GameManager.generated.h"

UCLASS()
class YOURGAME_API AGameManager : public AActor
{
    GENERATED_BODY()
    
public:    
    // Sets default values for this actor's properties
    AGameManager();

    // Static getter for the singleton instance
    UFUNCTION(BlueprintCallable, Category = "Game Manager")
    static AGameManager* GetInstance();
    
    // Example method
    UFUNCTION(BlueprintCallable, Category = "Game Manager")
    void ExampleMethod();

protected:
    // Called when the game starts or when spawned
    virtual void BeginPlay() override;
    
private:
    // Static instance of the singleton
    static AGameManager* Instance;
};`}
                    </pre>
                  </div>
                  <div className="border rounded-lg p-4 bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold flex items-center">
                        <Code2 className="mr-2 h-4 w-4" />
                        GameManager.cpp
                      </h3>
                      <Button variant="ghost" size="sm">
                        Copy Code
                      </Button>
                    </div>
                    <pre className="text-sm overflow-x-auto p-2 bg-muted rounded-md">
                      {`#include "GameManager.h"

// Initialize static instance to nullptr
AGameManager* AGameManager::Instance = nullptr;

// Sets default values
AGameManager::AGameManager()
{
    // Set this actor to call Tick() every frame
    PrimaryActorTick.bCanEverTick = true;
}

// Called when the game starts or when spawned
void AGameManager::BeginPlay()
{
    Super::BeginPlay();
    
    // If an instance already exists and it's not this, destroy this
    if (Instance && Instance != this)
    {
        Destroy();
        return;
    }
    
    // Set the static instance to this
    Instance = this;
    
    // Make sure this actor persists between level loads
    SetActorTickEnabled(true);
    SetActorHiddenInGame(true);
}

// Static getter for the singleton instance
AGameManager* AGameManager::GetInstance()
{
    // If the instance doesn't exist, try to find it in the world
    if (!Instance)
    {
        UWorld* World = GEngine->GetWorldFromContextObject(nullptr, EGetWorldErrorMode::LogAndReturnNull);
        if (World)
        {
            // Find the first instance in the world
            Instance = Cast<AGameManager>(UGameplayStatics::GetActorOfClass(World, AGameManager::StaticClass()));
            
            // If still not found, spawn a new one
            if (!Instance && World)
            {
                FActorSpawnParameters SpawnParams;
                SpawnParams.SpawnCollisionHandlingOverride = ESpawnActorCollisionHandlingMethod::AlwaysSpawn;
                Instance = World->SpawnActor<AGameManager>(AGameManager::StaticClass(), FVector::ZeroVector, FRotator::ZeroRotator, SpawnParams);
            }
        }
    }
    
    return Instance;
}

// Example method
void AGameManager::ExampleMethod()
{
    UE_LOG(LogTemp, Log, TEXT("GameManager singleton method called!"));
}`}
                    </pre>
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Key Implementation Considerations</h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-bold mb-2">Thread Safety</h3>
                      <p className="text-sm text-muted-foreground">
                        If your game uses multiple threads, ensure your singleton implementation is thread-safe to
                        prevent race conditions during initialization.
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-bold mb-2">Lazy vs. Eager Initialization</h3>
                      <p className="text-sm text-muted-foreground">
                        Consider whether your singleton should be created on first access (lazy) or at application
                        startup (eager) based on resource needs.
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-bold mb-2">Persistence Across Scenes</h3>
                      <p className="text-sm text-muted-foreground">
                        In Unity, use DontDestroyOnLoad to ensure your singleton persists between scene transitions. In
                        other engines, use equivalent mechanisms.
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-bold mb-2">Dependency Injection</h3>
                      <p className="text-sm text-muted-foreground">
                        Consider using dependency injection alongside singletons to make your code more testable and
                        reduce tight coupling.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="examples" className="space-y-6 py-4">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Game Manager Example</h2>
                  <div className="border rounded-lg p-4 bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold flex items-center">
                        <Code2 className="mr-2 h-4 w-4" />
                        GameManager.cs (Unity)
                      </h3>
                      <Button variant="ghost" size="sm">
                        Copy Code
                      </Button>
                    </div>
                    <pre className="text-sm overflow-x-auto p-2 bg-muted rounded-md">
                      {`using UnityEngine;
using UnityEngine.SceneManagement;

public class GameManager : MonoBehaviour
{
    private static GameManager _instance;
    
    // Game state variables
    public int Score { get; private set; }
    public int HighScore { get; private set; }
    public int CurrentLevel { get; private set; }
    public bool IsPaused { get; private set; }
    
    public static GameManager Instance
    {
        get
        {
            if (_instance == null)
            {
                _instance = FindObjectOfType<GameManager>();
                
                if (_instance == null)
                {
                    GameObject obj = new GameObject("GameManager");
                    _instance = obj.AddComponent<GameManager>();
                }
            }
            
            return _instance;
        }
    }
    
    private void Awake()
    {
        if (_instance != null && _instance != this)
        {
            Destroy(gameObject);
            return;
        }
        
        _instance = this;
        DontDestroyOnLoad(gameObject);
        
        // Initialize game state
        LoadHighScore();
        CurrentLevel = 1;
        IsPaused = false;
    }
    
    // Game state management methods
    public void AddScore(int points)
    {
        Score += points;
        
        if (Score > HighScore)
        {
            HighScore = Score;
            SaveHighScore();
        }
    }
    
    public void ResetScore()
    {
        Score = 0;
    }
    
    public void PauseGame()
    {
        Time.timeScale = 0f;
        IsPaused = true;
    }
    
    public void ResumeGame()
    {
        Time.timeScale = 1f;
        IsPaused = false;
    }
    
    public void LoadNextLevel()
    {
        CurrentLevel++;
        SceneManager.LoadScene("Level" + CurrentLevel);
    }
    
    public void RestartLevel()
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
    }
    
    private void LoadHighScore()
    {
        HighScore = PlayerPrefs.GetInt("HighScore", 0);
    }
    
    private void SaveHighScore()
    {
        PlayerPrefs.SetInt("HighScore", HighScore);
        PlayerPrefs.Save();
    }
}`}
                    </pre>
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Audio Manager Example</h2>
                  <div className="border rounded-lg p-4 bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold flex items-center">
                        <Code2 className="mr-2 h-4 w-4" />
                        AudioManager.cs (Unity)
                      </h3>
                      <Button variant="ghost" size="sm">
                        Copy Code
                      </Button>
                    </div>
                    <pre className="text-sm overflow-x-auto p-2 bg-muted rounded-md">
                      {`using System.Collections.Generic;
using UnityEngine;

public class AudioManager : MonoBehaviour
{
    private static AudioManager _instance;
    
    [System.Serializable]
    public class SoundEffect
    {
        public string name;
        public AudioClip clip;
        [Range(0f, 1f)]
        public float volume = 1f;
        [Range(0.1f, 3f)]
        public float pitch = 1f;
        public bool loop = false;
        
        [HideInInspector]
        public AudioSource source;
    }
    
    public List<SoundEffect> soundEffects = new List<SoundEffect>();
    public List<SoundEffect> musicTracks = new List<SoundEffect>();
    
    private SoundEffect currentMusic;
    private float masterVolume = 1f;
    private float sfxVolume = 1f;
    private float musicVolume = 1f;
    
    public static AudioManager Instance
    {
        get
        {
            if (_instance == null)
            {
                _instance = FindObjectOfType<AudioManager>();
                
                if (_instance == null)
                {
                    GameObject obj = new GameObject("AudioManager");
                    _instance = obj.AddComponent<AudioManager>();
                }
            }
            
            return _instance;
        }
    }
    
    private void Awake()
    {
        if (_instance != null && _instance != this)
        {
            Destroy(gameObject);
            return;
        }
        
        _instance = this;
        DontDestroyOnLoad(gameObject);
        
        // Initialize audio sources
        foreach (SoundEffect sound in soundEffects)
        {
            sound.source = gameObject.AddComponent<AudioSource>();
            sound.source.clip = sound.clip;
            sound.source.volume = sound.volume * masterVolume * sfxVolume;
            sound.source.pitch = sound.pitch;
            sound.source.loop = sound.loop;
        }
        
        foreach (SoundEffect music in musicTracks)
        {
            music.source = gameObject.AddComponent<AudioSource>();
            music.source.clip = music.clip;
            music.source.volume = music.volume * masterVolume * musicVolume;
            music.source.pitch = music.pitch;
            music.source.loop = true;
        }
    }
    
    public void PlaySound(string name)
    {
        SoundEffect sound = soundEffects.Find(s => s.name == name);
        if (sound != null)
        {
            sound.source.Play();
        }
        else
        {
            Debug.LogWarning("Sound effect " + name + " not found!");
        }
    }
    
    public void PlayMusic(string name)
    {
        if (currentMusic != null)
        {
            currentMusic.source.Stop();
        }
        
        SoundEffect music = musicTracks.Find(m => m.name == name);
        if (music != null)
        {
            music.source.Play();
            currentMusic = music;
        }
        else
        {
            Debug.LogWarning("Music track " + name + " not found!");
        }
    }
    
    public void StopMusic()
    {
        if (currentMusic != null)
        {
            currentMusic.source.Stop();
        }
    }
    
    public void SetMasterVolume(float volume)
    {
        masterVolume = Mathf.Clamp01(volume);
        UpdateAllVolumes();
    }
    
    public void SetSFXVolume(float volume)
    {
        sfxVolume = Mathf.Clamp01(volume);
        UpdateSFXVolumes();
    }
    
    public void SetMusicVolume(float volume)
    {
        musicVolume = Mathf.Clamp01(volume);
        UpdateMusicVolumes();
    }
    
    private void UpdateAllVolumes()
    {
        UpdateSFXVolumes();
        UpdateMusicVolumes();
    }
    
    private void UpdateSFXVolumes()
    {
        foreach (SoundEffect sound in soundEffects)
        {
            sound.source.volume = sound.volume * masterVolume * sfxVolume;
        }
    }
    
    private void UpdateMusicVolumes()
    {
        foreach (SoundEffect music in musicTracks)
        {
            music.source.volume = music.volume * masterVolume * musicVolume;
        }
    }
}`}
                    </pre>
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Usage Examples</h2>
                  <div className="border rounded-lg p-4 bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold flex items-center">
                        <Code2 className="mr-2 h-4 w-4" />
                        PlayerController.cs (Using the Singletons)
                      </h3>
                      <Button variant="ghost" size="sm">
                        Copy Code
                      </Button>
                    </div>
                    <pre className="text-sm overflow-x-auto p-2 bg-muted rounded-md">
                      {`using UnityEngine;

public class PlayerController : MonoBehaviour
{
    [SerializeField] private int scorePerCoin = 10;
    
    private void Start()
    {
        // Play background music when the player starts
        AudioManager.Instance.PlayMusic("BackgroundMusic");
    }
    
    private void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Coin"))
        {
            // Play sound effect
            AudioManager.Instance.PlaySound("CoinPickup");
            
            // Add score
            GameManager.Instance.AddScore(scorePerCoin);
            
            // Destroy the coin
            Destroy(other.gameObject);
        }
        else if (other.CompareTag("Enemy"))
        {
            // Play sound effect
            AudioManager.Instance.PlaySound("PlayerHit");
            
            // Restart the level
            GameManager.Instance.RestartLevel();
        }
        else if (other.CompareTag("LevelEnd"))
        {
            // Play sound effect
            AudioManager.Instance.PlaySound("LevelComplete");
            
            // Load the next level
            GameManager.Instance.LoadNextLevel();
        }
    }
    
    public void OnPauseButtonPressed()
    {
        if (GameManager.Instance.IsPaused)
        {
            GameManager.Instance.ResumeGame();
        }
        else
        {
            GameManager.Instance.PauseGame();
        }
    }
}`}
                    </pre>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="diagram" className="space-y-6 py-4">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Singleton Pattern Structure</h2>
                  <div className="border rounded-lg p-6 bg-muted/30 flex justify-center">
                    <div className="max-w-lg">
                      <svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" className="w-full">
                        {/* Class Box */}
                        <rect
                          x="150"
                          y="50"
                          width="200"
                          height="200"
                          rx="5"
                          fill="white"
                          stroke="currentColor"
                          strokeWidth="2"
                        />

                        {/* Class Name */}
                        <line x1="150" y1="80" x2="350" y2="80" stroke="currentColor" strokeWidth="2" />
                        <text
                          x="250"
                          y="70"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="16"
                          fontWeight="bold"
                        >
                          Singleton
                        </text>

                        {/* Static Instance */}
                        <text x="160" y="100" dominantBaseline="middle" fontSize="14">
                          - static instance: Singleton
                        </text>

                        {/* Methods */}
                        <line x1="150" y1="120" x2="350" y2="120" stroke="currentColor" strokeWidth="2" />
                        <text x="160" y="140" dominantBaseline="middle" fontSize="14">
                          - Singleton()
                        </text>
                        <text x="160" y="170" dominantBaseline="middle" fontSize="14">
                          + static getInstance(): Singleton
                        </text>
                        <text x="160" y="200" dominantBaseline="middle" fontSize="14">
                          + singletonMethod()
                        </text>

                        {/* Self-reference arrow */}
                        <path
                          d="M 250,50 C 250,20 400,20 400,150 C 400,280 250,280 250,250"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <polygon points="250,50 245,60 255,60" fill="currentColor" />
                        <text x="410" y="150" dominantBaseline="middle" fontSize="14">
                          instance
                        </text>

                        {/* Client */}
                        <rect
                          x="50"
                          y="150"
                          width="60"
                          height="30"
                          rx="5"
                          fill="white"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <text x="80" y="165" textAnchor="middle" dominantBaseline="middle" fontSize="14">
                          Client
                        </text>

                        {/* Client to Singleton arrow */}
                        <line x1="110" y1="165" x2="140" y2="165" stroke="currentColor" strokeWidth="2" />
                        <polygon points="150,165 140,160 140,170" fill="currentColor" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Sequence Diagram</h2>
                  <div className="border rounded-lg p-6 bg-muted/30 flex justify-center">
                    <div className="max-w-lg">
                      <svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" className="w-full">
                        {/* Client */}
                        <rect
                          x="50"
                          y="30"
                          width="100"
                          height="30"
                          rx="5"
                          fill="white"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <text x="100" y="45" textAnchor="middle" dominantBaseline="middle" fontSize="14">
                          Client
                        </text>
                        <line
                          x1="100"
                          y1="60"
                          x2="100"
                          y2="270"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeDasharray="4"
                        />

                        {/* Singleton Class */}
                        <rect
                          x="200"
                          y="30"
                          width="100"
                          height="30"
                          rx="5"
                          fill="white"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <text x="250" y="45" textAnchor="middle" dominantBaseline="middle" fontSize="14">
                          Singleton
                        </text>
                        <line
                          x1="250"
                          y1="60"
                          x2="250"
                          y2="270"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeDasharray="4"
                        />

                        {/* Singleton Instance */}
                        <rect
                          x="350"
                          y="30"
                          width="100"
                          height="30"
                          rx="5"
                          fill="white"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <text x="400" y="45" textAnchor="middle" dominantBaseline="middle" fontSize="14">
                          instance
                        </text>
                        <line
                          x1="400"
                          y1="60"
                          x2="400"
                          y2="270"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeDasharray="4"
                        />

                        {/* First call to getInstance */}
                        <rect
                          x="90"
                          y="80"
                          width="20"
                          height="190"
                          fill="white"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <line x1="110" y1="90" x2="240" y2="90" stroke="currentColor" strokeWidth="2" />
                        <polygon points="250,90 240,85 240,95" fill="currentColor" />
                        <text x="180" y="80" textAnchor="middle" dominantBaseline="middle" fontSize="12">
                          getInstance()
                        </text>

                        {/* Check if instance exists */}
                        <rect
                          x="240"
                          y="90"
                          width="20"
                          height="40"
                          fill="white"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          d="M 260,100 C 280,100 280,120 260,120"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <text x="310" y="110" textAnchor="middle" dominantBaseline="middle" fontSize="12">
                          if (instance == null)
                        </text>

                        {/* Create instance */}
                        <line x1="260" y1="140" x2="390" y2="140" stroke="currentColor" strokeWidth="2" />
                        <polygon points="400,140 390,135 390,145" fill="currentColor" />
                        <text x="330" y="130" textAnchor="middle" dominantBaseline="middle" fontSize="12">
                          new Singleton()
                        </text>
                        <rect
                          x="390"
                          y="140"
                          width="20"
                          height="120"
                          fill="white"
                          stroke="currentColor"
                          strokeWidth="2"
                        />

                        {/* Return instance */}
                        <line x1="240" y1="170" x2="110" y2="170" stroke="currentColor" strokeWidth="2" />
                        <polygon points="110,170 120,165 120,175" fill="currentColor" />
                        <text x="175" y="160" textAnchor="middle" dominantBaseline="middle" fontSize="12">
                          return instance
                        </text>

                        {/* Call singleton method */}
                        <line x1="110" y1="200" x2="390" y2="200" stroke="currentColor" strokeWidth="2" />
                        <polygon points="390,200 380,195 380,205" fill="currentColor" />
                        <text x="250" y="190" textAnchor="middle" dominantBaseline="middle" fontSize="12">
                          singletonMethod()
                        </text>

                        {/* Return from method */}
                        <line x1="390" y1="230" x2="110" y2="230" stroke="currentColor" strokeWidth="2" />
                        <polygon points="110,230 120,225 120,235" fill="currentColor" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Interactive Diagram</h2>
                  <p>
                    Use our diagram editor to create your own implementation of the Singleton pattern for your specific
                    game needs.
                  </p>
                  <Link href="/diagram?template=singleton">
                    <Button>
                      <GitFork className="mr-2 h-4 w-4" />
                      Open in Diagram Editor
                    </Button>
                  </Link>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

