export enum SortedOrder {
    Ascending = 0,
    Descending = 1,
    None = 2
  }
  
  export interface PaginatedDto {
    pageIndex: number;
    pagedItemsCount: number;
    orderKey: string | null;  
    sortedOrder: SortedOrder;
    search: string | null;  
  }
  