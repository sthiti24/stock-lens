import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import CandleChart from './CandleChart'
import CompanyData from './CompanyData'


export default function  Details(){

  const {symbol}= useParams()
 
  const [closePrice,setCloseprice] = useState([])
 
  const [time,setTime] = useState([])
 

  useEffect(()=>{
    const getData = async()=>{
      try{

        const date = new Date();
        const currentTime = Math.floor(date.getTime()/1000)
        let oneDay;
        if(date.getDay()===7){
          oneDay = currentTime-(3*24*60*60)
        }
        else{
          oneDay = currentTime-(2*24*60*60)-20000
        }
        
        const candlesData
         =  await axios(`https://finnhub.io/api/v1/stock/candle?symbol=AAPL&resolution=1&from=${oneDay}&to=${currentTime}&token=ci6vbfhr01quivobts8gci6vbfhr01quivobts90`)

      
        setCloseprice(candlesData.data.c)
        setTime(candlesData.data.t)
         
        
  }
  catch(err){
        console.error(err)
  }
 
 }
 getData() 
 
  },[])

  const newArray = [];

  for(let i=0;i<closePrice.length;i++){
     const obj = {x: (time[i]*1000),
               y: closePrice[i]}
  
  newArray.push(obj)
}

console.log(newArray)

  return (
   <div>
    <h1>stock Details</h1>
    <div>
      {time
       &&<div> <CandleChart coordinates = {newArray} symbol = {symbol}/> </div>
       }
      {<CompanyData symbol={symbol}/>}
    </div>
    </div> 
  )
}


