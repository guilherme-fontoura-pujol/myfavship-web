import { useQuery } from "@tanstack/react-query";
import { WorkCard } from "../components/WorkCard";
import { getWorks } from "../services/works.service";

export function WorksPage() {
  const worksQuery = useQuery({
    queryKey: ["works"],
    queryFn: getWorks,
    staleTime: 60_000,
  });

  return (
    <section className="content-container listing-page">
      <header className="page-heading">
        <p className="eyebrow">Catálogo</p>
        <h1>Escolha uma obra</h1>

        <p>
          Entre em uma obra para selecionar dois personagens e
          registrar seu ship favorito.
        </p>
      </header>

      {worksQuery.isLoading && (
        <p className="status-message">
          Carregando obras...
        </p>
      )}

      {worksQuery.isError && (
        <div className="status-message error-message">
          <p>Não foi possível carregar as obras.</p>

          <button
            type="button"
            onClick={() => worksQuery.refetch()}
          >
            Tentar novamente
          </button>
        </div>
      )}

      {worksQuery.data && worksQuery.data.length > 0 && (
        <div className="work-grid catalog-grid">
          {worksQuery.data.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      )}

      {worksQuery.data?.length === 0 && (
        <p className="empty-state">
          Nenhuma obra foi cadastrada.
        </p>
      )}
    </section>
  );
}