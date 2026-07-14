export interface WorkSummary {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  coverImageUrl: string | null;
  releaseYear: number | null;

  category: {
    id: string;
    name: string;
  };
}

export interface WorkCharacter {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
  gender: "MALE" | "FEMALE" | "OTHER" | "UNKNOWN";
}

export interface WorkShip {
  id: string;
  name: string;
  imageUrl: string | null;
  isKnown: boolean;
  votes: number;
  ranking: number | null;

  characters: WorkCharacter[];
}

export interface WorkDetails {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  coverImageUrl: string | null;
  releaseYear: number | null;

  category: {
    id: string;
    name: string;
  };

  stats: {
    votes: number;
    ships: number;
    characters: number;
  };

  characters: WorkCharacter[];
  topShips: WorkShip[];
}