import { FC } from "react";

interface Props {
  error?: string;
}

export const GlobalErrorBoundary: FC<Props> = ({ error }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="rounded-lg bg-white p-8 text-center shadow-lg dark:bg-gray-800">
        <h2 className="mb-4 text-2xl font-bold text-red-600 dark:text-red-400">
          Oops! Something went wrong.
        </h2>
        {error && (
          <p className="mb-6 text-gray-700 dark:text-gray-300">{error}</p>
        )}
        <button
          onClick={() => window.location.reload()} // Reload the page
        >
          Try Again
        </button>
      </div>
    </div>
  );
};
