import { Skeleton } from "@/components/ui/skeleton";
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="w-full flex  flex-col space-y-16 items-center justify-between py-12 px-2">
      <Skeleton className="h-[400px] w-[900px] px-24" />
      <Skeleton className="h-[50px] w-[950px] px-24" />
      <Skeleton className="h-[50px] w-[950px] px-24" />
      <Skeleton className="h-[50px] w-[950px] px-24" />
      <Skeleton className="h-[50px] w-[950px] px-24" />
      <Skeleton className="h-[50px] w-[950px] px-24" />
      <Skeleton className="h-[50px] w-[950px] px-24" />
      <Skeleton className="h-[50px] w-[950px] px-24" />
      <Skeleton className="h-[50px] w-[950px] px-24" />
      <Skeleton className="h-[50px] w-[950px] px-24" />
    </div>
  );
}
