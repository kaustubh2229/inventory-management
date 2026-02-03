"use client";


import { UserButton } from "@stackframe/stack";
import { BarChart3, Package, Plus, Settings } from "lucide-react";
import Link from "next/link";

export default function Sidebar({
  currentPath = "/dashboard",
}: {
  currentPath?: string;
}) {
  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "Inventory", href: "/inventory", icon: Package },
    { name: "Add Product", href: "/add-product", icon: Plus },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div
      className="
        fixed left-0 top-0 z-10
        w-64 min-h-screen
        bg-gradient-to-b from-indigo-700 to-indigo-900
        text-white
        p-6
        shadow-2xl
      "
    >
      {/* Logo / Title */}
      <div className="mb-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-xl">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <span className="text-lg font-bold tracking-wide">
            Inventory Management
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        <div className="text-xs font-semibold text-indigo-200 uppercase mb-3">
          Menu
        </div>

        {navigation.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentPath === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3
                px-4 py-3
                rounded-xl
                transition-all duration-200
                ${
                  isActive
                    ? "bg-white/20 text-white shadow-inner"
                    : "text-indigo-100 hover:bg-white/10"
                }
              `}
            >
              <IconComponent className="w-5 h-5" />
              <span className="text-sm font-medium">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/20">
        <UserButton showUserInfo />
      </div>
    </div>
  );
}
