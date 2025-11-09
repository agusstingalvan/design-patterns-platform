export default function AuthCodeErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Error de autenticación</h1>
        <p className="text-muted-foreground">
          Hubo un problema al iniciar sesión. Por favor, intenta de nuevo.
        </p>
      </div>
    </div>
  );
}
