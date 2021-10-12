import { Header, Main, Section } from "..";
import { useAppSelector } from "../../app/hooks";
import { selectSection, selectSectionData } from "../../features/navigation";
import styles from "./Dashboard.module.css";
import * as Sections from "../../sections";
import { ISectionProps, Obj } from "../../types";
import { IAppSection } from "../../config";

const Dashboard: React.FC = (): JSX.Element => {
  const currentSection = useAppSelector(selectSection);
  const currentSectionData = useAppSelector(selectSectionData);
  return (
    <div className={styles.Dashboard}>
      <Header />
      <Main>
        {loadSection({
          ...currentSection,
          data: currentSectionData ?? {}
        })}
      </Main>
    </div>
  )
}

interface ILoadSectionArgs extends IAppSection {
  data: Obj;
}

const loadSection = ({ title, componentName, data }: ILoadSectionArgs): JSX.Element | null => {
  // @ts-ignore fixme
  const LoadedSection: React.FC<ISectionProps> = Sections[componentName] ?? FallbackSection;
  return <LoadedSection {...{
    title: title ?? data?.sectionTitle ?? componentName,
    data
  }} />;
}

const FallbackSection: React.FC<ISectionProps> = ({ title }): JSX.Element => {
  return (
    <Section title="Something went wrong">
      Unable to load <b>{title}</b>. So sorry about that! :(
    </Section>
  )
}

export default Dashboard;