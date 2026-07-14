export interface DashboardCharacter {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
}

export interface DashboardShip {
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

  characters: DashboardCharacter[];
  aliases: string[];
}

export interface DashboardWork {
  position: number;
  id: string;
  title: string;
  slug: string;
  coverImageUrl: string | null;
  releaseYear?: number | null;
  category:
  | string
  | {
      id: string;
      name: string;
    };
  votes: number;
  ships: number;
  characters?: number;
}

export interface DashboardResponse {
  topShips: DashboardShip[];
  topWorks: DashboardWork[];
  mostDiverseWorks: DashboardWork[];

  stats: {
    works: number;
    characters: number;
    ships: number;
    votes: number;
  };
}