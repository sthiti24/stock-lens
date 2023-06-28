import React from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CompanyData({symbol,theme}){


   const [profile,setProfile] = React.useState({})

   React.useEffect(()=>{
    let isMounted = true
    const getCompanyData = async()=>{
        try{
              const comData =
               await axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=ci6vbfhr01quivobts8gci6vbfhr01quivobts90`)
    
              console.log(comData)
              if(isMounted){
                setProfile(comData.data)
              }
        }
        catch(err){
             console.error(err)
        }
      }

      getCompanyData();
    
   },[symbol])

   console.log("profile",profile)
  return (
    <div className='row border rounded shadow-sm p-4 mt-5'
    style={{color:theme?"black":"white",backgroundColor:theme?"white":"black"}}>
        <div className='col'>
            <div>
                <span className='fw-bold'>name: </span>
                {profile.name}
            </div>
            <div>
                <span className='fw-bold'>country: </span>
                {profile.country}
            </div>
            <div>
                <span className='fw-bold'>ticker: </span>
                {profile.ticker}
            </div>

        </div>
        <div className='col'>
            <div>
                <span className='fw-bold'>Exchange: </span>
                {profile.exchange}
            </div>
            <div>
                <span className='fw-bold'>Industry: </span>
                {profile.finnhubIndustry}
            </div>
            <div>
                <span className='fw-bold'>IPO: </span>
                {profile.ipo}
            </div>

        </div>
        <div className='col'>
            <div>
                <span className='fw-bold'>MarketCap: </span>
                {profile.marketCapitalization}
            </div>
            <div>
                <span className='fw-bold'>Shares Outstanding: </span>
                {profile.shareOutstanding}
            </div>
            <div>
                <span className='fw-bold'>web URL: </span>
                <a href={profile.weburl}>{profile.weburl}</a>
            </div>

        </div>

    </div>
  )
}
