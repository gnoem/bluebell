import { useAppDispatch, useAppSelector } from "app/hooks";
import { Icon, Section } from "components";
import { selectLists } from "features/lists";
import { section, goto } from "features/navigation";
import { IListData, ISectionHeaderButton } from "types";
import { getSection } from "utils";
import styles from "./MyLists.module.css";

const MyLists = getSection('MyLists', ({ title }): JSX.Element => {
  const lists = useAppSelector(selectLists);
  const dispatch = useAppDispatch();

  const createListButton = (data: IListData): JSX.Element => {

    const viewList = () => dispatch(goto(section('ViewList', {
      title: data.name,
      data
    })));

    const editList = () => dispatch(goto(section('ListForm', {
      title: data.name,
      data
    })));

    return (
      <li key={data.id}>
        <button onClick={viewList}>{data.name}</button>
        <button onClick={editList}><Icon.Pen /></button>
      </li>
    )
  }

  const headerButtons: ISectionHeaderButton[] = [{
    Icon: Icon.Plus,
    ariaLabel: 'Add new list',
    onClick: () => dispatch(goto(section('ListForm', {
      title: 'Create a new list',
      data: {
        user: 2
      }
    }))),
  }];
  
  return (
    <Section title={title} headerButtons={headerButtons}>
      <ul className={styles.AllLists}>
        {!lists.length ? <i>Loading...</i> : lists.map(createListButton)}
      </ul>
    </Section>
  )
});

export default MyLists;