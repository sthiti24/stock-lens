import React,{useState,useEffect} from 'react'
import Select from'react-select'
// import axios from 'axios'
import StockTable from './StockTable'
import { Table,Image, Container,Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import CompanyList from './Data.js'
import LogoLight from '../images/logo-light1.png'
import LogoDark from '../images/logo-dark1.png'
import moon from '../images/moon.png'
import sun from '../images/sun.png'

export default function Summary(){

  const [companyNameList,setCompanyNameList] = useState([])
  const [companySymbolList,setCompanySymbolList] = useState([])
  const [selectedOption, setSelectedOption] = useState();
  const [addCompany,setAddCompany] = useState([]
//  ( ["MICROSOFT CORP","APPLE INC","AMAZON.COM INC"] ) 
   );
  const [theme,setTheme] = useState(true)//lighttheme-true
  
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

   function handleSelect(data){
    setSelectedOption(data)
   }
useEffect(()=>{
  localStorage.setItem("theme",theme)
},[theme])

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
    <div style={{display:"flex",flexDirection:"column",
                 position:"relative",alignItems:"center",width:"100%",height:"100vh",
                 backgroundColor:theme?"white":"#111111"}}>

     <button style={{border:"2px solid black",
                    height:"50px",width:"60px",border:"none",top:"10px",backgroundColor:theme?"white":"black",
                    marginRight:"-90%",marginBottom:"20px"
                    }}
              onClick={()=>{setTheme(!theme)}}
      ><img style={{position:"relative",height:"100%",width:"100%",borderRadius:"50%"}} src={theme?moon:sun} alt="theme"/></button>

      <Image src = {theme?LogoLight:LogoDark} alt = "logo" xs = {6} md = {4} 
      style={{height:"250px",width:"350px",position:"relative",marginBottom:"7px"}} 
      fluid rounded/>

      <Container className='searchBox' style={{position:"relative",width:"70%"}}  fluid>
        
          <div className='dropdown' style={{width:"100%",textAlign:"center"}}>
                <Select 
                options = {optionList}
                placeholder = "Search company stock"
                value = {selectedOption}
                onChange={handleSelect}
                isSearchable = {true}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: state.isFocused ? 'blue' : 'grey',
                  }),
                }}
                />
              </div> 
         
           <div style={{marginTop:"10px",
                        display:"flex",flexDirection:"row",justifyContent:"space-evenly"}}>
               <Button  variant = "primary" onClick = {()=>addSelectedCompany(selectedOption,addCompany)}
                style={{width:"30%",boxShadow:"0 0 5px black"}}>Add</Button>
               <Button  variant = "danger" onClick = {()=>removeSelectedCompany(selectedOption,addCompany)}
               style={{width:"30%",boxShadow:"0 0 5px black"}}>Remove</Button>
           </div> 
      </Container>

      <div className='table' style={{marginTop:"20px"}}>

      <Table variant = {theme?"":"dark"}
      striped bordered hover
       responsive= "md">
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
