import { Skeleton } from "@/components/ui/skeleton";
export default function Loading() {
  return (
    <div className="w-full flex  flex-col space-y-16 items-center justify-between py-12 px-2">
      <Skeleton className="h-[400px] w-[900px] px-24" />
      <p className="text-3xl font-medium pt-24">Latest articles</p>
      <div className="grid lg:grid-cols-3 gap-6 lg:px-16 w-full">
        <Skeleton className="h-56  col-span-1" />
        <Skeleton className="h-56  col-span-1" />
        <Skeleton className="h-56  col-span-1" />
        <Skeleton className="h-56 col-span-1" />
        <Skeleton className="h-56 col-span-1" />
        <Skeleton className="h-56 col-span-1" />
      </div>
    </div>
  );
}
