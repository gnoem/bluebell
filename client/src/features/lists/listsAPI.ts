import { get } from "../../api";
import { IListsObject, IRawListData, PartialBy } from "../../types";

export const fetchLists = async () => {
  const lists: IRawListData[] = await get('/lists');
  lists.sort((a, b) => b.id - a.id);
  return lists;
}

export const fetchAndFormatLists = async () => {
  const listData = await get('/lists');
  const lists: IListsObject = listData.reduce((obj: IListsObject, list: IRawListData) => {
    const listCopy: PartialBy<IRawListData, 'id'> = {...list};
    delete listCopy.id;
    obj[`L${list.id}`] = listCopy;
    return obj;
  }, {});
  return lists;
}