import { useEffect, useRef, useState } from "react";
import { Icon } from "components";
import { ListItemData } from "components/ManageList";
import styles from "./ListItems.module.css";

interface IListItemsProps {
  addListItem: (listItem: string) => void;
  removeListItem: (listItem: ListItemData) => void;
  members: ListItemData[];
}

const ManageListItems: React.FC<IListItemsProps> = ({ addListItem, removeListItem, members }): JSX.Element => {
  return (
    <div className={styles.ListItems}>
      <span className="label">List items:</span>
      <ListItems {...{ removeListItem, members }} />
      <AddListItem {...{ addListItem }} />
    </div>
  )
}

const ListItems: React.FC<Omit<IListItemsProps, 'addListItem'>> = ({ removeListItem, members }): JSX.Element => {
  const listItemRefs = useRef<{ [id: string]: (HTMLLIElement | null) }>({});
  if (members.length < 1) return <div className={styles.listNote}>None yet!</div>;
  const getUniqueIdentifier = (listItem: ListItemData): string => listItem.join(':');
  const vanishListItem = (listItem: ListItemData): void => {
    listItemRefs.current[getUniqueIdentifier(listItem)]?.classList.add(styles.goodbye);
    setTimeout(() => {
      delete listItemRefs.current[getUniqueIdentifier(listItem)];
      removeListItem(listItem);
    }, 200);
  }
  const createListItem = (listItem: ListItemData): JSX.Element => {
    const uniqueIdentifier = getUniqueIdentifier(listItem);
    return (
      <li key={uniqueIdentifier} ref={(element) => listItemRefs.current[uniqueIdentifier] = element}>
        <div><button onClick={() => vanishListItem(listItem)}><Icon.Times /></button></div>
        <span>{listItem[1]}</span>
      </li>
    )
  }
  return (
    <ul>
      {members.map(createListItem)}
    </ul>
  )
}

const AddListItem: React.FC<Pick<IListItemsProps, 'addListItem'>> = ({ addListItem }): JSX.Element => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const toggleEditing = () => setEditing(x => !x);

  const [inputContent, setInputContent] = useState<string>('');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputContent(e.target.value);
  }

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (inputContent) addListItem(inputContent);
      setInputContent('');
    }
  }

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setEditing(false);
        setInputContent('');
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className={styles.taskinput}>
      <button className={`${styles.toggle} ${editing ? styles.editing : ''}`} onClick={toggleEditing}>
        <Icon.Times />
      </button>
      {editing ? (
        <div className={styles.input}>
          <input ref={inputRef} type="text" value={inputContent} onKeyDown={handleKeydown} onInput={handleInput} autoFocus></input>
        </div>
      ) : (
        <button className={styles[`toggle-caption`]} onClick={toggleEditing}>
          Add list item
        </button>
      )}
    </div>
  )
}

export default ManageListItems;