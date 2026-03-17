import { ChildProps } from "@/types/children";

/**
 * Mock children data for demo/development.
 * Matches the shape expected by EditChildSwitch, SwitchChildModal, and child cards.
 */
export const mockChildren: ChildProps[] = [
  {
    id: 1,
    name: "Sarah Ahmed",
    gender: "girl",
    age: "4 years",
    photo: "https://i.pravatar.cc/150?u=child1",
    weight: "15.5",
    height: "95",
    selected: true,
  },
  {
    id: 2,
    name: "Omar Zakaria",
    gender: "boy",
    age: "3 years",
    photo: "https://i.pravatar.cc/150?u=child2",
    weight: "12.3",
    height: "85",
    selected: false,
  },
  {
    id: 3,
    name: "Layla Hassan",
    gender: "girl",
    age: "2 years",
    photo: "https://i.pravatar.cc/150?u=child3",
    weight: "10.8",
    height: "78",
    selected: false,
  },
];
