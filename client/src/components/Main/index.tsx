import styles from "./Main.module.css";

const Main: React.FC = ({ children }): JSX.Element => {
  return (
    <main className={styles.Main}>
      {children}
    </main>
  )
}

export default Main;