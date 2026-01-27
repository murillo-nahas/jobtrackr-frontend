import { NavLink } from "react-router";
import { Menu } from "lucide-react";

import UserMenu from "./user-menu";

export default function Header() {
  return (
    <div className="w-full h-16 bg-[#FAFAFA] border-b border-[#E5E5E5]  p-6 flex items-center justify-between">
      <div className="flex  items-center">
        <Menu className="cursor-pointer text-gray-800 hover:text-gray-600" />
        <NavLink to="/dashboard">
          {" "}
          <img className="w-48 cursor-pointer" src="/jobtrackr-variant.png" />
        </NavLink>
      </div>

      <UserMenu />
    </div>
  );
}
