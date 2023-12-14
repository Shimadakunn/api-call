import axios from "axios";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

const BASE_URL = "https://api.binance.com";

interface DataCandle {
  date: number;
  high: number;
  low: number;
  open: number;
  close: number;
  volume: number;
}

const dbPromise: Promise<Database> = open({
  filename: "database.db",
  driver: sqlite3.Database,
});

async function setupDatabase(): Promise<void> {
  const db = await open({
    filename: "database.db",
    driver: sqlite3.Database,
  });
  await db.exec(`
        CREATE TABLE IF NOT EXISTS data_candles (
            Id INTEGER PRIMARY KEY,
            date INT, 
            high REAL, 
            low REAL, 
            open REAL, 
            close REAL, 
            volume REAL
        )
    `);
  await db.exec(`
    CREATE TABLE IF NOT EXISTS full_data_set (
        Id INTEGER PRIMARY KEY,
        uuid TEXT, 
        traded_crypto REAL, 
        price REAL,
        created_at_int INT, 
        side TEXT
    )
`);
  await db.exec(`
    CREATE TABLE IF NOT EXISTS last_checks (
        Id INTEGER PRIMARY KEY,
        exchange TEXT, 
        trading_pair TEXT, 
        duration TEXT,
        table_name TEXT, 
        last_check INT, 
        startdate INT, 
        last_id INT
    )
`);
}

async function refreshDataCandle(
  pair: string = "BTCUSD",
  duration: string = "5m"
): Promise<void> {
  const url = `${BASE_URL}/api/v1/klines?symbol=${pair}&interval=${duration}`;

  try {
    const response = await axios.get<DataCandle[]>(url);
    const candles = response.data;
    await storeCandleData(candles);
  } catch (error) {
    console.error("Error fetching candle data:", error);
  }
}

async function storeCandleData(candles: DataCandle[]): Promise<void> {
  const db = await dbPromise;

  for (const candle of candles) {
    const { date, open, high, low, close, volume } = candle;
    await db.run(
      `INSERT INTO data_candles (date, high, low, open, close, volume) VALUES (?, ?, ?, ?, ?, ?)`,
      [date, high, low, open, close, volume]
    );
  }
}
