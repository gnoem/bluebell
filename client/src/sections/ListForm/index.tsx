import { useAppDispatch } from "app/hooks";
import { Icon, ManageList, Section } from "components";
import { getSection } from "utils";
import { section, goto } from "features/navigation";

const ListForm = getSection('ListForm', ({ title, data }): JSX.Element => {
  const dispatch = useAppDispatch();
  const headerButtons = [{
    Icon: Icon.ArrowLeft,
    ariaLabel: 'Go back',
    onClick: () => dispatch(goto(section('MyLists')))
  }];
  return (
    <Section title={title} headerButtons={headerButtons}>
      <ManageList {...data} />
    </Section>
  )
});

export default ListForm;