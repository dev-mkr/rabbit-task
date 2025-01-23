import { ErrorBoundary } from "react-error-boundary";

import { OrdersTable } from "@/pages/OrdersTable/OrdersTable";
import { useThemeStore } from "@/stores/useThemeStore";

function App() {
  const theme = useThemeStore((state) => state.theme);
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <OrdersTable />
    </ErrorBoundary>
  );
}

export default App;
