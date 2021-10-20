import { useAppDispatch } from "app/hooks";
import { Input } from "components";
import React from "react";
import { IListData } from "types";
import { closeModal } from ".";

export const ConfirmDeleteList: React.FC<PropsFor<'ConfirmDeleteList'>> = ({ list, confirm }) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <h2>Delete this list</h2>
      <p>Are you sure you want to delete the list <b>{list.name}</b>? This action cannot be undone!</p>
      <Input.DialogOptions
        confirm={() => new Promise(confirm)}
        confirmText="Yes, I'm sure"
        cancel={() => dispatch(closeModal())}
      />
    </>
  )
}

const ConfirmDeleteAccount: React.FC<PropsFor<'ConfirmDeleteAccount'>> = ({ user }) => {
  return (
    <>
      <h2>Delete your account</h2>
      <p>Are you sure you want to delete your account? This action cannot be undone!</p>
    </>
  )
}

export interface IModalProps {
  ConfirmDeleteList: {
    list: IListData;
    confirm: () => any;
  }
  ConfirmDeleteAccount: {
    user: IListData;
  }
}

type ModalComponents<T = any> = {
  [Property in keyof IModalProps]: React.FC<T>;
}

const bank: ModalComponents = {
  ConfirmDeleteAccount,
  ConfirmDeleteList
}

export type PropsFor<T extends keyof IModalProps> = IModalProps[T];

export const getComponent = <Name extends keyof ModalComponents>(name: Name): React.FC<IModalProps[Name]> => bank[name];