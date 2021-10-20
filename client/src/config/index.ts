import { IManageListProps } from "components/ManageList/utils";
import { IIconProps, IListData, ISectionHeaderButton, Obj, PartialBy, RequiredBy } from "types";
import * as Sections from "sections";
import React from "react";

type StaticSectionNames = 'Dashboard' | 'MyLists' | 'Settings';
export type DynamicSectionNames = 'ViewList' | 'ListForm';
export type AllSectionNames = StaticSectionNames | DynamicSectionNames;

export interface IGenericSection<Name extends AllSectionNames> {
  title?: string;
  componentName: Name;
  data?: ISectionsProps[Name]['data'];
}

export type AppSection = IGenericSection<AllSectionNames>;

export type AppSections = {
  [Property in keyof ISectionsProps]: SectionProps<Property, ISectionsProps[Property]>;
  /* [Property in keyof ISectionsProps]: Property extends DynamicSectionNames
    ? ICustomSection<Property, NonNullable<ISectionsProps[Property]['data']>>
    : SectionProps<Property> */
}

export interface ICustomSection<Name extends AllSectionNames, DataPropsType> extends Omit<IGenericSection<Name>, 'data'> {
  data: DataPropsType;
}

export type SectionProps<Name extends AllSectionNames, ExtraTypes = {}> = IGenericSection<Name> & ExtraTypes;

export interface ISection {
  Dashboard: IGenericSection<'Dashboard'>;
  MyLists: IGenericSection<'MyLists'>;
  ViewList: IGenericSection<'ViewList'>;
  ListForm: IGenericSection<'ListForm'>;
  Settings: IGenericSection<'Settings'>;
}

export interface ISectionsProps {
  Dashboard: {
    title: string;
    data?: never;
  }
  MyLists: {
    title: string;
    data?: never;
  }
  ViewList: {
    title: string;
    data: IListData;
  }
  ListForm: {
    title: string;
    data: IManageListProps;
  }
  Settings: {
    title: string;
    data?: never;
  }
}