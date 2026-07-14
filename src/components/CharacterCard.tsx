import type { WorkCharacter } from "../types/work";
import { EntityImage } from "./EntityImage";

interface CharacterCardProps {
  character: WorkCharacter;
  isSelected?: boolean;
  onSelect?: (character: WorkCharacter) => void;
}

export function CharacterCard({
  character,
  isSelected = false,
  onSelect,
}: CharacterCardProps) {
  return (
    <button
      type="button"
      className={
        isSelected
          ? "character-card selected"
          : "character-card"
      }
      onClick={() => onSelect?.(character)}
    >
      <EntityImage
        className="character-card-image"
        src={character.imageUrl}
        alt={character.name}
      />

      <span className="character-card-name">
        {character.name}
      </span>

      {isSelected && (
        <span className="selected-indicator">
          Selecionado
        </span>
      )}
    </button>
  );
}