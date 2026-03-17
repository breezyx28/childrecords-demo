import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function TooltipComponent({
  children,
  content,
}: {
  children: React.ReactNode;
  content: any;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className="max-w-[200px] mb-4 bg-primary-600 text-white">
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
