export type Category = {
  id: number;
  name: string;
};

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
  category?: Category;
};