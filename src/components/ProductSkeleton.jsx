import { Skeleton } from "../components/ui/skeleton";

export function ProductSkeleton() {
  return (
    <div className="border border-gray-200 rounded-xl p-4 bg-white">
      <Skeleton className="h-40 w-full mb-4 rounded-lg" />
      <Skeleton className="h-4 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}
