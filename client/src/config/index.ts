import { RequiredBy } from "types";

export interface IAppSection {
  title?: string;
  componentName: string;
}

export const mainAppSections: RequiredBy<IAppSection, 'title'>[] = [
  { title: 'Dashboard', componentName: 'Dashboard' },
  { title: 'My lists', componentName: 'MyLists' },
  { title: 'Settings', componentName: 'Settings' }
]

export const subAppSections: IAppSection[] = [
  { componentName: 'ViewList' },
]

export const appSections: IAppSection[] = [
  ...subAppSections,
  ...mainAppSections
]

export const getSectionByTitle = (title: string) => appSections.find(section => section.title === title);
export const getSectionByComponentName = (componentName: string) => appSections.find(section => section.componentName === componentName);