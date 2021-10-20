import { useAppDispatch } from "app/hooks";
import { getSection } from "utils";
import { Icon, List, Section } from "components";
import { section, goto } from "features/navigation";

const ViewList = getSection('ViewList', ({ title, data }): JSX.Element => {
  const dispatch = useAppDispatch();
  const headerButtons = [{
    Icon: Icon.ArrowLeft,
    ariaLabel: 'Go back',
    onClick: () => dispatch(goto(section('MyLists')))
  }];
  return (
    <Section title={title} headerButtons={headerButtons}>
      <List {...data} />
    </Section>
  )
});

export default ViewList;