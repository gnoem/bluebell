import { put } from "api";
import { useAppSelector } from "app/hooks";
import { Input, Section } from "components";
import { selectLists } from "features/lists";
import { IListData, IRawListData, ISectionProps } from "types";

const Dashboard: React.FC<ISectionProps> = ({ title }): JSX.Element => {
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
      <Input.Submit onClick={() => handleClick().then(console.log)}>
        Get lists
      </Input.Submit>
    </Section>
  )
}

export default Dashboard;