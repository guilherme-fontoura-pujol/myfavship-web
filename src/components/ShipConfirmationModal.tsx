import type { ShipPreviewResponse } from "../types/vote";
import type { WorkCharacter } from "../types/work";
import { EntityImage } from "./EntityImage";

interface ShipConfirmationModalProps {
  preview: ShipPreviewResponse;
  selectedCharacters: [WorkCharacter, WorkCharacter];
  isSubmitting: boolean;
  errorMessage: string | null;
  onConfirm: () => void;
  onClose: () => void;
}

export function ShipConfirmationModal({
  preview,
  selectedCharacters,
  isSubmitting,
  errorMessage,
  onConfirm,
  onClose,
}: ShipConfirmationModalProps) {
  const knownShip =
    preview.exists && preview.ship.isKnown && preview.ship.name;

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="confirmation-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-title"
      >
        <button
          type="button"
          className="modal-close-button"
          onClick={onClose}
          disabled={isSubmitting}
          aria-label="Fechar"
        >
          ×
        </button>

        <header className="modal-heading">
          <p className="eyebrow">Confirmar escolha</p>
          <h2 id="confirmation-title">Este é o seu ship?</h2>
        </header>

        {knownShip ? (
          <div className="known-ship-preview">
            <EntityImage
              className="known-ship-image"
              src={preview.ship.imageUrl}
              alt={preview.ship.name ?? "Ship"}
            />

            <h3>{preview.ship.name}</h3>

            {preview.ship.aliases.length > 0 && (
              <p>
                Também conhecido como{" "}
                {preview.ship.aliases
                  .map((alias) => alias.name)
                  .join(", ")}
              </p>
            )}
          </div>
        ) : (
          <div className="character-pair-preview">
            {selectedCharacters.map((character, index) => (
              <div
                className="confirmation-character"
                key={character.id}
              >
                <EntityImage
                  className="confirmation-character-image"
                  src={character.imageUrl}
                  alt={character.name}
                />

                <strong>{character.name}</strong>

                {index === 0 && (
                  <span className="ship-heart" aria-hidden="true">
                    ♥
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {errorMessage && (
          <div className="form-error" role="alert">
            {errorMessage}
          </div>
        )}

        <div className="modal-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Voltar
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Confirmando..." : "Confirmar voto"}
          </button>
        </div>
      </section>
    </div>
  );
}