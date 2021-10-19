import { useAppDispatch } from "app/hooks";
import { IAppSection } from "config";
import { Icon, List, Section } from "components";
import { goto } from "features/navigation";
import { IListData } from "types";

interface IViewListProps extends Required<IAppSection> {
  data: IListData;
}

const ViewList: React.FC<IViewListProps> = ({ title, data }): JSX.Element => {
  const dispatch = useAppDispatch();
  const headerButtons = [{
    Icon: Icon.ArrowLeft,
    ariaLabel: 'Go back',
    onClick: () => dispatch(goto({ componentName: 'MyLists' }))
  }];
  return (
    <Section title={title} headerButtons={headerButtons}>
      <List {...data} />
    </Section>
  )
}

export default ViewList;