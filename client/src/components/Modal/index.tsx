import { useAppDispatch } from "app/hooks";
import { closeModal, ModalValue } from "features/modal";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Modal.module.css";
import * as Component from "features/modal/components";
import { Icon } from "components";

const modalTransitionDuration = 200;

const Modal: React.FC<ModalValue> = ({ name, data }): JSX.Element => {
  const [goodbye, setGoodbye] = useState<boolean>(false);
  const modalBoxRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if (goodbye) {
      setTimeout(() => {
        dispatch(closeModal());
      }, modalTransitionDuration);
    }
  }, [goodbye]);

  useEffect(() => {
    const checkIfClickedOutsideBox = (e: MouseEvent) => {
      if (!modalBoxRef.current) return;
      if (!modalBoxRef.current.contains(e.target as HTMLElement)) {
        setGoodbye(true);
      }
    }
    window.addEventListener('click', checkIfClickedOutsideBox);
    return () => {
      setGoodbye(false);
      window.removeEventListener('click', checkIfClickedOutsideBox);
    }
  }, []);

  const Content = Component.getComponent(name);

  return (
    <div className={`${styles.Modal} ${goodbye ? styles.goodbye : ''}`}>
      <div className={styles.Box} ref={modalBoxRef}>
        <button onClick={() => setGoodbye(true)}><Icon.Times /></button>
        <Content {...data} />
      </div>
    </div>
  )
}

export default Modal;