import { Item } from "../../reducers/financeReducer";
import { Dispatch, SetStateAction } from 'react';
import './DetailsListItem.css';
import { formatDate } from "../../utils/formatDate";

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

  return (
    <li className='list-item'>
      <button onClick={handleClick}>
        <span>{formatDate(new Date(item.date))}</span>
        <span>{item.description}</span>
        <span>{item.amount}</span>
      </button>
    </li>
  )
};

export default DetailsListItem;