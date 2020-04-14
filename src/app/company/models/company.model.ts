export interface Company {
  id?: number;
  name: string;
  sectorId: string;
  turnover: number;
  ceo: string;
  boardOfDirectors?: string;
  listedInStockExchanges?: string;
  briefWriteup?: string;
  deactivated?: string;
}
