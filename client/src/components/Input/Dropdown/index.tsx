import React, { useEffect, useRef, useState } from "react";
import { IDropdownOption } from "types";
import styles from "./Dropdown.module.css";

interface IDropdownProps {
  dropdownOptions: IDropdownOption[];
  defaultOption?: IDropdownOption;
  name: string;
  label?: string;
  width?: string;
  handleChange: (value: string) => void;
  style?: React.CSSProperties;
  behavior?: {
    adjacent?: boolean;
  }
}

const calculateOptimalDropdownWidth = (dropdownOptions: IDropdownOption[]) => {
  const chPerCharacter = 1.5;
  const getLongestStringsLength = (x: string[]) => Math.max(...(x.map(el => el.length)));
  const displays = dropdownOptions.map(option => option.display);
  // go through all displays and find the one that's longest
  const longestDisplayLength = getLongestStringsLength(displays);
  return `${Math.round(longestDisplayLength * chPerCharacter)}ch`;
}

const Dropdown: React.FC<IDropdownProps> = ({ name, label, dropdownOptions, defaultOption, handleChange, width, behavior, style }): JSX.Element => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [selected, setSelected] = useState<IDropdownOption>(defaultOption ?? dropdownOptions[0]);
  const toggleExpanded = () => setExpanded(x => !x);
  const createDropdownOption = ({ value, display }: IDropdownOption): JSX.Element => {
    const handleClick = () => {
      setSelected({ value, display });
      setExpanded(false);
    }
    return (
      <div key={`${value}:${display}`} className={styles.option}>
        <div onClick={handleClick}>
          {display}
        </div>
      </div>
    )
  }

  useEffect(() => {
    handleChange(selected.value);
  }, [selected.value]);

  useEffect(() => {
    const checkIfClickedOutsideDropdown = (e: PointerEvent) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target as HTMLElement)) {
        setExpanded(false);
      }
    }
    window.addEventListener('pointerdown', checkIfClickedOutsideDropdown);
    return () => window.removeEventListener('pointerdown', checkIfClickedOutsideDropdown);
  }, []);

  return (
    <div ref={dropdownRef} className={`${styles.input} ${behavior?.adjacent ? styles.adjacent : ''}`} style={style ?? {}}>
      {label && <label htmlFor={name}>{label}</label>}
      <div className={`${styles.dropdown} ${expanded ? styles.opened : ''}`} style={{ width: width ?? calculateOptimalDropdownWidth(dropdownOptions) }}>
        <div className={styles.display} onClick={toggleExpanded}>{selected?.display}</div>
        <div className={styles.options}>
          {dropdownOptions.map(createDropdownOption)}
        </div>
      </div>
    </div>
  )
}

export default Dropdown;