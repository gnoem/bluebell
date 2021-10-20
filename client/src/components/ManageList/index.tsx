import React, { useState } from "react";
import { useAppDispatch } from "app/hooks";
import { Icon, Input } from "components";
import { createListAsync, updateListAsync } from "features/lists";
import { IListData } from "types";

import styles from "./ManageList.module.css";
import { defaultRecurringOptions, IManageListData, IManageListProps } from "./utils";
import ManageListItems from "./ManageListItems";
import ManageRecurring from "./ManageRecurring";
import { getModal, openModal } from "features/modal";

/*
JSON.stringify recurring and members on push/submit
JSON.parse recurring and members on fetch
*/

const ManageList: React.FC<IManageListProps> = (list): JSX.Element => {
  const { user, id, name, recurring, members } = list;
  const dispatch = useAppDispatch();
  
  const creatingNew = !id;
  const [formData, setFormData] = useState<IManageListData>({
    user: 2, //fixme
    id: id ?? null,
    name: name ?? '',
    recurring: recurring ?? defaultRecurringOptions,
    members: members ?? []
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

  const handleUpdateList = () => dispatch(updateListAsync(formData as IListData)).unwrap();
  const handleCreateList = () => dispatch(createListAsync(formData as IManageListData)).unwrap();

  const confirmDeleteList = () => {
    dispatch(openModal(getModal({
      name: 'ConfirmDeleteList',
      data: {
        list: list as IListData,
        confirm: () => {
          console.log('hi')
        }
      }
    })));
  }

  return (
    <div className={styles.ListForm}>
      <div style={{ fontSize: '1.2rem' }}>
        <Input.Generic
          type="text"
          name="name"
          label={creatingNew ? 'Name this list:' : 'List name:'}
          placeholder="My list"
          defaultValue={formData.name}
          onChange={handleInputChange}
          autoFocus={!!creatingNew}
        />
      </div>
      <ManageRecurring
        recurring={formData.recurring}
        setFormData={setFormData}
      />
      <ManageListItems
        members={formData.members}
        setFormData={setFormData}
      />
      <div style={{ marginTop: '2.5rem' }}>
        <Input.Submit onClick={creatingNew ? handleCreateList : handleUpdateList}>Save changes</Input.Submit>
        {!creatingNew && (
          <button onClick={confirmDeleteList} style={{ display: 'flex', alignItems: 'flex-end', fontSize: '0.85rem', marginTop: '1rem' }}>
            <Icon.Trash style={{ height: '1rem', marginRight: '0.5rem' }} />
            <span>Delete this list</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default ManageList;