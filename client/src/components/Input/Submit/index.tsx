import { Input } from "components";
import { useEffect, useState } from "react";
import { IButtonProps } from "types";
import styles from "./Submit.module.css";

interface ISubmitProps extends Omit<IButtonProps, 'onClick'> {
  onClick: () => Promise<any>;
}

type Status = 'pending' | 'success' | 'idle';

const successAnimationDuration = 3000;
const pendingAnimationCycleDuration = 1500; // flickering is ugly

/**
 * error handling thoughts
 * maybe a little message under/next to the submit button that says "something went wrong and we weren't able to save your changes"
 * and has a X button to get rid of it, and automatically disappears if you try to submit again 
 */

const Submit: React.FC<ISubmitProps> = ({ onClick, children }): JSX.Element => {
  const [status, setStatus] = useState<Status>('idle');

  const handleClick = () => {
    if (status !== 'pending') setStatus('pending');
  }

  useEffect(() => {
    let mounted = true;
    if (status === 'pending') {
      onClick().then(() => {
        setTimeout(() => {
          if (mounted) setStatus('success');
        }, pendingAnimationCycleDuration);
      }).catch(err => {
        if (mounted) setStatus('idle');
        console.error(err); // todo error handling 
      });
    }
    if (status === 'success') {
      setTimeout(() => {
        if (mounted) setStatus('idle');
      }, successAnimationDuration)
    }
    return () => {
      mounted = false;
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
      <circle cx="15" cy="5" r="2" style={{ animationDuration: `${pendingAnimationCycleDuration}ms` }}></circle>
      <circle cx="20" cy="5" r="2" style={{ animationDuration: `${pendingAnimationCycleDuration}ms` }}></circle>
      <circle cx="25" cy="5" r="2" style={{ animationDuration: `${pendingAnimationCycleDuration}ms` }}></circle>
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