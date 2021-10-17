import { IListData, IRecurringData } from "types";
import { getTwoDigitString } from "utils";

export type ListItemData = [number, string];

export interface IManageListProps {
  user: number;
  id?: number;
  name?: string;
  recurring?: string;
  members?: string[];
}

export interface IManageListData extends Omit<IListData, 'id' | 'members'> {
  members: ListItemData[];
  id: number | null;
}

export const getListItemLabels = (array: ListItemData[]): string[] => {
  return array.map(item => item[1]);
}

export const getTrackableListItemsArray = (array: string[]): ListItemData[] => {
  const updatedList: ListItemData[] = [];
  const getInstanceCount = (item: string): number => {
    return updatedList.filter(([_, itemLabel]) => itemLabel === item).length;
  }
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    updatedList.push([getInstanceCount(item), item]);
  }
  return updatedList;
}

export const convertRecurringStringToObject = (recurring: string): IRecurringData => {
  // example string: 'interval:sun&wed:3&days&2021-10-18';
  const getTodayString = (today: Date) => `${today.getFullYear()}-${getTwoDigitString(today.getMonth() + 1)}-${getTwoDigitString(today.getDate())}`;
  const defaultIntervalOptions = {
    every: '3',
    type: 'days',
    startingOn: getTodayString(new Date())
  }
  const defaultRecurringOptions = {
    type: 'daily',
    onDays: [],
    onInterval: defaultIntervalOptions
  }
  if (!recurring) return {
    isRecurring: false,
    ...defaultRecurringOptions
  }
  const [recurringType, recurringDaysString, recurringIntervalString] = recurring.split(':');
  const onDays = recurringDaysString?.split('&') ?? [];
  const [every, intervalType, startingOn] = recurringIntervalString?.split('&') ?? Object.values(defaultIntervalOptions);
  return {
    isRecurring: true,
    type: recurringType,
    onDays,
    onInterval: {
      every,
      type: intervalType,
      startingOn
    }
  }
}

export const convertRecurringObjectToString = ({ isRecurring, type, onDays, onInterval }: IRecurringData): string => {
  // return 'interval:sun&wed:3&days&2021-10-18';
  const { every, type: intervalType, startingOn } = onInterval;
  return `${isRecurring ? type : ''}:${onDays.join('&')}:${every}&${intervalType}&${startingOn}`;
}

export const convertListItemsStringToArray = (listItems: string): string[] => listItems.split('~&~');

export const convertListItemsArrayToString = (listItems: string[]): string => listItems.join('~&~');

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