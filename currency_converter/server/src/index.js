require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors());


//all currencies
app.get("/getAllCurrencies", async (req, res) => {
    const nameURL = `https://openexchangerates.org/api/currencies.json?app_id=${process.env.API_KEY}`;

    try {
        const namesResponce = await axios.get(nameURL);
        const namedata = namesResponce.data;
    
        return res.json(namedata);

    } catch (error) {
        console.log(error)
    }
});

app.get("/convert", async (req,res) => {
    const {date, sourceCurrency, targetCurrency, amountInScourceCurrency } = req.query;

    try {

        const dataURL = `https://openexchangerates.org/api/historical/${date}.json?app_id=${process.env.API_KEY}`;

        console.log(dataURL);
        const dataresponce = await axios.get(dataURL);
        const rates = dataresponce.data.rates;

        //rates
        const sourceRate = rates[sourceCurrency];
        const targetRate = rates[targetCurrency];

        //target value
        const targetAmuont = (targetRate / sourceRate) * amountInScourceCurrency;

        return res.json(targetAmuont.toFixed(2));
    } catch (err) {
        console.error(err)
    }
})

//listen to a port
app.listen(5000 , () => {
    console.log("SERVER STARTED")
})


