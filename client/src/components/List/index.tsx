import { Input } from "components";
import { IListData } from "types";
import styles from "./List.module.css";

const List: React.FC<IListData> = ({ members }) => {
  const createListItem = (label: string) => {
    return (
      <li key={label}>
        <Input.Checkbox
          behavior={{ checkboxFirst: true, listItem: true }}
          name={label}
          label={label}
          onChange={() => console.log(label)}
        />
      </li>
    )
  }
  return (
    <div className={styles.List}>
      <ul>
        {members.map(createListItem)}
      </ul>
    </div>
  )
}

export default List;