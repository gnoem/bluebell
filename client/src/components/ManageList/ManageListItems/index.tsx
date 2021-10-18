import { SetStateAction, useEffect, useRef, useState } from "react";
import { Icon } from "components";
import { newArrayFrom, newObjectFrom } from "utils";
import { convertListItemsArrayToTrackableList, convertTrackableListToStringArray, IManageListData, ListItemData } from "../utils";
import styles from "./ListItems.module.css";

interface IManageListItemsProps {
  setFormData: React.Dispatch<SetStateAction<IManageListData>>;
  members: string[];
}

const ManageListItems: React.FC<IManageListItemsProps> = ({ setFormData, members }): JSX.Element => {
  const [listItems, setListItems] = useState<ListItemData[]>(convertListItemsArrayToTrackableList(members));

  const addListItem = (label: string): void => {
    setListItems(newArrayFrom<ListItemData>(listItems => {
      const labels = convertTrackableListToStringArray(listItems);
      labels.push(label);
      return convertListItemsArrayToTrackableList(labels);
    }));
  }

  const removeListItem = ([itemPrefix, itemLabel]: ListItemData): void => {
    setListItems(newArrayFrom<ListItemData>(listItems => {
      const index = listItems.findIndex(([prefix, label]) => (prefix === itemPrefix) && (label === itemLabel));
      const labels = convertTrackableListToStringArray(listItems);
      labels.splice(index, 1);
      return convertListItemsArrayToTrackableList(labels);
    }));
  }

  useEffect(() => {
    setFormData(newObjectFrom<IManageListData>(formData => {
      formData.members = convertTrackableListToStringArray(listItems);
    }));
  }, [listItems]);

  return (
    <div className={styles.ListItems}>
      <span className="label">List items:</span>
      <ListItems {...{ removeListItem, listItems }} />
      <AddListItem {...{ addListItem }} />
    </div>
  )
}

interface IListItemsProps {
  listItems: ListItemData[];
  removeListItem: (item: ListItemData) => void;
}

const ListItems: React.FC<IListItemsProps> = ({ removeListItem, listItems }): JSX.Element => {
  const listItemRefs = useRef<{ [id: string]: (HTMLLIElement | null) }>({});
  if (listItems.length < 1) return <div className={styles.listNote}>None yet!</div>;
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
      {listItems.map(createListItem)}
    </ul>
  )
}

const AddListItem: React.FC<{ addListItem: (label: string) => void; }> = ({ addListItem }): JSX.Element => {
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