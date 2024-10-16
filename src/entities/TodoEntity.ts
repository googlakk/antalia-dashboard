export type GroupUsers = {
  id: number;
  title: string;
}
export type Users = {
  id: number;
  userGroups: string;
  name: string; 
  school: string;
  points: number;
}

export type TodoEntity = {
  id: number;
  title: string;
  isDone: boolean;
  dueDate?: Date;
};
