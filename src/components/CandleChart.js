import Chart from 'react-apexcharts'

export default function CandleChart({coordinates,symbol}){
    const options ={
        title:{
            text:symbol,
            align: "center",
            style:{fontSize:"24px"}
        },
        Chart:{
            id:"stock-data",
            animations:{speed:1300}
        },
        xaxis:{
            type: "datetime"
        }
    }
    const series = [{name: symbol,
                     data:coordinates}]

        return(
            <div >
            <Chart options={options} series = {series}
             type="area" width = "100%" 
             />
          </div>
        )
}