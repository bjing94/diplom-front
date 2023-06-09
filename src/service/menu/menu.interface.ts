export interface ProductResponseDto {
  readonly id: string;

  readonly name: string;

  readonly imgLink?: string;
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

export interface MenuItemUpdateRequestDto {
  readonly productId: string;

  readonly available: boolean;

  readonly price: number;
}

export interface MenuUpdateRequestDto {
  readonly items: MenuItemUpdateRequestDto[];

  readonly active: boolean;
}

export interface MenuUpdateCommandRequest {
  readonly id: string;

  readonly data: MenuUpdateRequestDto;
}

export interface MenuUpdateCommandResponse {
  readonly success: boolean;
}

export interface MenuItemCreateRequestDto {
  readonly productId: string;

  readonly available: boolean;

  readonly price: number;
}

export interface MenuCreateCommandRequest {
  readonly items: MenuItemCreateRequestDto[];
}

export interface MenuCreateCommandResponse {
  readonly success: boolean;
  readonly id?: string;
}

export interface MenuFindQueryRequest {
  id?: string;

  active?: boolean;
}

export interface MenuFindQueryResponse {
  readonly menus: MenuResponseDto[];
}
