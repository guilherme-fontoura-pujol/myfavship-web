import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";

import { EntityImage } from "../components/EntityImage";
import { searchAll } from "../services/search.service";

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";

  const searchQuery = useQuery({
    queryKey: ["search", query],
    queryFn: () => searchAll(query),
    enabled: query.length >= 2,
    staleTime: 30_000,
  });

  if (query.length < 2) {
    return (
      <section className="content-container search-page">
        <header className="page-heading">
          <p className="eyebrow">Pesquisa</p>
          <h1>Digite pelo menos dois caracteres</h1>
        </header>
      </section>
    );
  }

  return (
    <section className="content-container search-page">
      <header className="page-heading">
        <p className="eyebrow">Pesquisa global</p>
        <h1>Resultados para “{query}”</h1>

        <p>
          Buscando em obras, personagens, ships e aliases.
        </p>
      </header>

      {searchQuery.isLoading && (
        <p className="status-message">
          Pesquisando...
        </p>
      )}

      {searchQuery.isError && (
        <div className="status-message error-message">
          <p>Não foi possível realizar a pesquisa.</p>

          <button
            type="button"
            onClick={() => searchQuery.refetch()}
          >
            Tentar novamente
          </button>
        </div>
      )}

      {searchQuery.data && (
        <>
          <div className="search-totals">
            <span>
              <strong>{searchQuery.data.totals.works}</strong>
              obras
            </span>

            <span>
              <strong>
                {searchQuery.data.totals.characters}
              </strong>
              personagens
            </span>

            <span>
              <strong>{searchQuery.data.totals.ships}</strong>
              ships
            </span>
          </div>

          <section className="search-section">
            <h2>Obras</h2>

            {searchQuery.data.works.length > 0 ? (
              <div className="search-result-list">
                {searchQuery.data.works.map((work) => (
                  <Link
                    className="search-result-card"
                    to={`/works/${work.slug}`}
                    key={work.id}
                  >
                    <EntityImage
                      className="search-result-image"
                      src={work.coverImageUrl}
                      alt={work.title}
                    />

                    <div>
                      <p className="card-category">
                        {work.category}
                      </p>

                      <h3>{work.title}</h3>

                      {work.releaseYear && (
                        <span>{work.releaseYear}</span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="empty-state">
                Nenhuma obra encontrada.
              </p>
            )}
          </section>

          <section className="search-section">
            <h2>Personagens</h2>

            {searchQuery.data.characters.length > 0 ? (
              <div className="search-result-list">
                {searchQuery.data.characters.map(
                  (character) => (
                    <Link
                      className="search-result-card"
                      to={`/works/${character.work.slug}`}
                      key={character.id}
                    >
                      <EntityImage
                        className="search-result-image"
                        src={character.imageUrl}
                        alt={character.name}
                      />

                      <div>
                        <p className="card-category">
                          {character.work.title}
                        </p>

                        <h3>{character.name}</h3>
                        <span>{character.gender}</span>
                      </div>
                    </Link>
                  )
                )}
              </div>
            ) : (
              <p className="empty-state">
                Nenhum personagem encontrado.
              </p>
            )}
          </section>

          <section className="search-section">
            <h2>Ships</h2>

            {searchQuery.data.ships.length > 0 ? (
              <div className="search-result-list">
                {searchQuery.data.ships.map((ship) => (
                  <Link
                    className="search-result-card"
                    to={`/works/${ship.work.slug}`}
                    key={ship.id}
                  >
                    <EntityImage
                      className="search-result-image"
                      src={ship.imageUrl}
                      alt={ship.name}
                    />

                    <div>
                      <p className="card-category">
                        {ship.work.title}
                      </p>

                      <h3>{ship.name}</h3>

                      <span>
                        {ship.votes}{" "}
                        {ship.votes === 1
                          ? "voto"
                          : "votos"}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="empty-state">
                Nenhum ship encontrado.
              </p>
            )}
          </section>
        </>
      )}
    </section>
  );
}