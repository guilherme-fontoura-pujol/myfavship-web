export interface ProfileCharacter {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
}

export interface ProfileVote {
  id: string;
  createdAt: string;

  work: {
    id: string;
    title: string;
    slug: string;
    coverImageUrl: string | null;
  };

  ship: {
    id: string;
    name: string;
    imageUrl: string | null;
    isKnown: boolean;
    characters: ProfileCharacter[];
  };
}

export interface ProfileResponse {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";

  stats: {
    votes: number;
    knownShips: number;
    unknownShips: number;
    worksVoted: number;
  };

  votes: ProfileVote[];
}