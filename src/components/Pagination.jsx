import React from "react";
import clsx from "clsx";

export default function Pagination({ page, totalPages, onChange }) {
  const prev = () => onChange(Math.max(1, page - 1));
  const next = () => onChange(Math.min(totalPages, page + 1));

  return (
    <div className="flex items-center justify-center gap-3 mt-6">
      <button onClick={prev} className="px-3 py-1 rounded-lg border bg-white">
        Prev
      </button>
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }).map((_, i) => {
          const p = i + 1;
          return (
            <button
              key={p}
              onClick={() => onChange(p)}
              className={clsx(
                "px-3 py-1 rounded-lg",
                p === page ? "bg-[#F67B6D] text-white" : "bg-white border"
              )}
            >
              {p}
            </button>
          );
        })}
      </div>
      <button onClick={next} className="px-3 py-1 rounded-lg border bg-white">
        Next
      </button>
    </div>
  );
}
