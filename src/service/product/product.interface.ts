import { ProductResponseDto } from "../menu/menu.interface";

export interface ProductFindQueryRequest {
  readonly ids?: string[];

  readonly take: string;

  readonly skip: string;
}

export interface ProductFindQueryResponse {
  readonly products: ProductResponseDto[];
}

export interface ProductCreateRequest {
  readonly name: string;
  readonly imgLink?: string;
}
export interface ProductCreateResponse {
  readonly succes: boolean;
}

export interface ProductUpdateRequest {
  readonly id: string;

  readonly name: string;

  readonly imgLink?: string;
}
export interface ProductUpdateResponse {
  readonly success: boolean;
}

export interface ProductGetByIdQueryResponse {
  product: ProductResponseDto;
}
