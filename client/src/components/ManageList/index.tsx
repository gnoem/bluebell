import React, { useEffect, useMemo, useState } from "react";
import { Input } from "components";
import { IListData, IRecurringData } from "types";
import { newObjectFrom } from "utils";
import ManageListItems from "./ManageListItems";
import ManageRecurring from "./ManageRecurring";
import styles from "./ManageList.module.css";
import { convertRecurringStringToObject, getListItemLabels, getTrackableListItemsArray, IManageListData, IManageListProps, ListItemData } from "./utils";

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
    recurring: recurring ?? '',
    members: members ? getTrackableListItemsArray(members) : []
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
        console.log(formData);
        resolve();
      }, 2000);
    });
  }

  const convertedRecurring = useMemo(() => {
    return convertRecurringStringToObject(formData.recurring);
  }, [formData.recurring]);

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
        recurring={convertedRecurring}
        setFormData={setFormData}
      />
      <ManageListItems
        {...{
          members: formData.members,
          setFormData
        }}
      />
      <Input.Submit onClick={handleSubmit}>Save changes</Input.Submit>
    </div>
  )
}

export default ManageList;