export type ChildProps = {
  id: number;
  photo: string;
  gender: "boy" | "girl";
  name: string;
  age: string;
  weight?: string | number;
  height?: string | number;
  selected: boolean;
};
export type ParentChildrenProps = ChildProps[];
