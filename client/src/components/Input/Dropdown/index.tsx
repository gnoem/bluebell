import { useEffect, useRef, useState } from "react";
import styles from "./Dropdown.module.css";

interface IDropdownOption {
  value: string;
  display: string;
}

interface IDropdownProps {
  dropdownOptions: IDropdownOption[];
  defaultOption?: IDropdownOption;
  name: string;
  label?: string;
  width?: string;
  handleChange: (value: string) => void;
  behavior?: {
    adjacent?: boolean;
  }
}

const Dropdown: React.FC<IDropdownProps> = ({ name, label, dropdownOptions, defaultOption, handleChange, width, behavior }): JSX.Element => {
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
    <div ref={dropdownRef} className={`${styles.input} ${behavior?.adjacent ? styles.adjacent : ''}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <div className={`${styles.dropdown} ${expanded ? styles.opened : ''}`} style={{ width: width ?? '100%' }}>
        <div className={styles.display} onClick={toggleExpanded}>{selected?.display}</div>
        <div className={styles.options}>
          {dropdownOptions.map(createDropdownOption)}
        </div>
      </div>
    </div>
  )
}

export default Dropdown;