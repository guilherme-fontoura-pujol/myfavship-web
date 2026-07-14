import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { EntityImage } from "../components/EntityImage";
import { useAuth } from "../contexts/AuthContext";
import { getProfile } from "../services/profile.service";

function formatVoteDate(value: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function ProfilePage() {
  const { logout } = useAuth();

  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    staleTime: 30_000,
    retry: false,
  });

  if (profileQuery.isLoading) {
    return (
      <section className="content-container status-message">
        Carregando perfil...
      </section>
    );
  }

  if (profileQuery.isError || !profileQuery.data) {
    return (
      <section className="content-container status-message error-message">
        <h1>Não foi possível carregar seu perfil.</h1>

        <div className="profile-error-actions">
          <button
            type="button"
            onClick={() => profileQuery.refetch()}
          >
            Tentar novamente
          </button>

          <button
            type="button"
            className="secondary-button"
            onClick={logout}
          >
            Sair da conta
          </button>
        </div>
      </section>
    );
  }

  const profile = profileQuery.data;

  return (
    <section className="content-container profile-page">
      <header className="profile-header">
        <div className="profile-avatar">
          {profile.name.charAt(0).toUpperCase()}
        </div>

        <div>
          <p className="eyebrow">Seu perfil</p>
          <h1>{profile.name}</h1>
          <p>{profile.email}</p>
        </div>

        <button
          type="button"
          className="secondary-button profile-logout-button"
          onClick={logout}
        >
          Sair
        </button>
      </header>

      <section className="profile-stats-grid">
        <article>
          <strong>{profile.stats.votes}</strong>
          <span>Votos realizados</span>
        </article>

        <article>
          <strong>{profile.stats.worksVoted}</strong>
          <span>Obras votadas</span>
        </article>

        <article>
          <strong>{profile.stats.knownShips}</strong>
          <span>Ships conhecidos</span>
        </article>

        <article>
          <strong>{profile.stats.unknownShips}</strong>
          <span>Ships alternativos</span>
        </article>
      </section>

      <section className="profile-history-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Histórico</p>
            <h2>Seus ships escolhidos</h2>
          </div>

          <Link to="/works">Explorar outras obras</Link>
        </div>

        {profile.votes.length > 0 ? (
          <div className="profile-vote-list">
            {profile.votes.map((vote) => (
              <article
                className="profile-vote-card"
                key={vote.id}
              >
                <EntityImage
                  className="profile-ship-image"
                  src={vote.ship.imageUrl}
                  alt={vote.ship.name}
                />

                <div className="profile-vote-content">
                  <div className="profile-vote-heading">
                    <div>
                      <span
                        className={
                          vote.ship.isKnown
                            ? "ship-status known"
                            : "ship-status alternative"
                        }
                      >
                        {vote.ship.isKnown
                          ? "Ship conhecido"
                          : "Combinação da comunidade"}
                      </span>

                      <h3>{vote.ship.name}</h3>
                    </div>

                    <time dateTime={vote.createdAt}>
                      {formatVoteDate(vote.createdAt)}
                    </time>
                  </div>

                  <Link
                    className="profile-work-link"
                    to={`/works/${vote.work.slug}`}
                  >
                    {vote.work.title}
                  </Link>

                  <div className="profile-character-list">
                    {vote.ship.characters.map((character) => (
                      <div
                        className="profile-character"
                        key={character.id}
                      >
                        <EntityImage
                          className="profile-character-image"
                          src={character.imageUrl}
                          alt={character.name}
                        />

                        <span>{character.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>Você ainda não votou em nenhuma obra.</p>

            <Link className="primary-link" to="/works">
              Escolher meu primeiro ship
            </Link>
          </div>
        )}
      </section>
    </section>
  );
}