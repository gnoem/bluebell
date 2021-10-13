import { IInputProps } from "../../../types";
import styles from "./Checkbox.module.css";

interface ICheckboxProps extends IInputProps {
  checked?: boolean;
  onChange: () => void;
  behavior?: {
    checkboxFirst?: boolean;
    listItem?: boolean;
    group?: boolean;
  }
}

const Checkbox: React.FC<ICheckboxProps> = ({ behavior, name, label, checked, onChange }): JSX.Element => {
  const { checkboxFirst, listItem, group } = behavior ?? {};
  return (
    <div className={`${styles.Input} ${(checkboxFirst || listItem) ? styles.left : ''} ${group ? styles.group : ''}`}>
      <label className={`${listItem ? styles.checklist : ''}`} htmlFor={name}>{label}</label>
      <div className={styles.checkbox}>
        <input name="{{ name }}" type="checkbox" checked={checked} onChange={onChange} />
        <span></span>
      </div>
    </div>
  )
}

export default Checkbox;