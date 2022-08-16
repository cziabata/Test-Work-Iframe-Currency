/* import { useState, useEffect } from "react";
import * as CryptoJS from "crypto-js";
import Hex from "crypto-js/enc-hex";
import axios from "axios";
import { nanoid } from 'nanoid';
import { useCryptoExchangeGenerator } from "./utils";


const PUBLIC_KEY = "000071a34ddb38922c427e2c4b9cfa0735f9c456";
const PRIVATE_KEY = 'UvdvS3KF7zTFKdbGzDoIDgz7P4XDSQSBWv25crzu';


function App() {

  const [firstCurrency, setFirstCurrency] = useState("");
  const [availableExchangePairs, setavailableExchangePairs] = useState();
  const [isLoadedData, setIsLoadedData] = useState(false);
  const [selectedPair, setSelectedPair] = useState()

  const {generateSignature} = useCryptoExchangeGenerator();

  useEffect(() => {
    const body = {
      from: "CARDUAH",
      to: "BTC",
      fromAmount: 6500,
    };
    const now = +new Date();
    const keys = Object.keys(body).sort();
    let initString = "";
    let parametersSequence = "";
    // for (let i = 0; i < keys.length; i++) {
    //   if (!body[keys[i]] || typeof body[keys[i]] === "object") {
    //     continue;
    //   }
    //   initString +=
    //     keys[i].toLowerCase() + body[keys[i]].toString().toLowerCase();
    //   parametersSequence += keys[i] + " | ";
    // }

    initString += "timestamp" + now;
    parametersSequence += "timestamp";

    const signature = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA512, PUBLIC_KEY);
    signature.update(initString);
    axios
      .get("https://api.abex.pro/api/v3/get-pairs-info", {Header: {"public-key": PUBLIC_KEY,
          "timestamp": now,
          "signature": signature.finalize().toString(Hex)
      }})
      .then((res) => {
        console.log(res)
        setavailableExchangePairs(res);
        setIsLoadedData(true);
      });
  },[]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      from: "USDTERC20",
      to: "BTC",
      fromAmount: 6500,
    };
    const now = +new Date();
    const keys = Object.keys(body).sort();
    let initString = "";
    let parametersSequence = "";

    initString += "timestamp" + now;
    parametersSequence += "timestamp";

    const signature = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA512, PUBLIC_KEY);
    signature.update(initString);
    axios
      .get("https://api.abex.pro/api/v3/get-pair-info", {
        Path: {
          currency_from: "USDTERC20",
          currency_to: "BTC"
        },
        Query: {
          rateType: "FLOATING",
          fromnetwork: "ETH",
          tonetwork: null,
        },
        Header: {
          "public-key": PUBLIC_KEY,
          "timestamp": now,
          "signature": signature.finalize().toString(Hex)
      },
      
    })
      .then((res) => {
        console.log(res)
      });
  };
  const handleChange = (e) => {
    
  };

  return (
    <div>
      <form id="exchangePairsForm" onSubmit={handleSubmit}>
        <label>Choose a currency:</label>
        <select id="exchangePairs" name="currencyList" onChange={handleChange} value={firstCurrency}>
          {
            isLoadedData && availableExchangePairs.data.map(pair => 
              <option key={nanoid()} value={pair} >
                {`From ${pair.from} to ${pair.to}`}
              </option>)
          }
        </select>
        <input type="submit" value="Send" />
      </form>
    </div>
  );
}

export default App;

 */