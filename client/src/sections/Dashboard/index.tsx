import { Section } from "../../components";
import { ISectionProps } from "../../types";

const Dashboard: React.FC<ISectionProps> = ({ title }): JSX.Element => {
  return (
    <Section title={title}>
      <p>Welcome to Bluebell 💙</p>
      <ul>
        <li>Configure dashboard</li>
      </ul>
    </Section>
  )
}

export default Dashboard;