import React from "react";
import { useAppSelector } from "app/hooks";
import { Header, Main } from "components";
import { IGenericSection, AllSectionNames } from "config";
import { selectSection } from "features/navigation";
import styles from "./Dashboard.module.css";
import { getSectionComponent } from "features/navigation/config";

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

const loadSection = <Name extends AllSectionNames>({ title, componentName, data }: IGenericSection<Name>): JSX.Element | null => {
  const LoadedSection = getSectionComponent(componentName);
  return (
    <LoadedSection {...{
      title: title ?? componentName,
      data
    }} />
  )
}

export default Dashboard;