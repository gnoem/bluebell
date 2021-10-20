import { useAppSelector } from "app/hooks";
import { Input, Section } from "components";
import { getSection } from "utils";
import { selectLists } from "features/lists";
import { IListData } from "types";

const Dashboard = getSection('Dashboard', ({ title }): JSX.Element => {
  const lists = useAppSelector(selectLists);

  const handleClick = () => {
    return new Promise<IListData[]>(resolve => {
      resolve(lists);
    });
  }

  return (
    <Section title={title}>
      <p>Welcome to Bluebell 💙</p>
      <ul>
        <li>Configure dashboard</li>
      </ul>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '1rem' }}>
        <Input.Submit onClick={() => handleClick().then(console.log)}>
          Get lists
        </Input.Submit>
      </div>
    </Section>
  )
});

export default Dashboard;