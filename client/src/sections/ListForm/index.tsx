import { useAppDispatch } from "app/hooks";
import { Icon, ManageList, Section } from "components";
import { IManageListProps } from "components/ManageList/utils";
import { goto } from "features/navigation";
import { ISectionProps } from "types";

interface IListFormProps extends ISectionProps {
  data: IManageListProps;
}

const ListForm: React.FC<IListFormProps> = ({ title, data }): JSX.Element => {
  const dispatch = useAppDispatch();
  const headerButtons = [{
    Icon: Icon.ArrowLeft,
    ariaLabel: 'Go back',
    onClick: () => dispatch(goto({ componentName: 'MyLists' }))
  }];
  return (
    <Section title={title} headerButtons={headerButtons}>
      <ManageList {...data} /> {/* fixme there needs to be a way of specifying when the data prop is required for a particular section */}
    </Section>
  )
}

export default ListForm;