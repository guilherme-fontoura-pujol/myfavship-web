import { api } from "../api/client";
import type {
  CreateVoteRequest,
  CreateVoteResponse,
  ShipPreviewResponse,
} from "../types/vote";

interface GetShipPreviewParams {
  workId: string;
  character1: string;
  character2: string;
}

export async function getShipPreview({
  workId,
  character1,
  character2,
}: GetShipPreviewParams): Promise<ShipPreviewResponse> {
  const response = await api.get<ShipPreviewResponse>(
    "/api/public/ships/preview",
    {
      params: {
        workId,
        character1,
        character2,
      },
    }
  );

  return response.data;
}

export async function createVote(
  data: CreateVoteRequest
): Promise<CreateVoteResponse> {
  const response = await api.post<CreateVoteResponse>(
    "/api/public/votes",
    data
  );

  return response.data;
}