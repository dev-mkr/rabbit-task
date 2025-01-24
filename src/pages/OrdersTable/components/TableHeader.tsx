import { FC, ReactNode } from "react";

interface Props {
  columns: (string | ReactNode)[];
}

export const TableHeader: FC<Props> = ({ columns }) => {
  return (
    <thead className="bg-gray-50 dark:bg-gray-900" data-testid="table-header">
      <tr>
        {columns.map((column) => (
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
            {column}
          </th>
        ))}
      </tr>
    </thead>
  );
};
