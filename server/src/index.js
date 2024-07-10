const express=require("express");
const cors=require("cors");
const axios=require("axios");

const app=express();

//middle wares

app.use(express.json());
app.use(cors());

//all currencies

app.get("/getAllCurrencies", async(req,res)=>{ //API call ekak dena nisaa method eka async wenna ooni
    const nameURL="https://openexchangerates.org/api/currencies.json?app_id=2609e48962db49dbb3d7d899bf4b2f3e";

    

    try{
   
    const namesResponce=await axios.get(nameURL);
    const nameData=namesResponce.data;
 
    return res.json(nameData);

    }catch(err){
        console.error(err);
    }
});

//get the target amount(get request ekk yawanna oni convert kiyna end point ekta)
app.get("/convert",async (req,res)=>{
   const { date,
    SourceCurrency,
    targetCurrency,
    amountInSourceCurrency}=req.query;

    try{
        const dataUrl = `https://openexchangerates.org/api/historical/${date}.json?app_id=2609e48962db49dbb3d7d899bf4b2f3e`;

        const dataResponce= await axios.get(dataUrl);
        const rates=dataResponce.data.rates;

        //rates
        const sourceRate=rates[SourceCurrency];
        const targetRate=rates[targetCurrency];

        //final target value
        const targetAmount= (targetRate/sourceRate)*amountInSourceCurrency;

        //calculate the target currency
        return res.json(targetAmount);
    }catch(err){
        console.error(err);
    }
});

//listen to a port

app.listen(5000,()=>{

    console.log("SERVER STARTED");
});