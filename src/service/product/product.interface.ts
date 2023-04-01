import { ProductResponseDto } from "../menu/menu.interface";

export interface ProductFindQueryRequest {
  readonly ids?: string[];

  readonly take: number;

  readonly skip: number;
}

export interface ProductFindQueryResponse {
  readonly products: ProductResponseDto[];
}
