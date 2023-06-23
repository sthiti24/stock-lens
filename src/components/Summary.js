import React,{useState,useEffect} from 'react'
import Select from'react-select'
import axios from 'axios'
import StockTable from './StockTable'
import { Table } from 'react-bootstrap'
import CompanyList from './Data.js'

export default function Summary(){

  const [companyNameList,setCompanyNameList] = useState([])
  const [companySymbolList,setCompanySymbolList] = useState([])
  const [selectedOption, setSelectedOption] = useState();
  const [addCompany,setAddCompany] = useState( [] ||
    // ["MICROSOFT CORP","APPLE INC","AMAZON.COM INC"] ||
   localStorage.getItem("addCompany").split(",")
   );

  
  // const getCompany = async()=>{
  //   try{
  //         const stockData =
  //          (await axios.get('https://finnhub.io/api/v1/stock/symbol?exchange=US&token=ci6vbfhr01quivobts8gci6vbfhr01quivobts90')).data

  //          const companySymbol = stockData.map((item)=>{
  //           return item.symbol
  //          })

  //         setCompanyNameList(companySymbol)

  //         const companyNames = stockData.map((item)=>{
  //           return item.name
  //          })

  //         setCompanySymbolList(companyNames)
  //   }
  //   catch(err){
  //        console.err(err)
  //   }
  // }

  //  useEffect(()=>{
  //     getCompany();
    
  //  },[])

  // console.log(CompanyList)

   useEffect(()=>{
    const companyNames = CompanyList.map((item)=>{
      return item.description
     })

    setCompanyNameList(companyNames)

    const companySymbol = CompanyList.map((item)=>{
      return item.symbol
     })

    setCompanySymbolList(companySymbol)

    
  
    
   },[])

   useEffect(()=>
   {
    localStorage.setItem("addCompany",addCompany)
   },[addCompany])




   function handleSelect(data){
    setSelectedOption(data)
   }


  const optionList = companyNameList.map((item)=>{
    const obj = {value : item, label : item}
    return obj
  })

  function addSelectedCompany(selectedOption,addCompanyArr)
  {
    const index = addCompanyArr.indexOf(selectedOption.value)
      if (index === -1){
        setAddCompany([...addCompanyArr,selectedOption.value])
      }
  }

  function removeSelectedCompany(selectedOption,addCompanyArr){
      const index = addCompanyArr.indexOf(selectedOption.value)
      if (index !== -1){
        //addCompanyArr.splice(index,1)
        const newComArr = addCompanyArr.filter(item => item !== selectedOption.value); 
        setAddCompany(newComArr)
      }
      
  }
  return (
    <div>Summary

      <div className='searchBox'>
        
          <div className='dropdown'>
                <Select 
                options = {optionList}
                placeholder = "Search company stock"
                value = {selectedOption}
                onChange={handleSelect}
                isSearchable = {true}
                />
           </div>

      <button onClick = {()=>addSelectedCompany(selectedOption,addCompany)}>Add</button>
      <button onClick = {()=>removeSelectedCompany(selectedOption,addCompany)}>Remove</button>
      
      </div>

      <div className='table'>
      <Table striped bordered hover >
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Current Price</th>
            <th> Change</th>
            <th>Highest price</th>
            <th>Lowest Price</th>
            <th>Open price</th>
            <th>previous close price</th>
          </tr>
        </thead>
        <tbody>
           {addCompany.map((item)=>{
                  return   <StockTable symbol = {companySymbolList[companyNameList.indexOf(item)]}/>
           })}
           
        </tbody>
        </Table>
      </div>
      
      
    </div>
  )
  }
