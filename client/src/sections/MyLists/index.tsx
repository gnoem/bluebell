import { useAppDispatch, useAppSelector } from "app/hooks";
import { Icon, Section } from "components";
import { selectLists } from "features/lists";
import { goto } from "features/navigation";
import { IListData, ISectionProps } from "types";
import styles from "./MyLists.module.css";

const MyLists: React.FC<ISectionProps> = ({ title }): JSX.Element => {
  const lists = useAppSelector(selectLists);
  const dispatch = useAppDispatch();

  const createListButton = (data: IListData): JSX.Element => {
    const viewList = () => dispatch(goto({
      componentName: 'ViewList',
      sectionTitle: data.name,
      data
    }));
    const editList = () => dispatch(goto({
      componentName: 'ListForm',
      sectionTitle: data.name,
      data
    }));
    return (
      <li key={data.id}>
        <button onClick={viewList}>{data.name}</button>
        <button onClick={editList}><Icon.Pen /></button>
      </li>
    )
  }

  const headerButtons = [{
    Icon: Icon.Plus,
    ariaLabel: 'Add new list',
    onClick: () => dispatch(goto({
      componentName: 'ListForm',
      sectionTitle: 'Create a new list'
    }))
  }];
  
  return (
    <Section title={title} headerButtons={headerButtons}>
      <ul className={styles.AllLists}>
        {!lists.length ? <i>Loading...</i> : lists.map(createListButton)}
      </ul>
    </Section>
  )
}

export default MyLists;