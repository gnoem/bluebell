import { useAppDispatch } from "app/hooks";
import { IAppSection } from "config";
import { List, Section } from "components";
import { goto } from "features/navigation";
import { IListData } from "types";

interface IViewListProps extends Required<IAppSection> {
  data: IListData;
}

const ViewList: React.FC<IViewListProps> = ({ title, data }): JSX.Element => {
  const dispatch = useAppDispatch();
  return (
    <Section title={title} goBack={() => dispatch(goto({ componentName: 'MyLists' }))}>
      <List {...data} />
    </Section>
  )
}

export default ViewList;