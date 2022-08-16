import { useState, useEffect } from "react";
import axios from "axios";
import { useCryptoExchangeGenerator } from "./utils";

const PUBLIC_KEY = "000071a34ddb38922c427e2c4b9cfa0735f9c456";

function App() {

  const {generateSignature} = useCryptoExchangeGenerator();

  const [availableExchangePairs, setAvailableExchangePairs] = useState();
  const [isLoadedInitialData, setIsLoadedInitialData] = useState(false);
  const [choosenExchangePairKey, setChoosenExchangePairKey] = useState();

  const addKeysToAvailableExchangePairs = (pairs) => {
    let AvailableExchangePairsWithKeys = [];
    for(let i = 0; i < pairs.data.length; i++) { 
      AvailableExchangePairsWithKeys.push({
        key: i,
        itemData: pairs.data[i]
      })
    }
    setAvailableExchangePairs(AvailableExchangePairsWithKeys);
  }

  const getChoosenExchangePair = (key) => {
    return availableExchangePairs.filter(pair => pair.key.toString() === key.toString())[0].itemData
  }

  useEffect(() => {

    const body = {
      from: "CARDUAH",
      to: "BTC",
      fromAmount: 6500,
    };
   
    const {timestamp, signature} = generateSignature(body)
    
    axios.get("https://api.abex.pro/api/v3/get-pairs-info", {
      Header: {
        "public-key": PUBLIC_KEY,
        "timestamp": timestamp,
        "signature": signature
      }})
      .then((res) => {
        console.log(res)
        addKeysToAvailableExchangePairs(res);
        setIsLoadedInitialData(true);
      });
  },[]);

  const getExchangePairInfo = () => {

    let choosenPair = getChoosenExchangePair(choosenExchangePairKey);
    console.log(choosenPair.from)
    const body = {
      from: choosenPair.from,
      to: choosenPair.to,
      fromAmount: 6500,
    };
   
    const {timestamp, signature} = generateSignature(body)
    
    axios.get("https://api.abex.pro/api/v3/get-pair-info", {
      Path: {
        currency_from: choosenPair.from,
        currency_to: choosenPair.to
      },
      Query: {
        rateType: choosenPair.ratetype,
        fromnetwork: choosenPair.fromnetwork,
        tonetwork: choosenPair.tonetwork,
      },
      Header: {
        "public-key": PUBLIC_KEY,
        "timestamp": timestamp,
        "signature": signature
      }}).then(res=>console.log(res))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    getExchangePairInfo();
  }

  const handleChange = (e) => {
    setChoosenExchangePairKey(e.target.value)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <label>Choose a currency:</label>
        <select>
          {
            isLoadedInitialData && availableExchangePairs.map(pair => 
              <option key={pair.key} value={pair.key} >
                {`From ${pair.itemData.from} to ${pair.itemData.to}`}
              </option>)
          }
        </select>
        <input type="submit" value="Send" />
      </form>
    </div>
  );
}

export default App;

