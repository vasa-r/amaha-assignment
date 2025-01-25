export interface MenuItem {
  name: string;
  to: string;
  image?: string;
}

export const menuItem: MenuItem[] = [
  { name: "Home", to: "/main" },
  { name: "Boards", to: "/main/boards" },
];
