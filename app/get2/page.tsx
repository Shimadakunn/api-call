"use client";
import React, { useEffect, useState } from "react";
import fetchApi from "./fetchApi";
import { KlineData,Ticker } from "./types";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const Get = () => {
    const url = "https://api.binance.com/api/v3/";
  
    const [triggerFetchOB, setTriggerFetchOB] = useState(false);
    const [pair, setPair] = useState<string>("");
    const [duration, setDuration] = useState<string>("");
    const {
      data: dataOB,
      loading: loadingOB,
      error: errorOB,
      refetch: refetchOB,
    } = fetchApi<KlineData[]>(url + `klines?symbol=${pair}&interval=${duration}`, triggerFetchOB);
    const OB = () => {
        console.log("duration"+duration);
      setTriggerFetchOB(true);
      refetchOB();
      setTriggerFetchOB(false);
    };

    const [triggerFetchTicker, setTriggerFetchTicker] = useState(false);
    const [ticker, setTicker] = useState<string>("");
    const {
      data: dataTicker,
      loading: loadingTicker,
      error: errorTicker,
      refetch: refetchTicker,
    } = fetchApi<Ticker>(url + `ticker/price?symbol=${ticker}`, triggerFetchTicker);
    const Ticker = () => {
        console.log("duration"+duration);
      setTriggerFetchTicker(true);
      refetchTicker();
      setTriggerFetchTicker(false);
    };
    return(
        <div className="h-[95vh] w-full flex items-center justify-around">
            <Card>
        <CardHeader>
          <CardTitle>Get Coin List</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingOB && <p>Loading...</p>}
          {errorOB && <p>Error: {errorOB}</p>}
          {dataOB && (
            <ScrollArea className="h-72 w-48 rounded-md border">
              <ul>
                {dataOB.map((ob, index) => (
                    <li key={index}>
                        Kline open time: {ob[0]}
                        USD
          <br/>
                        Open price: {ob[1]}
                        USD
          <br/>
                        High price: {ob[2]}
                        USD
          <br/>
                        Low price: {ob[3]}
                        USD
          <br/>
                        Close price: {ob[4]}
                        USD
          <br/>
                    </li>
                ))}
              </ul>
            </ScrollArea>
          )}
          Duration:
          <Input onChange={(e: any) => setDuration(e.target.value)} />
            Pair:
          <Input onChange={(e: any) => setPair(e.target.value)} />
        </CardContent>
        <CardFooter>
          <Button onClick={() => OB()}>Get</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Get Coin List</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingTicker && <p>Loading...</p>}
          {errorTicker && <p>Error: {errorTicker}</p>}
          {dataTicker && (<>
            Price:
          {dataTicker.price}
          USD
          <br/>
          </>
          )}
            Ticker:
          <Input onChange={(e: any) => setTicker(e.target.value)} />
        </CardContent>
        <CardFooter>
          <Button onClick={() => Ticker()}>Get</Button>
        </CardFooter>
      </Card>
        </div>
    )
}
export default Get;