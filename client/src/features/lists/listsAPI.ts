import { get, put } from "api";
import { convertListItemsArrayToString, convertListItemsStringToArray, convertRecurringObjectToString, convertRecurringStringToObject } from "components/ManageList/utils";
import { IListData, IRawListData } from "types";

export const fetchLists = async (): Promise<IListData[]> => {
  const lists = await get<IRawListData[]>('/lists');
  lists.sort((a, b) => b.id - a.id);
  const formattedLists = lists.map(list => ({
    ...list,
    recurring: convertRecurringStringToObject(list.recurring), // JSON.parse(list.recurring)
    members: convertListItemsStringToArray(list.members) // JSON.parse(list.members)
  }));
  return formattedLists;
}

export const updateList = async (formData: IListData): Promise<IListData> => {
  const data: IRawListData = {
    ...formData,
    members: convertListItemsArrayToString(formData.members),
    recurring: convertRecurringObjectToString(formData.recurring)
  }
  const response = await put<IListData>(`/lists/${data.id}`, data);
  return response;
}