import { AppSection, AppSections, IGenericSection } from "config";
import * as Sections from "sections";
import { PartialBy } from "types";

export const mainAppSections: AppSection[] = [
  { title: 'Dashboard', componentName: 'Dashboard' },
  { title: 'My lists', componentName: 'MyLists' },
  { title: 'Settings', componentName: 'Settings' }
]

export const subAppSections: PartialBy<AppSection, 'title'>[] = [
  { componentName: 'ViewList' },
]

export const appSections: AppSection[] = [
  ...subAppSections,
  ...mainAppSections
]

export const getSectionByTitle = (title: string) => appSections.find(section => section.title === title);
export const getSectionByComponentName = (componentName: string) => appSections.find(section => section.componentName === componentName);

type SectionComponents<T = any> = {
  [Property in keyof AppSections]: React.FC<T>
}

const sections: SectionComponents = {
  ...Sections
}

export const getSectionComponent = <Name extends keyof AppSections>(name: Name): React.FC<PartialBy<IGenericSection<Name>, 'componentName'>> => sections[name];