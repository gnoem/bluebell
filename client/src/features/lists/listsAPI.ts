import { get } from "../../api";
import { IRawListData } from "../../types";

export const fetchLists = async () => {
  const lists: IRawListData[] = await get('/lists');
  lists.sort((a, b) => b.id - a.id);
  const formattedLists = lists.map(list => ({
    ...list,
    members: list.members.split('~&~')
  }));
  return formattedLists;
}