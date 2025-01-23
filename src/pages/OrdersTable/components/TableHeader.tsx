import { ArrowUpDown } from "lucide-react";

interface TableHeaderProps {
  onSortToggle: () => void;
}

export const TableHeader = ({ onSortToggle }: TableHeaderProps) => {
  return (
    <thead className="bg-gray-50 dark:bg-gray-900">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Order ID
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Customer
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Product
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Status
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
          <button
            onClick={onSortToggle}
            className="flex items-center gap-2 hover:text-gray-700 dark:hover:text-gray-300"
          >
            Date
            <ArrowUpDown className="h-4 w-4" />
          </button>
        </th>
      </tr>
    </thead>
  );
};
