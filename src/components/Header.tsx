import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { SearchForm } from "./SearchForm";

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="site-header">
      <div className="header-container">
        <Link className="brand" to="/">
          MyFavShip
        </Link>

        <nav className="main-navigation">
  <NavLink
    to="/"
    className={({ isActive }) =>
      isActive ? "nav-link active" : "nav-link"
    }
  >
    Início
  </NavLink>

  <NavLink
    to="/works"
    className={({ isActive }) =>
      isActive ? "nav-link active" : "nav-link"
    }
  >
    Obras
  </NavLink>

  <NavLink
    to="/rankings"
    className={({ isActive }) =>
      isActive ? "nav-link active" : "nav-link"
    }
  >
    Rankings
  </NavLink>
</nav>

<SearchForm />

<div className="header-actions">
  {/* permanece igual */}
</div>

        <div className="header-actions">
          {isAuthenticated ? (
            <>
              <Link className="profile-link" to="/profile">
                {user?.name}
              </Link>

              <button
                className="secondary-button"
                type="button"
                onClick={logout}
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link className="secondary-link" to="/login">
                Entrar
              </Link>

              <Link className="primary-link" to="/register">
                Criar conta
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}