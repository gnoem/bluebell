import { IListData, IRecurringData } from "types";
import { getDateString } from "utils";

export type ListItemData = [number, string];

export interface IManageListProps {
  user: number;
  id?: number;
  name?: string;
  recurring?: IRecurringData;
  members?: string[];
}

export interface IManageListData extends Omit<IListData, 'id'> {
  id: number | null; //todo convert to readonly
}

export const defaultIntervalOptions = {
  every: '3',
  type: 'days',
  startingOn: getDateString(new Date())
}

export const defaultRecurringOptions = {
  isRecurring: false,
  type: 'daily',
  onDays: [],
  onInterval: defaultIntervalOptions
}

export const convertListItemsArrayToTrackableList = (listItems: string[]): ListItemData[] => {
  const updatedList: ListItemData[] = [];
  const getInstanceCount = (item: string): number => {
    return updatedList.filter(([_, itemLabel]) => itemLabel === item).length;
  }
  for (let i = 0; i < listItems.length; i++) {
    const item = listItems[i];
    updatedList.push([getInstanceCount(item), item]);
  }
  return updatedList;
}

export const convertTrackableListToStringArray = (listItems: ListItemData[]): string[] => listItems.map(item => item[1]);