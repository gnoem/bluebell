import { Input } from "components";
import { useEffect, useState } from "react";
import { IButtonProps } from "types";
import styles from "./Submit.module.css";

interface ISubmitProps extends Omit<IButtonProps, 'onClick'> {
  onClick: () => Promise<any>;
}

type Status = 'pending' | 'success' | 'idle';

const successAnimationDuration = 3000;

const Submit: React.FC<ISubmitProps> = ({ onClick, children }): JSX.Element => {
  const [status, setStatus] = useState<Status>('idle');
  const handleClick = () => {
    if (status !== 'pending') {
      setStatus('pending');
    }
  }
  useEffect(() => {
    if (status === 'pending') {
      onClick().then(() => {
        setStatus('success');
      }).catch(err => {
        setStatus('idle');
        console.error(err);
      });
    }
    if (status === 'success') {
      setTimeout(() => {
        setStatus('idle');
      }, successAnimationDuration);
    }
  }, [status]);
  return (
    <Input.Button onClick={handleClick}>
      <span className={`${(status === 'idle') ? '' : styles.ghost}`}>{children}</span>
      {(status !== 'idle') && <Indicator {...{ status }} />}
    </Input.Button>
  )
}

interface IIndicatorProps {
  status: Status;
}

const Indicator: React.FC<IIndicatorProps> = ({ status }): JSX.Element => {
  return (
    <span className={styles.icon}>
      <svg viewBox="0 0 40 10">
        {(status === 'pending') && <Pending />}
        {(status === 'success') && <Success />}
      </svg>
    </span>
  )
}

const Pending: React.FC = (): JSX.Element => {
  return (
    <g className={styles.pending}>
      <circle cx="15" cy="5" r="2"></circle>
      <circle cx="20" cy="5" r="2"></circle>
      <circle cx="25" cy="5" r="2"></circle>
    </g>
  )
}

const Success: React.FC = (): JSX.Element => {
  return (
    <g className={styles.success} style={{ animationDuration: `${successAnimationDuration}ms` }}>
      <path d="M 17 5 L 19 7 L 24 2"></path>
    </g>
  )
}


export default Submit;