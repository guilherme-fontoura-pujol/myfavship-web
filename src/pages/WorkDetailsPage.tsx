import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import { CharacterCard } from "../components/CharacterCard";
import { EntityImage } from "../components/EntityImage";
import { ShipConfirmationModal } from "../components/ShipConfirmationModal";
import { useAuth } from "../contexts/AuthContext";
import { getWorkBySlug } from "../services/works.service";
import {
  createVote,
  getShipPreview,
} from "../services/votes.service";
import type { ShipPreviewResponse } from "../types/vote";
import type { WorkCharacter } from "../types/work";

function getRequestErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.error;

    if (typeof message === "string") {
      return message;
    }

    if (error.response?.status === 401) {
      return "Faça login para registrar seu voto.";
    }
  }

  return "Não foi possível concluir a operação.";
}

export function WorkDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();

  const [selectedCharacters, setSelectedCharacters] = useState<
    WorkCharacter[]
  >([]);

  const [preview, setPreview] =
    useState<ShipPreviewResponse | null>(null);

  const [successMessage, setSuccessMessage] = useState<string | null>(
    null
  );

  const workQuery = useQuery({
    queryKey: ["work", slug],
    queryFn: () => getWorkBySlug(slug!),
    enabled: Boolean(slug),
    staleTime: 60_000,
  });

  const previewMutation = useMutation({
    mutationFn: getShipPreview,

    onSuccess(data) {
      setPreview(data);
    },
  });

  const voteMutation = useMutation({
    mutationFn: createVote,

    async onSuccess() {
      setPreview(null);
      setSelectedCharacters([]);
      setSuccessMessage("Seu voto foi registrado com sucesso!");

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["work", slug],
        }),
        queryClient.invalidateQueries({
          queryKey: ["dashboard"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["rankings"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["profile"],
        }),
      ]);
    },
  });

  function toggleCharacter(character: WorkCharacter) {
    setSuccessMessage(null);

    setSelectedCharacters((current) => {
      const isAlreadySelected = current.some(
        (item) => item.id === character.id
      );

      if (isAlreadySelected) {
        return current.filter(
          (item) => item.id !== character.id
        );
      }

      if (current.length === 2) {
        return [current[1], character];
      }

      return [...current, character];
    });
  }

  function handleShipButton() {
    if (!workQuery.data || selectedCharacters.length !== 2) {
      return;
    }

    if (!isAuthenticated) {
      navigate("/login", {
        state: {
          from: location.pathname,
        },
      });

      return;
    }

    previewMutation.mutate({
      workId: workQuery.data.id,
      character1: selectedCharacters[0].id,
      character2: selectedCharacters[1].id,
    });
  }

  function handleConfirmVote() {
    if (!workQuery.data || selectedCharacters.length !== 2) {
      return;
    }

    voteMutation.mutate({
      workId: workQuery.data.id,
      characterIds: [
        selectedCharacters[0].id,
        selectedCharacters[1].id,
      ],
    });
  }

  if (workQuery.isLoading) {
    return (
      <section className="content-container status-message">
        Carregando obra...
      </section>
    );
  }

  if (workQuery.isError || !workQuery.data) {
    return (
      <section className="content-container status-message error-message">
        <h1>Não foi possível carregar a obra.</h1>

        <button
          type="button"
          onClick={() => workQuery.refetch()}
        >
          Tentar novamente
        </button>
      </section>
    );
  }

  const work = workQuery.data;
  const selectedPair =
    selectedCharacters.length === 2
      ? (selectedCharacters as [
          WorkCharacter,
          WorkCharacter,
        ])
      : null;

  return (
    <>
      <section className="work-hero">
        <div className="content-container work-hero-content">
          <EntityImage
            className="work-detail-cover"
            src={work.coverImageUrl}
            alt={work.title}
          />

          <div>
            <Link className="back-link" to="/works">
              ← Voltar às obras
            </Link>

            <p className="eyebrow">{work.category.name}</p>
            <h1>{work.title}</h1>

            {work.releaseYear && (
              <p className="release-year">
                Lançamento: {work.releaseYear}
              </p>
            )}

            <p className="work-description">
              {work.description ||
                "Esta obra ainda não possui descrição."}
            </p>

            <div className="work-stats">
              <span>
                <strong>{work.stats.characters}</strong>
                personagens
              </span>

              <span>
                <strong>{work.stats.ships}</strong>
                ships
              </span>

              <span>
                <strong>{work.stats.votes}</strong>
                votos
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="content-container characters-section">
        <header className="section-heading">
          <div>
            <p className="eyebrow">Seleção de personagens</p>
            <h2>Escolha seu casal favorito</h2>
          </div>
        </header>

        <p className="section-description">
          Selecione exatamente dois personagens. Clicar novamente
          remove a seleção.
        </p>

        {successMessage && (
          <div className="success-message" role="status">
            {successMessage}
          </div>
        )}

        <div className="selection-toolbar">
          <div className="selected-summary">
            {selectedCharacters.length === 0 && (
              <span>Nenhum personagem selecionado</span>
            )}

            {selectedCharacters.map((character, index) => (
              <span
                className="selected-character-chip"
                key={character.id}
              >
                {index === 1 && <span>♥</span>}
                {character.name}
              </span>
            ))}
          </div>

          <button
            type="button"
            className="ship-button"
            disabled={
              selectedCharacters.length !== 2 ||
              previewMutation.isPending
            }
            onClick={handleShipButton}
          >
            {previewMutation.isPending
              ? "Preparando..."
              : "SHIP ♥"}
          </button>
        </div>

        {previewMutation.isError && (
          <div className="form-error selection-error">
            {getRequestErrorMessage(previewMutation.error)}
          </div>
        )}

        <div className="character-grid">
          {work.characters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              isSelected={selectedCharacters.some(
                (item) => item.id === character.id
              )}
              onSelect={toggleCharacter}
            />
          ))}
        </div>
      </section>

      {preview && selectedPair && (
        <ShipConfirmationModal
          preview={preview}
          selectedCharacters={selectedPair}
          isSubmitting={voteMutation.isPending}
          errorMessage={
            voteMutation.isError
              ? getRequestErrorMessage(voteMutation.error)
              : null
          }
          onConfirm={handleConfirmVote}
          onClose={() => {
            if (!voteMutation.isPending) {
              setPreview(null);
              voteMutation.reset();
            }
          }}
        />
      )}
    </>
  );
}