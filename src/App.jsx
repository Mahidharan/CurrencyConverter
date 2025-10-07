import { useState } from "react";
import "./App.css";
import useCurrencyInfo from "./components/Hooks/useCurrencyInfo";
import InputBox from "./components/InputBox";

function App() {
  const [from, setFrom] = useState("usd");
  const [amount, setAmount] = useState(0);
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setTo(from);
    setFrom(to);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center
      bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(https://i.pinimg.com/1200x/92/aa/28/92aa286ccf6bb571e8f0c95b743913bd.jpg)`,
      }}
    >
      <div className="w-full">
        <div
          className="w-full max-w-md mx-auto 
        border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="from"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                onAmountChange={(amount) => setAmount(amount)}
                selectedCurrency={from}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                onClick={swap}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 
              border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
              >
                Swap
              </button>
            </div>
            <div className="w-full mb-1">
              <InputBox
                label="to"
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                amountDisabled
                amount={convertedAmount}
                selectedCurrency={to}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default App;
