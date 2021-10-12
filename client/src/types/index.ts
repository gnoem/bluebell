export type Obj<T = any> = Record<string | number, T>;

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export interface ISectionProps {
  title: string;
  goBack?: () => void;
}

export interface IRawListData {
  id: number;
  user: number;
  name: string;
  recurring: string;
  members: string;
}

export type IListData = Omit<IRawListData, 'id'>;

export interface IListsObject {
  [id: string]: IListData;
}