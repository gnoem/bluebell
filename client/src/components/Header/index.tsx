import { SiteNav } from "features/navigation";
import styles from "./Header.module.css";

const Header: React.FC = (): JSX.Element => {
  return (
    <header className={styles.Header}>
      <h1>bluebell</h1>
      <SiteNav />
    </header>
  )
}

export default Header;