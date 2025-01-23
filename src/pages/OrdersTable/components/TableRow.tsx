import { Order, OrderStatus } from "@/pages/OrdersTable/ordersTable.type"; // Assuming you have a types file for Order

interface TableRowProps {
  order: Order;
}

export const TableRow = ({ order }: TableRowProps) => {
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.NEW:
        return "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200";
      case OrderStatus.PICKING:
        return "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200";
      case OrderStatus.DELIVERING:
        return "bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200";
      case OrderStatus.DELIVERED:
        return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200";
      case OrderStatus.CANCELED:
        return "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200";
    }
  };

  return (
    <tr className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 dark:odd:bg-gray-700 dark:even:bg-gray-800 dark:hover:bg-gray-600">
      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
        #{order.id}
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
        {order.customerName}
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex flex-col gap-1">
          {order.items.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </div>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <span
          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusColor(order.status)}`}
        >
          {order.status}
        </span>
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
        {new Date(order.createdAt).toLocaleDateString()}
      </td>
    </tr>
  );
};
