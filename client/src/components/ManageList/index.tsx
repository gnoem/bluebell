import React, { useEffect, useMemo, useState } from "react";
import { Input } from "components";
import { IListData, IRecurringData } from "types";
import { newObjectFrom } from "utils";
import ManageListItems from "./ManageListItems";
import ManageRecurring from "./ManageRecurring";
import styles from "./ManageList.module.css";

export type ListItemData = [number, string];

export interface IManageListProps {
  user: number;
  id?: number;
  name?: string;
  recurring?: string;
  members?: string[];
}

export interface IManageListData extends Omit<IListData, 'id' | 'members'> {
  members: ListItemData[];
  id: number | null;
}

const getListItemLabels = (array: ListItemData[]): string[] => {
  return array.map(item => item[1]);
}

const getTrackableListItemsArray = (array: string[]): ListItemData[] => {
  const updatedList: ListItemData[] = [];
  const getInstanceCount = (item: string): number => {
    return updatedList.filter(([_, itemLabel]) => itemLabel === item).length;
  }
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    updatedList.push([getInstanceCount(item), item]);
  }
  return updatedList;
}

const convertRecurring = (recurring: string): IRecurringData => {
  const defaultRecurringOptions = {
    type: 'daily',
    onDays: []
  }
  if (!recurring) return {
    isRecurring: false,
    ...defaultRecurringOptions
  }
  const recurringType = recurring.split(':')[0];
  const recurringDays = recurring.split(':')[1]?.split('&') ?? [];
  return {
    isRecurring: true,
    type: recurringType,
    onDays: recurringDays
  }
}

const ManageList: React.FC<IManageListProps> = ({ user, id, name, recurring, members }): JSX.Element => {
  const creatingNew = !id;
  const [formData, setFormData] = useState<IManageListData>({
    user,
    id: id ?? null,
    name: name ?? '',
    recurring: recurring ?? '',
    members: members ? getTrackableListItemsArray(members) : []
  });

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

  const addListItem = (label: string): void => {
    setFormData(newObjectFrom<IManageListData>(formData => {
      const updatedMembers = getListItemLabels([...formData.members]);
      updatedMembers.push(label);
      formData.members = getTrackableListItemsArray(updatedMembers);
    }));
  }

  const removeListItem = ([itemPrefix, itemLabel]: ListItemData): void => {
    setFormData(newObjectFrom<IManageListData>(formData => {
      const index = formData.members.findIndex(([prefix, label]) => (prefix === itemPrefix) && (label === itemLabel));
      const updatedMembers = getListItemLabels([...formData.members]);
      updatedMembers.splice(index, 1);
      formData.members = getTrackableListItemsArray(updatedMembers);
    }));
  }

  const convertedRecurring = useMemo(() => {
    return convertRecurring(formData.recurring);
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
          addListItem,
          removeListItem,
          members: formData.members
        }}
      />
    </div>
  )
}

export default ManageList;