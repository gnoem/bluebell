import { get, put } from "api";
import { IListData, IRawListData } from "types";
import { convertListFromRaw, convertListToRaw } from "utils";

export const fetchLists = async (): Promise<IListData[]> => {
  const lists = await get<IRawListData[]>('/lists');
  lists.sort((a, b) => b.id - a.id);
  return lists.map(convertListFromRaw);
}

export const updateList = async (formData: IListData): Promise<IListData> => {
  const data = convertListToRaw(formData);
  const response = await put<IRawListData>(`/lists/${data.id}`, data);
  return convertListFromRaw(response);
}