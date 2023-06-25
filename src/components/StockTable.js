import React from 'react'
import axios from 'axios'
import { useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';



const StockList = (props) => {

  const [stockPrices, setStockPrices] = useState({})
  const navigate = useNavigate()
 
  // console.log(props.symbol)
  useEffect(()=>{
    const getData = async()=>
    { 
      try{
        const stockArray
        = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${props.symbol}&token=ci6vbfhr01quivobts8gci6vbfhr01quivobts90`)
  
        setStockPrices(stockArray.data)
      }
      catch(err){
        console.error(err)
      }
    
    }
  getData();
  },[])


function handleNavigate(symbol){
    navigate(`details/${symbol}`)
}
  
  return (
      
  <tr style={{cursor:"pointer"}} onClick={()=>handleNavigate(props.symbol)} 
    key = {props.symbol}>
    <td>{props.symbol}</td>
    <td>{stockPrices.c}</td>
    <td style={{color:stockPrices.d<0?"red":"green"}}>{stockPrices.d}</td>
    <td>{stockPrices.h}</td>
    <td>{stockPrices.l}</td>
    <td>{stockPrices.o}</td>
    <td>{stockPrices.pc}</td>
  </tr>
        
  )
}

export default StockList;