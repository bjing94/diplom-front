import { ProductResponseDto } from "../menu/menu.interface";

export interface CookingRequestFindQueryRequest {
  readonly status: CookingRequestStatus;
}

export interface CookingRequestFindQueryResponse {
  readonly requests: CookingRequestGetQueryResponse[];
}

export interface CookingRequestGetQueryRequest {
  readonly id: string;
}

export interface CookingRequestGetQueryResponse {
  readonly id: string;

  readonly product: ProductResponseDto;

  readonly status: CookingRequestStatus;
}

export enum CookingRequestStatus {
  PENDING = "PENDING",
  READY = "READY",
}

export interface CookingRequestUpdateCommandRequest {
  readonly id: string;

  readonly status: CookingRequestStatus;
}

export interface CookingRequestUpdateCommandResponse {
  readonly id: string;
}
