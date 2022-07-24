import React, { useEffect, useState, useRef } from "react";
import { makeRandomNumber } from "../utils";

function Ticker() {
  const [price, setPrice] = useState(0);
  const [color, setColor] = useState("green");

  useEffect(() => {
    const id = setInterval(() => setPrice(makeRandomNumber), 1000);
    return function () {
      clearInterval(id);
    };
  }, []);

  //using the useRef hook, we can be able to persist the previous price
  const prevPriceRef = useRef(price)

  //write a side effect with the price as the dependency
  useEffect(() => {

    // use current value of the ref
    const prevPrice = prevPriceRef.current

    if(price > prevPrice){
      setColor("green")
    } else if (price < prevPrice) {
      setColor("red")
    } else {
      setColor("black")
    }

    // set new value of ref as price --- does not trigger a re-render
    prevPriceRef.current = price
  }, [price])
  return (
    <div>
      <h1>TickerMaster</h1>
      <h2 style={{ color: color }}>Price: ${price}</h2>
    </div>
  );
}

export default Ticker;
