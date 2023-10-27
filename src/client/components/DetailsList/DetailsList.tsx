import { SetStateAction } from "react";
import { Item } from "../../reducers/financeReducer";
import DetailsListItem from "../DetailsListItem";
import { Dispatch } from "react";

interface DetailsListProps {
  items: Array<Item>;
  setSelectedItem: Dispatch<SetStateAction<Item>>;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const DetailsList = ({ items, setSelectedItem, setModalOpen }: DetailsListProps ): JSX.Element => {
  return (
    <ul
      style={{
        listStyleType: 'none',
        padding: 0,
      }}
    >
      {items.map(item => 
        <DetailsListItem
          item={item}
          key={item._id}
          setSelectedItem={setSelectedItem}
          setModalOpen={setModalOpen}
        />)
      }
    </ul>
  )
};

export default DetailsList;