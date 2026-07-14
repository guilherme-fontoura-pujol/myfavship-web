import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { ShipCard } from "../components/ShipCard";
import { WorkCard } from "../components/WorkCard";
import { useAuth } from "../contexts/AuthContext";
import { getDashboard } from "../services/dashboard.service";

export function HomePage() {
  const { user, isAuthenticated } = useAuth();

  const dashboardQuery = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
    staleTime: 60_000,
  });

  return (
    <>
      <section className="hero-section">
        <div className="content-container hero-content">
          <p className="eyebrow">Vote. Compare. Descubra.</p>

          <h1>
            Qual é o melhor ship das suas obras favoritas?
          </h1>

          <p className="hero-description">
            Escolha dois personagens, confirme seu casal favorito
            e acompanhe os rankings da comunidade.
          </p>

          <div className="hero-actions">
            <Link
              className="primary-link large-link"
              to="/works"
            >
              Explorar obras
            </Link>

            {!isAuthenticated && (
              <Link
                className="secondary-link large-link"
                to="/register"
              >
                Criar conta
              </Link>
            )}
          </div>

          {isAuthenticated && (
            <p className="welcome-message">
              Bem-vindo de volta,{" "}
              <strong>{user?.name}</strong>.
            </p>
          )}
        </div>
      </section>

      {dashboardQuery.isLoading && (
        <section className="content-container dashboard-message">
          <p>Carregando dados da comunidade...</p>
        </section>
      )}

      {dashboardQuery.isError && (
        <section className="content-container dashboard-message error-message">
          <h2>Não foi possível carregar a página inicial.</h2>
          <button
            type="button"
            onClick={() => dashboardQuery.refetch()}
          >
            Tentar novamente
          </button>
        </section>
      )}

      {dashboardQuery.data && (
        <>
          <section className="stats-section">
            <div className="content-container stats-grid">
              <article>
                <strong>
                  {dashboardQuery.data.stats.works}
                </strong>
                <span>Obras</span>
              </article>

              <article>
                <strong>
                  {dashboardQuery.data.stats.characters}
                </strong>
                <span>Personagens</span>
              </article>

              <article>
                <strong>
                  {dashboardQuery.data.stats.ships}
                </strong>
                <span>Ships</span>
              </article>

              <article>
                <strong>
                  {dashboardQuery.data.stats.votes}
                </strong>
                <span>Votos</span>
              </article>
            </div>
          </section>

          <section className="content-container home-section">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Ranking global</p>
                <h2>Ships mais votados</h2>
              </div>

              <Link to="/rankings">Ver ranking completo</Link>
            </div>

            {dashboardQuery.data.topShips.length > 0 ? (
              <div className="ship-grid">
                {dashboardQuery.data.topShips.map(
                  (ship, index) => (
                    <ShipCard
                      key={ship.id}
                      ship={ship}
                      position={index + 1}
                    />
                  )
                )}
              </div>
            ) : (
              <p className="empty-state">
                Ainda não existem ships votados.
              </p>
            )}
          </section>

          <section className="content-container home-section">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Mais populares</p>
                <h2>Obras com mais votos</h2>
              </div>

              <Link to="/works">Ver todas as obras</Link>
            </div>

            {dashboardQuery.data.topWorks.length > 0 ? (
              <div className="work-grid">
                {dashboardQuery.data.topWorks.map((work) => (
                  <WorkCard key={work.id} work={work} />
                ))}
              </div>
            ) : (
              <p className="empty-state">
                Ainda não existem obras com votos.
              </p>
            )}
          </section>
        </>
      )}
    </>
  );
}