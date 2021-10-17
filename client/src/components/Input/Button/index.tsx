import { IButtonProps } from "types";
import styles from "./Button.module.css";

const Button: React.FC<IButtonProps> = ({ type, onClick, children }): JSX.Element => {
  return (
    <div className={styles.Button}>
      <button type={type ?? 'button'} onClick={onClick}>
        {children}
      </button>
    </div>
  )
}

export default Button;