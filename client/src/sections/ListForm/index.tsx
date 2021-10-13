import { useAppDispatch } from "../../app/hooks";
import { ManageList, Section } from "../../components";
import { IManageListProps } from "../../components/ManageList";
import { goto } from "../../features/navigation";
import { ISectionProps } from "../../types";

interface IListFormProps extends ISectionProps {
  data: IManageListProps;
}

const ListForm: React.FC<IListFormProps> = ({ title, data }): JSX.Element => {
  const dispatch = useAppDispatch();
  return (
    <Section title={title} goBack={() => dispatch(goto({ componentName: 'MyLists' }))}>
      <ManageList {...data} /> {/* fixme there needs to be a way of specifying when the data prop is required for a particular section */}
    </Section>
  )
}

export default ListForm;