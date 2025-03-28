export interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  priceUsd: string;
  marketCapUsd: string;
  changePercent24Hr: string;
  supply?: string;
  maxSupply?: string;
}

export interface PortfolioItem {
  coin: ICoin;
  amount: number;
  valueAtBuy: number;
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
  perPage: number;
  onNext: () => void;
  onPrev: () => void;
  onSetPage: (page: number) => void;
  onSetPerPage: (value: number) => void;
  totalPages?: number;
  totalItems?: number;
  showOnlyArrows?: boolean;
}

export interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  onBack?: () => void;
}

export interface CoinChartProps {
  history: { time: number; priceUsd: string }[];
  interval: "h1" | "h12" | "d1";
  onIntervalChange: (value: "h1" | "h12" | "d1") => void;
}

export interface CoinHeaderProps {
  name: string;
  symbol: string;
}

export interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface AddButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
