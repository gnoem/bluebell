import { put } from "api";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { Input, Section } from "components";
import { selectLists } from "features/lists";
import { openModal, getModal } from "features/modal";
import { IListData, ISectionProps } from "types";

const Dashboard: React.FC<ISectionProps> = ({ title }): JSX.Element => {
  const lists = useAppSelector(selectLists);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    return new Promise<IListData[]>(resolve => {
      resolve(lists);
    });
  }

  const confirmDeleteList = () => {
    dispatch(openModal(getModal({
      name: 'ConfirmDeleteList',
      data: {
        list: lists[0]
      }
    })));
  }

  return (
    <Section title={title}>
      <p>Welcome to Bluebell 💙</p>
      <ul>
        <li>Configure dashboard</li>
      </ul>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '1rem' }}>
        <Input.Button onClick={confirmDeleteList}>
          Open modal
        </Input.Button>
        <Input.Submit onClick={() => handleClick().then(console.log)}>
          Get lists
        </Input.Submit>
      </div>
    </Section>
  )
}

export default Dashboard;