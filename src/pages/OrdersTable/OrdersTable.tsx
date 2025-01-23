import { useMemo, useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { StatusFilter } from "./components/StatusFilter";
import { TableHeader } from "./components/TableHeader";
import { TableRow } from "./components/TableRow";
import { Order, OrderStatus } from "./ordersTable.type";
import { ToggleThemeButton } from "@/components/shared/ToggleThemeButton";
import { TableSkeletonLoading } from "@/components/shared/Table/TableSkeletonLoading";
import { GlobalErrorBoundary } from "@/components/shared/GlobalErrorBoundary";

// Sample data
const orders: Order[] = [
  {
    id: 1,
    customerName: "Alice",
    status: OrderStatus.NEW,
    items: ["Item A", "Item B"],
    createdAt: "2025-01-20",
  },
  {
    id: 2,
    customerName: "Bob",
    status: OrderStatus.PICKING,
    items: ["Item C", "Item D"],
    createdAt: "2025-01-21",
  },
  {
    id: 3,
    customerName: "Charlie",
    status: OrderStatus.DELIVERING,
    items: ["Item E", "Item F"],
    createdAt: "2025-01-22",
  },
  {
    id: 4,
    customerName: "Diana",
    status: OrderStatus.DELIVERED,
    items: ["Item G", "Item H"],
    createdAt: "2025-01-23",
  },
  {
    id: 5,
    customerName: "Eve",
    status: OrderStatus.CANCELED,
    items: ["Item I", "Item J"],
    createdAt: "2025-01-24",
  },
  {
    id: 5,
    customerName: "Eve",
    status: OrderStatus.NEW,
    items: ["Item I", "Item J"],
    createdAt: "2025-01-25",
  },
];

// simulate loading
const isOrdersLoading = false;
// simulate error
const isOrdersError = false;

export const OrdersTable = () => {
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

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex w-full gap-4">
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
                    onSortToggle={() =>
                      setSortDirection((prev) =>
                        prev === "asc" ? "desc" : "asc"
                      )
                    }
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
