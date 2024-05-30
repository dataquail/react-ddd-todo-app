export type TodoRecord = {
  id: string;
  title: string;
  created_at: Date;
  completed_at: Date | undefined;
};

export type TodoDictionary = {
  [todoId: string]: TodoRecord | undefined;
};
