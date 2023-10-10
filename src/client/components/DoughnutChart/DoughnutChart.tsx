import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Data } from '../../utils/Data';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {

  return (
    <Doughnut
      data={Data}
    />
  )
};

export default DoughnutChart;