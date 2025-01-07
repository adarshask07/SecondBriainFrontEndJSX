import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (
    (<div
      className={cn("animate-pulse rounded-md bg-gray-200/10 dark:bg-slate-50/10", className)}
      {...props} />)
  );
}

export { Skeleton }
