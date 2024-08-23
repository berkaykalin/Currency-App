import { useState } from "react";
import "../css/currency.css";
import { FaLongArrowAltRight } from "react-icons/fa";
import axios from "axios";

export default function Currency() {
  const BASE_URL = "https://api.freecurrencyapi.com/v1/latest";
  const API_KEY = "fca_live_51fPIkDOHpUHYyfxN5714c5GbvCkclrZbOv7nj6Z";

  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("TRY");
  const [result, setResult] = useState(0);

  const exchange = async () => {
    // console.log(amount)
    // console.log(fromCurrency)
    // console.log(toCurrency)

    const response = await axios.get(
      `${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurrency}`
    );
    const result = (response.data.data[toCurrency] * amount).toFixed(2);
    setResult(parseFloat(result));
  };

  return (
    <div className="currency-div">
      <div className="currency-header">
        <h3>EXCHANGE RATE APP</h3>
      </div>
      <div className="currency-body">
        <input
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
          type="number"
          className="amount"
        />
        <select
          onChange={(e) => setFromCurrency(e.target.value)}
          className="from-currency-option"
        >
          <option>USD</option>
          <option>EUR</option>
          <option>TRY</option>
        </select>
        <FaLongArrowAltRight className="arrow-icon" />
        <select
          onChange={(e) => setToCurrency(e.target.value)}
          className="to-current-option"
        >
          <option>TRY</option>
          <option>EUR</option>
          <option>USD</option>
        </select>

        <input
          value={result}
          readOnly={true}
          onChange={(e) => setResult(parseInt(e.target.value))}
          type="number"
          className="result"
        />
      </div>
      <div>
        <button onClick={exchange} className="exchange-button">
          Convert
        </button>
      </div>
    </div>
  );
}
