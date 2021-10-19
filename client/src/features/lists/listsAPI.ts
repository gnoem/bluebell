import { get, post, put } from "api";
import { IManageListData } from "components/ManageList/utils";
import { IListData, IRawListData, PartialBy } from "types";
import { convertListFromRaw, convertListToRaw } from "utils";

export const fetchLists = async (): Promise<IListData[]> => {
  const lists = await get<IRawListData[]>('/lists');
  lists.sort((a, b) => b.id - a.id);
  return lists.map(convertListFromRaw);
}

/* const manageList = <T extends keyof FormDataType, K extends FormDataType[T]>(actionType: 'create' | 'update') => async (formData: K): Promise<IListData> => {
  const data = convertListToRaw<K>(formData);
  const [action, path]: [<T>(path: string, data: T) => Promise<T>, string]
    = (actionType === 'create') ? [post, `/list`] : [put, `/lists/${data.id}`];
  const response = await action<IRawListData>(path, data);
  return convertListFromRaw(response);
} */

export const updateList = async (formData: IListData): Promise<IListData> => {
  const data = convertListToRaw(formData);
  const response = await put<IRawListData, IRawListData>(`/lists/${data.id}`, data);
  return convertListFromRaw(response);
}

export const createList = async (formData: IManageListData): Promise<IListData> => {
  const data = convertListToRaw({
    ...formData,
    id: 0 //fixme please i hate this workaround
  });
  const newListData: PartialBy<IRawListData, 'id'> = {...data};
  delete newListData['id'];
  console.log(newListData);
  const response = await post<IRawListData, Omit<IRawListData, 'id'>>(`/lists`, newListData);
  return convertListFromRaw(response);
}

