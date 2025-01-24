import { describe, expect, test } from "vitest";
import { Order, OrderStatus } from "./ordersTable.type";
import { fireEvent, render, screen } from "@testing-library/react";
import { OrdersTable } from "./OrdersTable";

describe("OrdersTable", () => {
  const mockOrders: Order[] = [
    {
      id: 1,
      customerName: "Alice Smith",
      items: ["Product A"],
      status: OrderStatus.PICKING,
      createdAt: "2025-01-24",
    },
    {
      id: 2,
      customerName: "Bob Johnson",
      items: ["Product B"],
      status: OrderStatus.DELIVERING,
      createdAt: "2025-01-25",
    },
  ];

  test("renders loading skeleton when data is loading", () => {
    render(
      <OrdersTable orders={[]} isOrdersLoading={true} isOrdersError={false} />
    );
    expect(screen.getByTestId("table-skeleton")).toBeInTheDocument();
  });

  test("renders error boundary on error", () => {
    render(
      <OrdersTable orders={[]} isOrdersLoading={false} isOrdersError={true} />
    );
    expect(screen.getByTestId("error-boundary")).toHaveTextContent(
      "Something went wrong"
    );
  });

  test("displays orders correctly when data is loaded", () => {
    render(
      <OrdersTable
        orders={mockOrders}
        isOrdersLoading={false}
        isOrdersError={false}
      />
    );
    expect(screen.getByText("Alice Smith")).toBeInTheDocument();
    expect(screen.getByText("Bob Johnson")).toBeInTheDocument();
  });

  test("shows 'No orders found' when there are no orders", () => {
    render(
      <OrdersTable orders={[]} isOrdersLoading={false} isOrdersError={false} />
    );
    expect(screen.getByText("No orders found")).toBeInTheDocument();
  });

  test("shows 'No orders found' when there are no matching filters", () => {
    render(
      <OrdersTable
        orders={mockOrders}
        isOrdersLoading={false}
        isOrdersError={false}
      />
    );
    fireEvent.change(screen.getByTestId("search-bar"), {
      target: { value: "NonExistent" },
    });
    expect(screen.getByText("No orders found")).toBeInTheDocument();
  });

  // Search Functionality
  test("filters orders by search term", () => {
    render(
      <OrdersTable
        orders={mockOrders}
        isOrdersLoading={false}
        isOrdersError={false}
      />
    );

    // Search for "Alice"
    const searchInput = screen.getByTestId("search-bar");
    fireEvent.change(searchInput, { target: { value: "Alice" } });

    expect(screen.getByText("Alice Smith")).toBeInTheDocument();
    expect(screen.queryByText("Bob Johnson")).not.toBeInTheDocument();
  });

  // Status Filtering
  test("filters orders by status", () => {
    render(
      <OrdersTable
        orders={mockOrders}
        isOrdersLoading={false}
        isOrdersError={false}
      />
    );

    // Filter by status DELIVERING
    const statusFilter = screen.getByTestId("status-filter");
    fireEvent.change(statusFilter, {
      target: { value: OrderStatus.DELIVERING },
    });

    expect(screen.queryByText("Alice Smith")).not.toBeInTheDocument();
    expect(screen.getByText("Bob Johnson")).toBeInTheDocument();
  });

  // Sorting by Date
  test("sorts orders by creation date", () => {
    render(
      <OrdersTable
        orders={mockOrders}
        isOrdersLoading={false}
        isOrdersError={false}
      />
    );

    // Initial order: Bob (descending)
    let rows = screen.getAllByTestId("order-row");
    expect(rows[1]).toHaveTextContent("Alice Smith");

    // Toggle to ascending
    const sortButton = screen.getByTestId("sort-button");
    fireEvent.click(sortButton);

    rows = screen.getAllByTestId("order-row");
    expect(rows[1]).toHaveTextContent("Bob Johnson");
  });
});
