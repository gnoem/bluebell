import { get } from "api";
import { convertListItemsStringToArray, convertRecurringStringToObject } from "components/ManageList/utils";
import { IListData, IRawListData } from "types";

export const fetchLists = async (): Promise<IListData[]> => {
  const lists: IRawListData[] = await get('/lists');
  lists.sort((a, b) => b.id - a.id);
  const formattedLists = lists.map(list => ({
    ...list,
    recurring: convertRecurringStringToObject(list.recurring), // JSON.parse(list.recurring)
    members: convertListItemsStringToArray(list.members) // JSON.parse(list.members)
  }));
  return formattedLists;
}