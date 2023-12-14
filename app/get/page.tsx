"use client";
import React, { useEffect, useState } from "react";
import fetchApi from "./fetchApi";
import { ListCoins, OrderBook } from "./types";

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

  const [triggerFetchList, setTriggerFetchList] = useState(false);
  const {
    data: dataList,
    loading: loadingList,
    error: errorList,
    refetch: refetchList,
  } = fetchApi<ListCoins[]>(url + "exchangeInfo", triggerFetchList);
  const listCoin = () => {
    setTriggerFetchList(true);
    refetchList();
    setTriggerFetchList(false);
  };

  const [triggerFetchBid, setTriggerFetchBid] = useState(false);
  const [pair, setPair] = useState<string>("");
  const [direction, setDirection] = useState("bid");
  const {
    data: dataBid,
    error: errorBid,
    refetch: refetchBid,
  } = fetchApi<OrderBook[]>(url + `depth?symbol=${pair}`, triggerFetchBid);
  const getBid = () => {
    setTriggerFetchBid(true);
    refetchBid();
    setTriggerFetchBid(false);
  };
  return (
    <div className="h-[95vh] w-full flex items-center justify-around">
      <Card>
        <CardHeader>
          <CardTitle>Get Coin List</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingList && <p>Loading...</p>}
          {errorList && <p>Error: {errorList}</p>}
          {dataList && (
            <ScrollArea className="h-72 w-48 rounded-md border">
              <ul>
                {dataList.symbols.map((symbol, index) => (
                  <li key={index}>{symbol.baseAsset}</li>
                ))}
              </ul>
            </ScrollArea>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={() => listCoin()}>Get</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Get Coin List</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingList && <p>Loading...</p>}
          {errorList && <p>Error: {errorList}</p>}
          {dataBid && (
            <ScrollArea className="h-72 w-48 rounded-md border">
              <ul>
                {direction === "bid" ? (
                  <>
                    {dataBid.bids.map((bid, index) => (
                      <li key={index}>
                        Price: {bid[0]}, Quantity: {bid[1]}
                      </li>
                    ))}
                  </>
                ):(
                  <>
                    {dataBid.asks.map((ask, index) => (
                      <li key={index}>
                        Price: {ask[0]}, Quantity: {ask[1]}
                      </li>
                    ))}
                  </>
                )
                }
              </ul>
            </ScrollArea>
          )}
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light" onClick={() => setDirection("bid")}>
                Bid
              </SelectItem>
              <SelectItem value="dark" onClick={() => setDirection("ask")}>
                Ask
              </SelectItem>
            </SelectContent>
          </Select>
          <Input onChange={(e: any) => setPair(e.target.value)} />
        </CardContent>
        <CardFooter>
          <Button onClick={() => getBid()}>Get</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Get Coin List</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingList && <p>Loading...</p>}
          {errorList && <p>Error: {errorList}</p>}
          {dataBid && (
            <ScrollArea className="h-72 w-48 rounded-md border">
              <ul>
                Bids Values
                    {dataBid.bids.map((bid, index) => (
                      <li key={index}>
                        Price: {bid[0]}, Quantity: {bid[1]}
                      </li>
                    ))}
                Asks Values
                    {dataBid.asks.map((ask, index) => (
                      <li key={index}>
                        Price: {ask[0]}, Quantity: {ask[1]}
                      </li>
                    ))}
              </ul>
            </ScrollArea>
          )}
          <Input onChange={(e: any) => setPair(e.target.value)} />
        </CardContent>
        <CardFooter>
          <Button onClick={() => getBid()}>Get</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Get;
