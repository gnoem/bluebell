import { Input } from "components";
import styles from "./DialogOptions.module.css";

interface IDialogOptions {
  confirm: () => Promise<any>;
  confirmText: string;
  cancel: () => any;
  cancelText?: string;
}

const DialogOptions: React.FC<IDialogOptions> = ({ confirm, confirmText, cancel, cancelText }) => {
  return (
    <div className={styles.DialogOptions}>
      <Input.Submit onClick={confirm}>{confirmText}</Input.Submit>
      <Input.Button onClick={cancel} className={styles.cancel}>{cancelText ?? 'Cancel'}</Input.Button>
    </div>
  )
}

export default DialogOptions;