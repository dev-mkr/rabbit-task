import { ErrorBoundary } from "react-error-boundary";

import { OrdersTable } from "@/pages/OrdersTable/OrdersTable";
import { useThemeStore } from "@/stores/useThemeStore";
import { Order, OrderStatus } from "@/pages/OrdersTable/ordersTable.type";

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
    id: 6,
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

function App() {
  const theme = useThemeStore((state) => state.theme);
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <OrdersTable
        orders={orders}
        isOrdersLoading={isOrdersLoading}
        isOrdersError={isOrdersError}
      />
    </ErrorBoundary>
  );
}

export default App;
