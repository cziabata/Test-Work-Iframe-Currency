import * as CryptoJS from "crypto-js";
import Hex from "crypto-js/enc-hex";

const PUBLIC_KEY = "000071a34ddb38922c427e2c4b9cfa0735f9c456";

export function useCryptoExchangeGenerator() {
    const generateSignature = (requestBody= null) => {
        let initString = '';
        const timestamp = +new Date();
        if (requestBody) {
            const bodyKeys = Object.keys(requestBody).sort();
            bodyKeys.forEach(key => {
                if (key || typeof requestBody[key] !== "object")
                    initString +=
                        key.toLowerCase() + requestBody[key].toString().toLowerCase();
            })
        }
        initString += "timestamp" + timestamp;
        const signature = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA512, PUBLIC_KEY);
        signature.update(initString);
        return {timestamp, signature: signature.finalize().toString(Hex)};
    }
    return {generateSignature}
}