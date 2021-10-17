import React, { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import { Input } from "components";
import { IManageListData } from "../utils";
import { IRecurringData, IRecurringInterval } from "types";
import { createDropdownOptions, newObjectFrom } from "utils";
import styles from "../ManageList.module.css";

const recurringTypeOptions = createDropdownOptions(
  ['daily', 'weekly', 'interval'],
  ['Daily', 'Weekly', 'On an interval']
);

const weekOptions = createDropdownOptions(
  ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
  ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
);

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
    props.setFormData(newObjectFrom<IManageListData>(formData => {
      formData.recurring = recurring;
    }));
  }, [recurring.isRecurring, recurring.type, recurring.onDays, recurring.onInterval]);
  
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
      {(recurring.type === 'interval') && <ManageRecurringInterval {...{ recurring, setRecurring }} />}
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
    <div style={{ marginTop: '0.5rem' }}>
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

const intervalTypeOptions = createDropdownOptions(['days', 'weeks']);

const calculateOptimalNumberInputWidth = (value: string) => {
  const chPerCharacter = 2;
  return `${value.length * chPerCharacter + 5}ch`;
}

const ManageRecurringInterval: React.FC<IRecurringOptionsProps> = ({ recurring, setRecurring }): JSX.Element => {
  const { every, type, startingOn } = recurring.onInterval;
  const handleChange = <Property extends keyof IRecurringInterval, Value extends IRecurringInterval[Property]>(property: Property, value: Value) => {
    setRecurring(newObjectFrom<IRecurringData>(recurring => {
      const recurringInterval: IRecurringInterval = {...recurring.onInterval};
      recurringInterval[property] = value;
      recurring.onInterval = recurringInterval;
    }));
  }
  const setEvery = (e: ChangeEvent<HTMLInputElement>) => handleChange('every', e.target.value);
  const setIntervalType = (value: string) => handleChange('type', value);
  const setStartingOn = (e: ChangeEvent<HTMLInputElement>) => handleChange('startingOn', e.target.value);
  return (
    <div style={{ marginTop: '0.5rem' }}>
      Every
      <Input.Generic
        style={{ display: 'inline-block', marginLeft: '0.425rem' }}
        type="number"
        name="intervalEvery"
        defaultValue={every}
        width={calculateOptimalNumberInputWidth(every)}
        onChange={setEvery}
        max="30"
        min="0"
        autoFocus
      />
      <Input.Dropdown
        name="intervalType"
        style={{ display: 'inline-block', marginLeft: '0.425rem' }}
        dropdownOptions={intervalTypeOptions}
        defaultOption={intervalTypeOptions.find(option => option.value === type)}
        handleChange={setIntervalType}
      />
      <div style={{ marginTop: '0.5rem' }}>
        starting on
        <Input.Generic
          style={{ display: 'inline-block', marginLeft: '0.425rem' }}
          type="date"
          name="intervalStartingOn"
          defaultValue={startingOn}
          onChange={setStartingOn}
        />
      </div>
    </div>
  )
}

export default ManageRecurring;