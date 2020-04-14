export interface IPO {
  id?: number;
  stockExchangeId: string;
  stockCode: string;
  pricePerShare: number;
  numberOfShares: number;
  openDateTime: string;
  openDate?: string;
  openTime?: string;
  remarks?: string;
}
