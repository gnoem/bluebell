export interface IAppSection {
  title: string;
  componentName: string;
}

export const appSections: IAppSection[] = [
  { title: 'Dashboard', componentName: 'Dashboard' },
  { title: 'My lists', componentName: 'MyLists' },
  { title: 'Settings', componentName: 'Settings' },
]

export const getSectionByTitle = (title: string) => appSections.find(section => section.title === title);