import { Item } from "../../reducers/financeReducer";
import { Dispatch, SetStateAction } from 'react';
import './DetailsListItem.css';

interface DetailsListItemProps {
  item: Item;
  setSelectedItem: Dispatch<SetStateAction<Item>>;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const DetailsListItem = ({ item, setSelectedItem, setModalOpen }: DetailsListItemProps ): JSX.Element => {

  const handleClick = () => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const dateDisplay = (itemDate: string) => {
    const date = new Date(itemDate);
    return `${date.getMonth() + 1}/${date.getDate()}`
  };

  return (
    <li className='list-item'>
      <button onClick={handleClick}>
        <span className='date-desc'>
          <span>{dateDisplay(item.date)}</span>
          <span>{item.description.length > 18 ? item.description.slice(0, 16) + '...' : item.description}</span>
        </span>
        <span>{item.amount}</span>
      </button>
    </li>
  )
};

export default DetailsListItem;