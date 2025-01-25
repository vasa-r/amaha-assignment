export interface MenuItem {
  name: string;
  to: string;
  image?: string;
}

export const menuItem: MenuItem[] = [
  { name: "Home", to: "/main" },
  { name: "Boards", to: "/main/boards" },
];

export const dummyData = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Michael Johnson" },
  { id: 4, name: "Emily Davis" },
  { id: 5, name: "Daniel Wilson" },
  { id: 6, name: "Sarah Brown" },
  { id: 7, name: "James Taylor" },
  { id: 8, name: "Olivia Martinez" },
  { id: 9, name: "Chris Lee" },
  { id: 10, name: "Sophia Anderson" },
];
