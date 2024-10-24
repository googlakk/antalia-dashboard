import { Id } from "@reduxjs/toolkit/dist/tsHelpers";

export type Users = {
  id: number;
  name: string;
  school: string;
  points?: number;
  img?: string;
  groupId: number;
};
export type Group = {
  [x: string]: any;
  id: number;
  title: string;
  stageId: number;
};

export type Stage = {
  id: number;
  title: string;
};
