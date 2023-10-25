import { Item } from "../../../reducers/financeReducer";
import DetailsListItem from "../DetailsListItem";

const DetailsList = ({items}: {items: Array<Item>}): JSX.Element => {
  return (
    <ul
      style={{
        listStyleType: 'none',
        padding: 0,
      }}
    >
      {items.map(item => 
        <DetailsListItem item={item} key={item._id} />
      )}
    </ul>
  )
};

export default DetailsList;