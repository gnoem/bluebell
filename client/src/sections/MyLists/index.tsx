import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Icon, Section } from "../../components";
import { loadListsAsync, selectLists } from "../../features/lists/listsSlice";
import { goto } from "../../features/navigation";
import { IListData, ISectionProps } from "../../types";
import styles from "./MyLists.module.css";

const MyLists: React.FC<ISectionProps> = ({ title }): JSX.Element => {
  const lists = useAppSelector(selectLists);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadListsAsync());
  }, [dispatch]);

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
  
  return (
    <Section title={title}>
      <ul className={styles.AllLists}>
        {!lists.length ? <i>Loading...</i> : lists.map(createListButton)}
      </ul>
    </Section>
  )
}

export default MyLists;