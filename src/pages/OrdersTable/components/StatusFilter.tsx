import { Search } from "lucide-react";
import { OrderStatus } from "../ordersTable.type";

interface StatusFilterProps {
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
}

export const StatusFilter = ({
  statusFilter,
  onStatusFilterChange,
}: StatusFilterProps) => {
  return (
    <select
      value={statusFilter}
      onChange={(e) => onStatusFilterChange(e.target.value)}
      className="rounded-lg border-r-8 border-transparent bg-white px-4 py-2 text-gray-900 outline outline-1 outline-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:outline-gray-600"
    >
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <option value="all">All Status</option>
      {Object.values(OrderStatus).map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
};
