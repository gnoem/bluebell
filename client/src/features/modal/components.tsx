import React from "react";
import { IListData } from "types";

export const ConfirmDeleteList: React.FC<PropsFor<'ConfirmDeleteList'>> = ({ list }) => {
  return (
    <>
      <h2>Delete this list</h2>
      <p>Are you sure you want to delete the list <b>{list.name}</b>? This action cannot be undone!</p>
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
  ConfirmDeleteList: { list: IListData; };
  ConfirmDeleteAccount: { user: IListData; };
}

type ModalComponents<T = any> = {
  [Property in keyof IModalProps]: React.FC<T>;
}

const bank: ModalComponents = {
  ConfirmDeleteAccount,
  ConfirmDeleteList
}

export type PropsFor<T extends keyof IModalProps> = IModalProps[T];

export const openModalComponent = <Name extends keyof ModalComponents, T extends React.FC<IModalProps[Name]>>(content: T): T => content;

export const getComponent = <Name extends keyof ModalComponents>(name: Name): React.FC<IModalProps[Name]> => openModalComponent(bank[name]);