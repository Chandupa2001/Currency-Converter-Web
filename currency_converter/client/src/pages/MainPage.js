import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MainPage() {
  const [date, setDate] = useState(null);
  const [sourceCurrency, setSourceCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [amountInScourceCurrency, setAmountInSourceCurrency] = useState(0);
  const [amountInTargetCurrency, setAmountInTargetCurrency] = useState(0);
  const [currencyNames, setCurrencyNames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Currency Converter"
    const getCurrencyNames = async () => {
      try {
        const responce = await axios.get(
          "http://localhost:5000/getAllCurrencies"
        );
        setCurrencyNames(responce.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCurrencyNames();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responce = await axios.get("http://localhost:5000/convert", {
        params: {
          date,
          sourceCurrency,
          targetCurrency,
          amountInScourceCurrency,
        },
      });
      console.log(responce.data);
      setAmountInTargetCurrency(responce.data);
      setLoading(false);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className=" lg:mx-32 text-5xl font-bold text-green-500">
        Convert Your Currency
      </h1>

      <div className=" mt-16 flex items-center justify-center flex-col">
        <section className="w-full lg:w-1/2">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor={date}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Date
              </label>
              <input
                type="Date"
                id={date}
                name={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                placeholder="name@flowbite.com"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor={sourceCurrency}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Source Currency
              </label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                name={sourceCurrency}
                id={sourceCurrency}
                value={sourceCurrency}
                onChange={(e) => setSourceCurrency(e.target.value)}
              >
                <option value="">Select source currency</option>
                {Object.keys(currencyNames).map((currency) => (
                  <option className="p-1" key={currency} value={currency}>
                    {currencyNames[currency]}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor={targetCurrency}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Target Currency
              </label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                name={targetCurrency}
                id={targetCurrency}
                value={targetCurrency}
                onChange={(e) => setTargetCurrency(e.target.value)}
              >
                <option value="">Select target currency</option>
                {Object.keys(currencyNames).map((currency) => (
                  <option className="p-1" key={currency} value={currency}>
                    {currencyNames[currency]}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor={amountInScourceCurrency}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Amount in source currency
              </label>
              <input
                type="text"
                id={amountInScourceCurrency}
                name={amountInScourceCurrency}
                onChange={(e) => setAmountInSourceCurrency(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                placeholder="Amount in source currency"
                required
              />
            </div>
            <button className=" bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md">
              Get the target currency
            </button>
          </form>
          {!loading ?  
          <div className="mb-4 py-5">
            <text className=" mb-2 text-sm text-gray-900 dark:text-white">
              {amountInScourceCurrency} {sourceCurrency} ={" "}
              <text className="font-medium text-2xl text-red-600">{amountInTargetCurrency} </text> {targetCurrency}
            </text>
          </div> : " "}
        </section>
      </div>
    </div>
  );
}
