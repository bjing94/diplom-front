export interface ProductResponseDto {
  readonly id?: string;

  readonly name: string;

  readonly price: number;
}

export interface MenuItemResponseDto {
  readonly id: string;

  readonly product: ProductResponseDto;

  readonly available: boolean;

  readonly price: number;
}

export interface MenuResponseDto {
  readonly id: string;

  readonly items: MenuItemResponseDto[];

  readonly active: boolean;
}

export interface MenuGetQueryRequest {
  readonly id: string;
}

export interface MenuGetQueryResponse {
  readonly menu: MenuResponseDto;
}
