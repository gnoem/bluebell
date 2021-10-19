import { IListData, IRawListData } from "types"

export const convertListToRaw = (list: IListData): IRawListData => ({
  ...list,
  recurring: JSON.stringify(list.recurring),
  members: JSON.stringify(list.members)
});

export const convertListFromRaw = (list: IRawListData): IListData => ({
  ...list,
  recurring: JSON.parse(list.recurring),
  members: JSON.parse(list.members)
});