export type KlineData = [
    number,        // Kline open time
    string,        // Open price
    string,        // High price
    string,        // Low price
    string,        // Close price
    string,        // Volume
    number,        // Kline Close time
    string,        // Quote asset volume
    number,        // Number of trades
    string,        // Taker buy base asset volume
    string         // Taker buy quote asset volume
    // The last "unused" field is omitted
  ];

  export type Ticker ={
    symbol: string,
    price: number,
  }