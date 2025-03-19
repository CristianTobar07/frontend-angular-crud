export interface ResponseGetAllTasks {
  data: Task[];
  status: boolean;
}

export interface Task {
  name: string;
  description: string;
  status: number;
  uid: string;
}
