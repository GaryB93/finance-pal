import DoughnutChart from "../DoughnutChart";
import Menu from '../Menu';
import Select from "../Select";
import './Summary.css';

const Summary = () => {
  const options = [
    {
      value: 'one',
      text: 'one',
    }
  ];

  return (
    <div className='summary'>
      <Menu/>
      <div id='doughnut-container'>
        <DoughnutChart/>
      </div>
      <Select
        label='Month'
        options={options}
        selected='one'
        styles={{ margin: '0 auto' }}
      />
    </div>
  )
};

export default Summary;