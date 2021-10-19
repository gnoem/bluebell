import { ISectionProps } from "types";
import styles from "./Section.module.css";

const Section: React.FC<ISectionProps> = ({ title, headerButtons, children }): JSX.Element => {
  return (
    <section className={styles.Section}>
      <SectionHeader {...{ title, headerButtons }} />
      {children}
    </section>
  )
}

const SectionHeader: React.FC<ISectionProps> = ({ title, headerButtons }) => {
  return (
    <div className={styles.Header}>
      <h2>{title}</h2>
      {headerButtons && (
        <div className={styles.buttons}>
          {headerButtons.map(({ Icon, ariaLabel, onClick }) => (
            <button key={`button-${ariaLabel}`} aria-label={ariaLabel} onClick={onClick}><Icon /></button>
          ))}
        </div>
      )}
    </div>
  )
}

export default Section;