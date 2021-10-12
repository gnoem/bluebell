import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Icon, Section } from "../../components";
import { loadListsAsync, selectLists } from "../../features/lists/listsSlice";
import { IRawListData, ISectionProps } from "../../types";
import styles from "./MyLists.module.css";

const MyLists: React.FC<ISectionProps> = ({ title }): JSX.Element => {
  const lists = useAppSelector(selectLists);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadListsAsync());
  }, [dispatch]);

  const createListButton = ({ id, name }: IRawListData): JSX.Element => (
    <li key={id}>
      <button>{name}</button>
      <button><Icon.Pen /></button>
    </li>
  )
  
  return (
    <Section title={title}>
      <ul className={styles.AllLists}>
        {!lists.length ? <i>Loading...</i> : lists.map(createListButton)}
      </ul>
    </Section>
  )
}

export default MyLists;