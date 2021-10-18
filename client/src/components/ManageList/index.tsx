import React, { useState } from "react";
import { Input } from "components";
import ManageListItems from "./ManageListItems";
import ManageRecurring from "./ManageRecurring";
import styles from "./ManageList.module.css";
import { defaultRecurringOptions, IManageListData, IManageListProps, convertListItemsArrayToString, convertRecurringObjectToString } from "./utils";

/*
JSON.stringify recurring and members on push/submit
JSON.parse recurring and members on fetch
*/

const ManageList: React.FC<IManageListProps> = ({ user, id, name, recurring, members }): JSX.Element => {
  const creatingNew = !id;
  const [formData, setFormData] = useState<IManageListData>({
    user,
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

  const handleSubmit = () => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const data = {
          ...formData,
          members: convertListItemsArrayToString(formData.members),
          recurring: convertRecurringObjectToString(formData.recurring)
        }
        console.log(data);
        resolve();
      }, 2000);
    });
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
        <Input.Submit onClick={handleSubmit}>Save changes</Input.Submit>
      </div>
    </div>
  )
}

export default ManageList;