import { Header, Main, Section } from "..";
import { useAppSelector } from "../../app/hooks";
import { selectSection } from "../../features/navigation";
import styles from "./Dashboard.module.css";
import * as Sections from "../../sections";
import { ISectionProps } from "../../types";
import { IAppSection } from "../../config";

const Dashboard: React.FC = (): JSX.Element => {
  const currentSection = useAppSelector(selectSection);
  return (
    <div className={styles.Dashboard}>
      <Header />
      <Main>
        {loadSection(currentSection)}
      </Main>
    </div>
  )
}

const loadSection = ({ title, componentName }: IAppSection): JSX.Element | null => {
  // @ts-ignore fixme
  const LoadedSection: React.FC<ISectionProps> = Sections[componentName] ?? FallbackSection;
  return <LoadedSection {...{ title }} />;
}

const FallbackSection: React.FC<ISectionProps> = ({ title }): JSX.Element => {
  return (
    <Section title="Something went wrong">
      Unable to load <b>{title}</b>. So sorry about that! :(
    </Section>
  )
}

export default Dashboard;