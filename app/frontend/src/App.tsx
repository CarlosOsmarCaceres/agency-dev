// apps/frontend/src/App.tsx
// Intenta escribir esto, debería autocompletarse:
import { UserRoles } from "../../../domain/dist/entities/users/user.js";

function App() {
  return (
    <div>
      <h1>Agencia Digital</h1>
      {/* Si esto se muestra sin errores, la conexión es exitosa */}
      <p>Rol de prueba: {UserRoles.ADMIN}</p>
    </div>
  );
}

export default App;
