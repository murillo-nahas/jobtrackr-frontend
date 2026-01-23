import { BriefcaseBusiness, CircleUser, House } from "lucide-react";
import { NavLink } from "react-router";

const sidebarItems = [
  {
    label: "Dashboard",
    icon: <House />,
    href: "/dashboard",
  },
  {
    label: "Applications",
    icon: <BriefcaseBusiness />,
    href: "/applications",
  },
  {
    label: "Account",
    icon: <CircleUser />,
    href: "/settings",
  },
];

export default function Sidebar() {
  return (
    <div className="px-4 py-2 w-64 bg-[#FAFAFA] border-r border-[#E5E5E5]">
      {sidebarItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.href}
          className={({ isActive }) =>
            isActive
              ? "items-center flex gap-2 p-2 bg-gray-100 rounded-md mt-2 font-semibold text-gray-800"
              : "items-center flex gap-2 p-2 rounded-md mt-2 text-gray-600"
          }
        >
          <span>{item.icon}</span>
          <span className="text-sm">{item.label}</span>
        </NavLink>
      ))}
    </div>
  );
}
