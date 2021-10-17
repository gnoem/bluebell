export type Obj<T = any> = Record<string | number, T>;

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export type Writeable<T> = {
  -readonly [P in keyof T]: T[P];
}

/**
 * create a type from T that is the same union, but with each member of the union augmented with the missing fields from all the union with the missing fields being optional and of type undefined
 * https://stackoverflow.com/questions/51889715/require-at-least-one-of-two-properties-to-be-provided-in-props
 */

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;
type FlattenUnionHelper<T, TAll> = T extends any ? T & Partial<Record<Exclude<keyof TAll, keyof T>, undefined>> : never;
export type FlattenUnion<T> = FlattenUnionHelper<T, UnionToIntersection<T>>;


export interface ISectionProps {
  title: string;
  goBack?: () => void;
  data?: Obj;
}

export interface IRawListData {
  id: number;
  user: number;
  name: string;
  recurring: string;
  members: string;
}

export interface IListData extends Omit<IRawListData, 'members' | 'recurring'> {
  members: string[];
  recurring: IRecurringData;
}

export interface IInputProps {
  name: string;
  label?: string;
}

export interface IDropdownOption<T = string> {
  value: T;
  display: T;
}

export interface IRecurringInterval {
  every: string;
  type: string;
  startingOn: string;
}

export interface IRecurringData {
  isRecurring: boolean;
  type: string;
  onDays: string[];
  onInterval: IRecurringInterval
}

export interface IButtonProps {
  type?: 'button' | 'submit';
  onClick: () => void | Promise<any>;
}