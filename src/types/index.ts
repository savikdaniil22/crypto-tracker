export interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  priceUsd: string;
  marketCapUsd: string;
  changePercent24Hr: string;
}

export interface PortfolioItem {
  coin: ICoin;
  amount: number;
}

export interface PortfolioState {
  items: PortfolioItem[];
}

export type SortField = "priceUsd" | "marketCapUsd" | "changePercent24Hr";
export type SortOrder = "asc" | "desc";

export interface AddCoinModalProps {
  coin: ICoin | null;
  isOpen: boolean;
  onClose: () => void;
  onAdd: (amount: number) => void;
}

export interface CoinRowProps {
  coin: ICoin;
  onAddClick: (coin: ICoin) => void;
}

export interface CoinTableProps {
  coins: ICoin[];
  onAddClick: (coin: ICoin) => void;
  sortField: SortField | null;
  sortOrder: SortOrder;
  onSortChange: (field: SortField) => void;
}

export interface CoinTableHeaderProps {
  sortField: SortField | null;
  sortOrder: SortOrder | null;
  onSortChange: (field: SortField) => void;
}

export interface PaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  perPage: number;
  onNext: () => void;
  onPrev: () => void;
  onSetPage: (page: number) => void;
  onSetPerPage: (value: number) => void;
}
