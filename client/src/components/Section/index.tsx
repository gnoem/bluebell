import { Icon } from "..";
import { ISectionProps } from "../../types";
import styles from "./Section.module.css";

const Section: React.FC<ISectionProps> = ({ title, goBack, children }): JSX.Element => {
  return (
    <section className={styles.Section}>
      <SectionHeader {...{ title, goBack }} />
      {children}
    </section>
  )
}

const SectionHeader: React.FC<ISectionProps> = ({ title, goBack }) => {
  return (
    <div className={styles.Header}>
      <h2>{title}</h2>
      {goBack && <button onClick={goBack}><Icon.ArrowLeft /></button>}
    </div>
  )
}

export default Section;