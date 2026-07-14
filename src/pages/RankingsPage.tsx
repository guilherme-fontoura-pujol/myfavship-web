import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { EntityImage } from "../components/EntityImage";
import {
  getTopShips,
  getTopWorks,
} from "../services/rankings.service";

export function RankingsPage() {
  const shipsQuery = useQuery({
    queryKey: ["rankings", "ships"],
    queryFn: getTopShips,
    staleTime: 60_000,
  });

  const worksQuery = useQuery({
    queryKey: ["rankings", "works"],
    queryFn: getTopWorks,
    staleTime: 60_000,
  });

  const isLoading =
    shipsQuery.isLoading || worksQuery.isLoading;

  const hasError =
    shipsQuery.isError || worksQuery.isError;

  return (
    <section className="content-container rankings-page">
      <header className="page-heading">
        <p className="eyebrow">Comunidade</p>
        <h1>Rankings do MyFavShip</h1>

        <p>
          Descubra os ships mais votados e as obras que mais
          movimentam a comunidade.
        </p>
      </header>

      {isLoading && (
        <p className="status-message">
          Carregando rankings...
        </p>
      )}

      {hasError && (
        <div className="status-message error-message">
          <p>Não foi possível carregar os rankings.</p>

          <button
            type="button"
            onClick={() => {
              shipsQuery.refetch();
              worksQuery.refetch();
            }}
          >
            Tentar novamente
          </button>
        </div>
      )}

      {shipsQuery.data && (
        <section className="ranking-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Ranking global</p>
              <h2>Ships mais votados</h2>
            </div>
          </div>

          {shipsQuery.data.length > 0 ? (
            <div className="ranking-list">
              {shipsQuery.data.map((ship, index) => (
                <article
                  className="ranking-row"
                  key={ship.id}
                >
                  <strong className="ranking-number">
                    {index + 1}
                  </strong>

                  <EntityImage
                    className="ranking-thumbnail"
                    src={ship.imageUrl}
                    alt={ship.name}
                  />

                  <div className="ranking-main-info">
                    <h3>{ship.name}</h3>

                    <Link to={`/works/${ship.work.slug}`}>
                      {ship.work.title}
                    </Link>

                    <span>{ship.work.category}</span>
                  </div>

                  <div className="ranking-votes">
                    <strong>{ship.votes}</strong>
                    <span>
                      {ship.votes === 1 ? "voto" : "votos"}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="empty-state">
              Nenhum ship recebeu votos ainda.
            </p>
          )}
        </section>
      )}

      {worksQuery.data && (
        <section className="ranking-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Obras populares</p>
              <h2>Mais votadas</h2>
            </div>
          </div>

          {worksQuery.data.length > 0 ? (
            <div className="ranking-list">
              {worksQuery.data.map((work, index) => {
                const category =
                  typeof work.category === "string"
                    ? work.category
                    : work.category.name;

                return (
                  <Link
                    className="ranking-row ranking-work-row"
                    to={`/works/${work.slug}`}
                    key={work.id}
                  >
                    <strong className="ranking-number">
                      {index + 1}
                    </strong>

                    <EntityImage
                      className="ranking-thumbnail work-thumbnail"
                      src={work.coverImageUrl}
                      alt={work.title}
                    />

                    <div className="ranking-main-info">
                      <h3>{work.title}</h3>
                      <span>{category}</span>

                      {work.releaseYear && (
                        <span>{work.releaseYear}</span>
                      )}
                    </div>

                    <div className="ranking-votes">
                      <strong>{work.votes}</strong>
                      <span>
                        {work.votes === 1 ? "voto" : "votos"}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="empty-state">
              Nenhuma obra recebeu votos ainda.
            </p>
          )}
        </section>
      )}
    </section>
  );
}