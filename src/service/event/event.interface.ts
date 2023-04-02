export interface FindEventsFilterDto {
  readonly from: Date;

  readonly to: Date;
}

export interface EventResponse {
  readonly id: string;

  readonly objectId: string;

  readonly name: string;

  readonly payload: any;

  readonly createdAt: Date;

  readonly updatedAt: Date;
}
