export type DashboardState = {
  isSidenavOpen: boolean;
  appName: string;
  menuItems?: { name: string; route: string; icon: string }[];
  activeRoute?: string;
};