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
      className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
    >
      <option value="all">All Status</option>
      {Object.values(OrderStatus).map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
};
