import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { Icon } from "components";
import { disposeModal, closeModal, ModalValue, selectModalStatus } from "features/modal";
import * as Component from "features/modal/components";
import styles from "./Modal.module.css";

const Modal: React.FC<ModalValue> = ({ name, data }): JSX.Element => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectModalStatus);
  const modalBoxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (status === 'goodbye') {
      setTimeout(() => {
        dispatch(disposeModal());
      }, 200);
    }
  }, [status]);

  useEffect(() => {
    const checkIfClickedOutsideBox = (e: MouseEvent) => {
      if (!modalBoxRef.current) return;
      if (!modalBoxRef.current.contains(e.target as HTMLElement)) {
        dispatch(closeModal());
      }
    }
    window.addEventListener('click', checkIfClickedOutsideBox);
    return () => {
      dispatch(disposeModal());
      window.removeEventListener('click', checkIfClickedOutsideBox);
    }
  }, []);

  const Content = Component.getComponent(name);

  return (
    <div className={`${styles.Modal} ${(status === 'goodbye') ? styles.goodbye : ''}`}>
      <div className={styles.Box} ref={modalBoxRef}>
        <button onClick={() => dispatch(closeModal())}><Icon.Times /></button>
        <Content {...data} />
      </div>
    </div>
  )
}

export default Modal;