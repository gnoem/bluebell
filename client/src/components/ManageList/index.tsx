import React, { useState } from "react";
import { useAppDispatch } from "app/hooks";
import { Input } from "components";
import { createListAsync, updateListAsync } from "features/lists";
import { IListData } from "types";

import styles from "./ManageList.module.css";
import { defaultRecurringOptions, IManageListData, IManageListProps } from "./utils";
import ManageListItems from "./ManageListItems";
import ManageRecurring from "./ManageRecurring";

/*
JSON.stringify recurring and members on push/submit
JSON.parse recurring and members on fetch
*/

const ManageList: React.FC<IManageListProps> = ({ user, id, name, recurring, members }): JSX.Element => {
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
      </div>
    </div>
  )
}

export default ManageList;