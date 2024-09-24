import { UserIcon } from "lucide-react";
import { NavItem } from "../types";
import { BiSolidCategoryAlt } from "react-icons/bi";
export const navItems: NavItem[] = [
  {
    title: "Users",
    to: "/dashboard/users",
    icon: <UserIcon className="mr-1" />,
  },
  {
    title: "Cars",
    to: "/dashboard/cars",
    icon: <BiSolidCategoryAlt className="mr-1" />,
  },
];
