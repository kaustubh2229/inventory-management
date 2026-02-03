import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: "indigo" | "emerald" | "amber" | "pink";
}

const colorMap = {
  indigo: "bg-indigo-100 text-indigo-600",
  emerald: "bg-emerald-100 text-emerald-600",
  amber: "bg-amber-100 text-amber-600",
  pink: "bg-pink-100 text-pink-600",
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  color = "indigo",
}: StatCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow p-6 flex items-center gap-4">
      <div
        className={`p-3 rounded-xl ${colorMap[color]} dark:bg-opacity-20`}
      >
        <Icon className="w-6 h-6" />
      </div>

      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {title}
        </p>
        <p className="text-2xl font-bold text-slate-800 dark:text-white">
          {value}
        </p>
      </div>
    </div>
  );
}
