import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import CandleChart from './CandleChart'
import CompanyData from './CompanyData'
import moon from '../images/moon.png'
import sun from '../images/sun.png'


export default function  Details(){

  const {symbol}= useParams()
 
  const [closePrice,setCloseprice] = useState([])
 
  const [time,setTime] = useState([])

  const [theme,setTheme] = useState(localStorage.getItem("theme"))
 

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
        console.log(theme) 
        
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
   <div style={{display:"flex",flexDirection:"column",
   alignItems:"center",justifyContent:"center",backgroundColor:theme?"white":"black"}}>

    <button style={{border:"2px solid black",
                    height:"50px",width:"60px",border:"none",top:"10px",backgroundColor:theme?"white":"black",marginRight:"-90%"
                    }}
              onClick={()=>{setTheme(!theme)}}
      ><img style={{position:"relative",height:"100%",width:"100%",borderRadius:"50%"}} src={theme?moon:sun} alt="theme"/></button>

    <h1 style={{color:theme?"black":"white"}}>STOCK DETAILS</h1>
    <div style={{position:"relative",width:"100%"}}>
      {time
       &&<div style={{position:"relative",width:"100%"}}> <CandleChart coordinates = {newArray} symbol = {symbol}/> </div>
       }
      {<CompanyData symbol={symbol} theme={theme}/>}
    </div>
    </div> 
  )
}


