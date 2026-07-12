import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function HomePage() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <main className="page">
      <section className="panel">
        <h1>MyFavShip</h1>

        <p>
          Escolha seus casais favoritos e acompanhe os
          rankings.
        </p>

        {isAuthenticated ? (
          <>
            <p>
              Bem-vindo, <strong>{user?.name}</strong>.
            </p>

            <button type="button" onClick={logout}>
              Sair
            </button>
          </>
        ) : (
          <Link to="/login">Entrar</Link>
        )}
      </section>
    </main>
  );
}