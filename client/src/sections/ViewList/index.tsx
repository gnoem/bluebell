import { useAppDispatch } from "../../app/hooks";
import { Section } from "../../components";
import { IAppSection } from "../../config";
import { goto } from "../../features/navigation";
import { IRawListData } from "../../types";

interface IViewListProps extends Required<IAppSection> {
  data: IRawListData;
}

const ViewList: React.FC<IViewListProps> = ({ title, data }): JSX.Element => {
  const dispatch = useAppDispatch();
  return (
    <Section title={title} goBack={() => dispatch(goto({ componentName: 'MyLists' }))}>
hi
    </Section>
  )
}

export default ViewList;