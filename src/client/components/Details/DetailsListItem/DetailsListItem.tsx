import { Item } from "../../../reducers/financeReducer";
import './DetailsListItem.css';

const DetailsListItem = ({item}: {item: Item}) => {
  return (
    <li className='list-item'>
      <button>
        <span>{item.description}</span>
        <span>{item.amount}</span>
      </button>
    </li>
  )
};

export default DetailsListItem;