import React, { SetStateAction, useEffect, useState } from "react";
import { Input } from "components";
import { IManageListData } from "components/ManageList";
import { IRecurringData } from "types";
import { newObjectFrom } from "utils";
import styles from "../ManageList.module.css";

const weekOptionValues = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const weekOptionDisplays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const recurringTypeOptions = [
  { value: 'daily', display: 'Daily' },
  { value: 'weekly', display: 'Weekly' },
]

const weekOptions = weekOptionValues.map((value, i) => ({
  value,
  display: weekOptionDisplays[i]
}));

interface IManageRecurringProps {
  recurring: IRecurringData;
  setFormData: React.Dispatch<SetStateAction<IManageListData>>;
}

interface IRecurringOptionsProps extends Omit<IManageRecurringProps, 'setFormData'> {
  setRecurring: React.Dispatch<SetStateAction<IRecurringData>>;
}

const ManageRecurring: React.FC<IManageRecurringProps> = (props): JSX.Element => {
  const [recurring, setRecurring] = useState<IRecurringData>(props.recurring);
  const toggleIsRecurring = () => {
    setRecurring(newObjectFrom<IRecurringData>(recurring => {
      recurring.isRecurring = !recurring.isRecurring;
    }));
  }

  // update form data anytime recurring changes in local state
  useEffect(() => {
    const updateFormData = (value: IRecurringData): void => {
      const convertToString = ({ isRecurring, type, onDays }: IRecurringData): string => {
        if (!isRecurring) return '';
        return `${type}:${onDays.join('&')}`;
      }
      props.setFormData(newObjectFrom<IManageListData>(formData => {
        formData.recurring = convertToString(value);
      }));
    }
    updateFormData(recurring);
  }, [recurring.isRecurring, recurring.type, recurring.onDays]);
  
  return (
    <div>
      <Input.Checkbox name="recurring" label="Recurring?" onChange={toggleIsRecurring} checked={recurring.isRecurring} behavior={{ checkboxFirst: true }} />
      {recurring.isRecurring && <ManageRecurringType {...{ recurring, setRecurring }} />}
    </div>
  )
}

const ManageRecurringType: React.FC<IRecurringOptionsProps> = ({ recurring, setRecurring }): JSX.Element => {
  const dropdownName = 'recurringType';
  const setRecurringType = (value: string) => {
    setRecurring(newObjectFrom<IRecurringData>(recurring => {
      recurring.type = value;
    }));
  }
  return (
    <div className={styles.recurringOptions}>
      <label htmlFor={dropdownName}>How often?</label>
      <Input.Dropdown
        handleChange={setRecurringType}
        dropdownOptions={recurringTypeOptions}
        defaultOption={recurringTypeOptions.find(option => option.value === recurring.type)}
        name={dropdownName}
        behavior={{ adjacent: true }}
      />
      {(recurring.type === 'weekly') && <ManageRecurringDays {...{ recurring, setRecurring }} />}
    </div>
  )
}

const ManageRecurringDays: React.FC<IRecurringOptionsProps> = ({ recurring, setRecurring }): JSX.Element => {
  const handleChange = (value: string) => {
    setRecurring(newObjectFrom<IRecurringData>(recurring => {
      const recurringDays = [...recurring.onDays];
      const index = recurringDays.indexOf(value);
      if (index < 0) {
        recurringDays.push(value);
      } else {
        recurringDays.splice(index, 1);
      }
      recurring.onDays = recurringDays;
    }));
  }
  return (
    <div>
      <p style={{ margin: '0.5rem 0 0.25rem' }}>Every:</p>
      {weekOptions.map(({ value, display }) => {
        return (
          <Input.Checkbox
            behavior={{ checkboxFirst: true, group: true }}
            key={`${value}:${display}`}
            name={value}
            label={display}
            checked={recurring.onDays.includes(value)}
            onChange={() => handleChange(value)}
          />
        )
      })}
    </div>
  )
}

export default ManageRecurring;