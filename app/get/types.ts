export interface ListCoins {
    timezone: string;
    serverTime: number;
    rateLimits: any[]; // Array of RateLimit objects
    exchangeFilters: any[]; // You can replace 'any' with a more specific type if you have details about the exchange filters
    symbols: Symbol[];
}

interface Symbol {
    symbol: string;
    status: string;
    baseAsset: string;
    baseAssetPrecision: number;
    quoteAsset: string;
    quotePrecision: number;
    quoteAssetPrecision: number;
    orderTypes: string[];
    icebergAllowed: boolean;
    ocoAllowed: boolean;
    quoteOrderQtyMarketAllowed: boolean;
    allowTrailingStop: boolean;
    cancelReplaceAllowed: boolean;
    isSpotTradingAllowed: boolean;
    isMarginTradingAllowed: boolean;
    filters: any[]; // Replace 'any' with a specific type if available
    permissions: string[];
    defaultSelfTradePreventionMode: string;
    allowedSelfTradePreventionModes: string[];
}

export interface OrderBook {
    lastUpdateId: number;
    bids: [string, string][];
    asks: [string, string][];
}
