import { User } from "lucide-react";

import { useUser } from "@/hooks/use-user";

export default function UserMenu() {
  function getUserInitials(name: string): string {
    if (!name) {
      return "";
    }

    const names = name.trim().split(" ");
    const firstInitial = names[0].charAt(0);
    const lastInitial = names[names.length - 1].charAt(0);

    return (firstInitial + lastInitial).toUpperCase();
  }

  const { data: user } = useUser();
  const initials = getUserInitials(user?.name || "");

  return (
    <div className="rounded-full border border-[#E5E5E5] w-10 h-10 flex items-center justify-center cursor-pointer bg-white">
      {initials ? <span className="text-black font-semibold text-sm">{initials}</span> : <User />}
    </div>
  );
}
