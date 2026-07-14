import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

export function AppLayout() {
  return (
    <div className="app-layout">
      <Header />

      <main className="app-content">
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>
          MyFavShip — encontre, vote e acompanhe seus ships
          favoritos.
        </p>
      </footer>
    </div>
  );
}