export interface IPagination {
  page: number;
  limit: number;
}

export interface IPaginationResult<T> extends IPagination {
  total: number;
  data: T[];
}

export interface ISearch {
  search: string;
}
