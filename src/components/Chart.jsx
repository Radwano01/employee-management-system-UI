import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import "../style/Chart.scss"

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
        position: 'top',
        },
        title: {
        display: false,
        text: 'Chart.js Bar Chart',
        },
    },
};

const Chart = ({chartData}) => {
    const array = []
    chartData.map((data)=>{
      return(
        array.push(data.level)
      )
    })
    const getOrderCount = (arr, value)=>{
        return arr.filter((n)=> n === value).length
    }
    const junior = getOrderCount(array, "Junior");
    const minJunior = getOrderCount(array, "Mid-Junior");
    const senior = getOrderCount(array, "Senior");

    const data = {
        labels:["Juniors", "Mid-Juniors", "Seniors"],
        datasets: [
          {
            label: 'Level Count',
            data: [junior, minJunior, senior],
            backgroundColor: 'rgb(27, 27, 27)',
          },
        ],
    };

  return (
    <div className='chart'>
        <div className="chart-card">
            <h3>Levels Chart</h3>
            <Bar options={options} data={data} />
        </div>
    </div>
  )
}

export default Chart