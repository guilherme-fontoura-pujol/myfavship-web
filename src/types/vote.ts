import type { WorkCharacter } from "./work";

export interface PreviewKnownShip {
  exists: true;
  type: "KNOWN_SHIP";

  ship: {
    id: string;
    name: string | null;
    imageUrl: string | null;
    isKnown: boolean;

    aliases: {
      id: string;
      name: string;
    }[];

    characters: {
      character: WorkCharacter;
    }[];
  };
}

export interface PreviewCharacterPair {
  exists: false;
  type: "CHARACTER_PAIR";
  characters: WorkCharacter[];
}

export type ShipPreviewResponse =
  | PreviewKnownShip
  | PreviewCharacterPair;

export interface CreateVoteRequest {
  workId: string;
  characterIds: [string, string];
}

export interface CreateVoteResponse {
  id: string;
  userId: string;
  workId: string;
  shipId: string;
  createdAt: string;
}