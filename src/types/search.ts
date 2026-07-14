export interface SearchWork {
  id: string;
  title: string;
  slug: string;
  coverImageUrl: string | null;
  releaseYear: number | null;
  category: string;
}

export interface SearchCharacter {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
  gender: "MALE" | "FEMALE" | "OTHER" | "UNKNOWN";

  work: {
    id: string;
    title: string;
    slug: string;
  };
}

export interface SearchShip {
  id: string;
  name: string;
  imageUrl: string | null;
  isKnown: boolean;
  votes: number;
  ranking: number | null;

  work: {
    id: string;
    title: string;
    slug: string;
    coverImageUrl: string | null;
    category: string;
  };

  characters: {
    id: string;
    name: string;
    slug: string;
    imageUrl: string | null;
  }[];

  aliases: string[];
}

export interface SearchResponse {
  query: string;
  works: SearchWork[];
  characters: SearchCharacter[];
  ships: SearchShip[];

  totals: {
    works: number;
    characters: number;
    ships: number;
  };
}