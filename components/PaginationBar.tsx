"use client";

import { useEffect, useState } from "react";

interface PaginationProps {
  totalItems: number;
  activeTab?: string | number;
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
}

export default function PaginationBar({
  totalItems = 10,
  activeTab,
  onPageChange,
  onLimitChange,
}: PaginationProps) {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const totalPages = Math.ceil(totalItems / limit);
  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, totalItems);

  // Auto reset pagination on tab change
  useEffect(() => {
    setPage(1);
  }, [activeTab]);

  const handlePrev = () => {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      onPageChange?.(newPage);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      const newPage = page + 1;
      setPage(newPage);
      onPageChange?.(newPage);
    }
  };

  const handleLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = Number(e.target.value);
    setLimit(newLimit);
    setPage(1);
    onLimitChange?.(newLimit);
  };

  return (
    <div className="flex justify-between items-center mt-4 p-3 border rounded-lg bg-white">
      {/* Left side – Showing text */}
      <p className="text-sm text-gray-600 font-medium">
        Showing <span className="font-semibold">{start}</span>–
        <span className="font-semibold">{end}</span> of{" "}
        <span className="font-semibold">{totalItems}</span>
      </p>

      {/* Right Side Controls */}
      <div className="flex items-center gap-4">

        {/* Items per page */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Items per page :</span>
          <select
            onChange={handleLimit}
            value={limit}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        {/* Prev / Next */}
        <div className="flex items-center gap-2">
          <button
            disabled={page === 1}
            onClick={handlePrev}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-sm">
            Page <b>{page}</b> of <b>{totalPages}</b>
          </span>

          <button
            disabled={page === totalPages}
            onClick={handleNext}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
