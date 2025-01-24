import { FC, useMemo, useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { StatusFilter } from "./components/StatusFilter";
import { TableHeader } from "./components/TableHeader";
import { TableRow } from "./components/TableRow";
import { Order } from "./ordersTable.type";
import { ToggleThemeButton } from "@/components/shared/ToggleThemeButton/ToggleThemeButton";
import { TableSkeletonLoading } from "@/pages/OrdersTable/components/TableSkeletonLoading";
import { GlobalErrorBoundary } from "@/components/shared/GlobalErrorBoundary";
import { ArrowUpDown } from "lucide-react";

interface Props {
  orders: Order[];
  isOrdersLoading: boolean;
  isOrdersError: boolean;
}

export const OrdersTable: FC<Props> = ({
  orders,
  isOrdersLoading,
  isOrdersError,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const filteredAndSortedOrders = useMemo(
    () =>
      orders
        .filter((order) => {
          const matchesSearch =
            order.customerName
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            order.items.some((item) =>
              item.toLowerCase().includes(searchTerm.toLowerCase())
            ) ||
            order.id.toString().includes(searchTerm);

          const matchesStatus =
            statusFilter === "all" || order.status === statusFilter;

          return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
        }),
    [searchTerm, statusFilter, sortDirection]
  );

  const handelSort = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  if (isOrdersError) {
    return <GlobalErrorBoundary error="Something went wrong" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-200 dark:bg-gray-900">
      <div className="p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Orders table
            </h1>

            <div className="flex flex-col gap-4 sm:flex-row-reverse sm:items-center">
              <div className="flex justify-end gap-4">
                <StatusFilter
                  statusFilter={statusFilter}
                  onStatusFilterChange={setStatusFilter}
                />
                <ToggleThemeButton />
              </div>
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              {isOrdersLoading ? (
                <TableSkeletonLoading />
              ) : (
                <>
                  <TableHeader
                    columns={[
                      "Order ID",
                      "Customer",
                      "Product",
                      "Status",
                      <button
                        onClick={handelSort}
                        className="flex items-center gap-2 hover:text-gray-700 dark:hover:text-gray-300"
                        data-testid="sort-button"
                      >
                        Date
                        <ArrowUpDown className="h-4 w-4" />
                      </button>,
                    ]}
                  />
                  <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                    {filteredAndSortedOrders.length > 0 ? (
                      filteredAndSortedOrders.map((order) => (
                        <TableRow key={order.id} order={order} />
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                        >
                          No orders found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
